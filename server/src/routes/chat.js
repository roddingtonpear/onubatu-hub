const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const { parseWhatsAppExport } = require('../services/parser');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Upload WhatsApp export
router.post('/upload', upload.single('chatfile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const text = req.file.buffer.toString('utf-8');
    const { messages, senders, stats } = parseWhatsAppExport(text);

    if (messages.length === 0) {
      return res.status(400).json({ error: 'No messages found. Make sure this is a WhatsApp export file.' });
    }

    const exportId = uuidv4();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insert export record
      await client.query(
        `INSERT INTO chat_exports (id, filename, message_count, date_range_start, date_range_end)
         VALUES ($1, $2, $3, $4, $5)`,
        [exportId, req.file.originalname, messages.length, stats.dateRange?.start, stats.dateRange?.end]
      );

      // Batch insert messages
      for (const msg of messages) {
        await client.query(
          `INSERT INTO messages (id, export_id, sender, content, timestamp, message_type, has_media, media_filename, media_type, is_important, tags)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (id) DO NOTHING`,
          [msg.id, exportId, msg.sender, msg.content, msg.timestamp, msg.message_type, msg.has_media, msg.media_filename, msg.media_type, msg.is_important, msg.tags]
        );
      }

      await client.query('COMMIT');

      res.json({
        success: true,
        exportId,
        stats,
        senders
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to process chat export' });
  }
});

// Get all exports
router.get('/exports', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM chat_exports ORDER BY uploaded_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Exports fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch exports' });
  }
});

