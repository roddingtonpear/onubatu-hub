const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Chat exports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_exports (
        id UUID PRIMARY KEY,
        filename TEXT NOT NULL,
        uploaded_at TIMESTAMP DEFAULT NOW(),
        message_count INTEGER DEFAULT 0,
        date_range_start TIMESTAMP,
        date_range_end TIMESTAMP
      )
    `);

    // Messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY,
        export_id UUID REFERENCES chat_exports(id) ON DELETE CASCADE,
        sender TEXT NOT NULL,
        content TEXT,
        timestamp TIMESTAMP NOT NULL,
        message_type TEXT DEFAULT 'text',
        has_media BOOLEAN DEFAULT false,
        media_filename TEXT,
        media_type TEXT,
        is_important BOOLEAN DEFAULT false,
        tags TEXT[] DEFAULT '{}'
      )
    `);

    // Media table
    await client.query(`
      CREATE TABLE IF NOT EXISTS media (
        id UUID PRIMARY KEY,
        message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
        export_id UUID REFERENCES chat_exports(id) ON DELETE CASCADE,
        sender TEXT NOT NULL,
        filename TEXT NOT NULL,
        original_filename TEXT,
        media_type TEXT NOT NULL,
        file_size INTEGER,
        uploaded_at TIMESTAMP DEFAULT NOW(),
        tags TEXT[] DEFAULT '{}'
      )
    `);

    // Events / important dates extracted
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY,
        message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        event_date TIMESTAMP,
        event_type TEXT,
        details TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(message_type)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_export ON messages(export_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_media_sender ON media(sender)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_media_type ON media(media_type)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_messages_content ON messages USING gin(to_tsvector(\'spanish\', coalesce(content, \'\')))');

    await client.query('COMMIT');
    console.log('✅ Migration complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
