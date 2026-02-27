const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are a batucada (Brazilian percussion ensemble) notation expert. Your job is to transcribe and clean up percussion notation into a standardized "tubos grid" format.

## OUTPUT FORMAT
Always output valid JSON and nothing else. No markdown, no backticks, no preamble. The JSON schema:

{
  "title": "Name of the rhythm/pattern",
  "rhythm": "avenida|merengue|afro|swing|reggae|samba_de_roda|unknown",
  "instrument": "repinique|caixa|surdo_fundo|surdo_dobra|tamborim|agogo|timba|chocalho|multiple|unknown",
  "timeSignature": "4/4|6/8|12/8",
  "feel": "straight|swing|triplet",
  "bpm": null,
  "bars": 1,
  "grid": "the cleaned up notation in tubos grid format (see below)",
  "key": {"symbol": "meaning", ...},
  "notes": "any performance notes, tips, or context",
  "confidence": "high|medium|low"
}

## TUBOS GRID FORMAT
Standard 16-box grid per bar (4 beats × 4 subdivisions):

Beat:  1 . . . 2 . . . 3 . . . 4 . . .
Right: X . . o . . X . . o . . X . . .
Left:  . o . . o . . o . . o . . o . .

For triplet feel, use 12-box grid (4 beats × 3 subdivisions):

Beat:  1 . . 2 . . 3 . . 4 . .
Right: X . o X . o X . o X . o

## STANDARD SYMBOLS
X = accent / rim shot (loud)
x = regular hit
o = open tone
O = loud open tone
m = muted stroke
r = rim click
s = slap
g = ghost note (very soft)
. = rest / silence
R = roll
> = accent marker

## RULES
- If the input is messy or unclear, do your best to interpret it and set confidence to "medium" or "low"
- If you see instrument-specific notation (e.g. "D" for dome on surdo, "B" for borda/rim), map it to the standard symbols and explain the mapping in the key
- If multiple instruments are shown, separate each with a labeled line
- Preserve the musical intent even if the formatting is rough
- For photos: read any text, symbols, or grid patterns visible and transcribe them
- Always include which hand/stick plays what if discernible`;

// Transcribe from image (photo of notation)
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    }

    const base64 = req.file.buffer.toString('base64');
    const mediaType = req.file.mimetype || 'image/jpeg';

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 }
            },
            {
              type: 'text',
              text: 'Transcribe this percussion notation into clean tubos grid format. Identify the rhythm, instrument(s), and any performance notes visible. Return ONLY valid JSON.'
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return res.status(500).json({ error: 'AI transcription failed' });
    }

    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');

    // Parse JSON from response
    let parsed;
    try {
      const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      // If JSON parse fails, return raw text
      return res.json({
        success: true,
        raw: true,
        text,
        message: 'Could not parse structured notation — showing raw AI response'
      });
    }

    res.json({ success: true, notation: parsed });

  } catch (err) {
    console.error('Transcription error:', err);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

// Transcribe from text (pasted chat message or raw notation)
router.post('/text', express.json(), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    }

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Transcribe and clean up this percussion notation into standardized tubos grid format. If it's already in grid format, clean it up and standardize the symbols. Identify the rhythm, instrument(s), and add any useful notes. Return ONLY valid JSON.\n\nInput:\n${text}`
        }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return res.status(500).json({ error: 'AI transcription failed' });
    }

    const data = await response.json();
    const responseText = data.content.map(c => c.text || '').join('');

    let parsed;
    try {
      const clean = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      return res.json({
        success: true,
        raw: true,
        text: responseText,
        message: 'Could not parse structured notation — showing raw AI response'
      });
    }

    res.json({ success: true, notation: parsed });

  } catch (err) {
    console.error('Transcription error:', err);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

module.exports = router;