// Get messages with filters
router.get('/messages', async (req, res) => {
  try {
    const { sender, type, tag, search, from, to, important, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (sender) {
      conditions.push(`sender = $${paramIdx++}`);
      params.push(sender);
    }
    if (type) {
      conditions.push(`message_type = $${paramIdx++}`);
      params.push(type);
    }
    if (tag) {
      conditions.push(`$${paramIdx++} = ANY(tags)`);
      params.push(tag);
    }
    if (search) {
      conditions.push(`to_tsvector('spanish', coalesce(content, '')) @@ plainto_tsquery('spanish', $${paramIdx++})`);
      params.push(search);
    }
    if (from) {
      conditions.push(`timestamp >= $${paramIdx++}`);
      params.push(from);
    }
    if (to) {
      conditions.push(`timestamp <= $${paramIdx++}`);
      params.push(to);
    }
    if (important === 'true') {
      conditions.push('is_important = true');
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM messages ${where}`, params
    );

    params.push(limit, offset);
    const result = await pool.query(
      `SELECT * FROM messages ${where} ORDER BY timestamp DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`,
      params
    );

    res.json({
      messages: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    });
  } catch (err) {
    console.error('Messages fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get unique senders
router.get('/senders', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sender, COUNT(*) as message_count,
        COUNT(*) FILTER (WHERE has_media = true) as media_count,
        MIN(timestamp) as first_message,
        MAX(timestamp) as last_message
       FROM messages
       WHERE message_type != 'system'
       GROUP BY sender
       ORDER BY message_count DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Senders fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch senders' });
  }
});

// Get stats / dashboard data
router.get('/stats', async (req, res) => {
  try {
    const [totals, bySender, byType, byTag, byDate, recentImportant] = await Promise.all([
      pool.query(`SELECT
        COUNT(*) as total_messages,
        COUNT(*) FILTER (WHERE has_media) as total_media,
        COUNT(*) FILTER (WHERE is_important) as total_important,
        COUNT(DISTINCT sender) as total_senders,
        MIN(timestamp) as earliest,
        MAX(timestamp) as latest
       FROM messages WHERE message_type != 'system'`),

      pool.query(`SELECT sender, COUNT(*) as count
       FROM messages WHERE message_type != 'system'
       GROUP BY sender ORDER BY count DESC LIMIT 15`),

      pool.query(`SELECT message_type, COUNT(*) as count
       FROM messages GROUP BY message_type ORDER BY count DESC`),

      pool.query(`SELECT unnest(tags) as tag, COUNT(*) as count
       FROM messages WHERE array_length(tags, 1) > 0
       GROUP BY tag ORDER BY count DESC`),

      pool.query(`SELECT DATE(timestamp) as date, COUNT(*) as count
       FROM messages
       GROUP BY DATE(timestamp) ORDER BY date DESC LIMIT 30`),

      pool.query(`SELECT * FROM messages WHERE is_important = true
       ORDER BY timestamp DESC LIMIT 10`)
    ]);

    res.json({
      totals: totals.rows[0],
      bySender: bySender.rows,
      byType: byType.rows,
      byTag: byTag.rows,
      byDate: byDate.rows,
      recentImportant: recentImportant.rows
    });
  } catch (err) {
    console.error('Stats fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Search messages (full-text)
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    if (!q) return res.status(400).json({ error: 'Query required' });

    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT *, ts_rank(to_tsvector('spanish', coalesce(content, '')), plainto_tsquery('spanish', $1)) as rank
       FROM messages
       WHERE to_tsvector('spanish', coalesce(content, '')) @@ plainto_tsquery('spanish', $1)
       ORDER BY rank DESC, timestamp DESC
       LIMIT $2 OFFSET $3`,
      [q, limit, offset]
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM messages
       WHERE to_tsvector('spanish', coalesce(content, '')) @@ plainto_tsquery('spanish', $1)`,
      [q]
    );

    res.json({
      messages: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Delete an export and all its messages
router.delete('/exports/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM chat_exports WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete export' });
  }
});

// Fun / social stats
router.get('/fun-stats', async (req, res) => {
  try {
    const [
      chattiest,
      quietest,
      nightOwls,
      earlyBirds,
      mediaKings,
      longestMessages,
      emojiLovers,
      mostImportant,
      dayOfWeek,
      hourOfDay,
      avgPerDay,
      streaks
    ] = await Promise.all([
      // Top 10 chattiest
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages WHERE message_type != 'system'
        GROUP BY sender ORDER BY count DESC LIMIT 10`),

      // Bottom 5 quietest (min 1 message)
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages WHERE message_type != 'system'
        GROUP BY sender ORDER BY count ASC LIMIT 5`),

      // Night owls (messages between 00:00-05:00)
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages
        WHERE EXTRACT(HOUR FROM timestamp) BETWEEN 0 AND 4
        AND message_type != 'system'
        GROUP BY sender ORDER BY count DESC LIMIT 5`),

      // Early birds (messages between 06:00-08:00)
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages
        WHERE EXTRACT(HOUR FROM timestamp) BETWEEN 6 AND 8
        AND message_type != 'system'
        GROUP BY sender ORDER BY count DESC LIMIT 5`),

      // Most media shared
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages WHERE has_media = true
        GROUP BY sender ORDER BY count DESC LIMIT 5`),

      // Longest average message length
      pool.query(`SELECT sender, ROUND(AVG(LENGTH(content))) as avg_length, COUNT(*) as msg_count
        FROM messages WHERE message_type = 'text' AND LENGTH(content) > 0
        GROUP BY sender HAVING COUNT(*) > 5
        ORDER BY avg_length DESC LIMIT 5`),

      // Most messages with emojis (crude check)
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages
        WHERE content ~ '[😀-🙏🌀-🗿🚀-🛿🤀-🧿🩰-🫿♀-♂☀-⭐✅-➡🔀-🔿🕐-🕧🏻-🏿👁‍🗨️]'
        AND message_type != 'system'
        GROUP BY sender ORDER BY count DESC LIMIT 5`),

      // Who sends the most "important" messages
      pool.query(`SELECT sender, COUNT(*) as count
        FROM messages WHERE is_important = true
        GROUP BY sender ORDER BY count DESC LIMIT 5`),

      // Busiest day of the week
      pool.query(`SELECT EXTRACT(DOW FROM timestamp) as dow, COUNT(*) as count
        FROM messages WHERE message_type != 'system'
        GROUP BY dow ORDER BY count DESC`),

      // Busiest hour
      pool.query(`SELECT EXTRACT(HOUR FROM timestamp) as hour, COUNT(*) as count
        FROM messages WHERE message_type != 'system'
        GROUP BY hour ORDER BY count DESC`),

      // Average messages per day
      pool.query(`SELECT ROUND(COUNT(*)::numeric / GREATEST(EXTRACT(DAY FROM (MAX(timestamp) - MIN(timestamp))), 1), 1) as avg_per_day
        FROM messages WHERE message_type != 'system'`),

      // Longest streak (consecutive days with messages) per sender
      pool.query(`WITH daily AS (
          SELECT sender, DATE(timestamp) as d,
            DATE(timestamp) - (ROW_NUMBER() OVER (PARTITION BY sender ORDER BY DATE(timestamp)))::int AS grp
          FROM messages WHERE message_type != 'system'
          GROUP BY sender, DATE(timestamp)
        )
        SELECT sender, COUNT(*) as streak_days
        FROM daily GROUP BY sender, grp
        ORDER BY streak_days DESC LIMIT 5`)
    ]);

    const DOW_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    res.json({
      chattiest: chattiest.rows,
      quietest: quietest.rows,
      nightOwls: nightOwls.rows,
      earlyBirds: earlyBirds.rows,
      mediaKings: mediaKings.rows,
      longestMessages: longestMessages.rows,
      emojiLovers: emojiLovers.rows,
      mostImportant: mostImportant.rows,
      busiestDay: dayOfWeek.rows.length > 0 ? { day: DOW_NAMES[dayOfWeek.rows[0].dow], count: dayOfWeek.rows[0].count } : null,
      busiestHour: hourOfDay.rows.length > 0 ? { hour: `${String(hourOfDay.rows[0].hour).padStart(2, '0')}:00`, count: hourOfDay.rows[0].count } : null,
      avgPerDay: avgPerDay.rows[0]?.avg_per_day || 0,
      longestStreak: streaks.rows.length > 0 ? streaks.rows[0] : null,
      dayBreakdown: dayOfWeek.rows.map(r => ({ day: DOW_NAMES[r.dow], count: parseInt(r.count) })),
      hourBreakdown: hourOfDay.rows.map(r => ({ hour: parseInt(r.hour), count: parseInt(r.count) })).sort((a, b) => a.hour - b.hour),
    });
  } catch (err) {
    console.error('Fun stats error:', err);
    res.status(500).json({ error: 'Failed to fetch fun stats' });
  }
});

module.exports = router;
