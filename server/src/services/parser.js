const { v4: uuidv4 } = require('uuid');

// WhatsApp export format patterns
// Android: DD/MM/YYYY, HH:MM - Sender: Message
// iOS: [DD/MM/YYYY, HH:MM:SS] Sender: Message
const ANDROID_PATTERN = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–]\s+([^:]+):\s*(.*)/;
const IOS_PATTERN = /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]\s+([^:]+):\s*(.*)/;
const SYSTEM_PATTERN = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–]\s+(.*)/;

// Media indicators
const MEDIA_INDICATORS = [
  '<Media omitted>',
  '<Multimedia omitido>',
  '<imagen omitida>',
  '<video omitido>',
  '<audio omitido>',
  '<documento omitido>',
  '<sticker omitted>',
  'image omitted',
  'video omitted',
  'audio omitted',
  'document omitted',
  'GIF omitted',
  '.jpg (file attached)',
  '.mp4 (file attached)',
  '.opus (file attached)',
  '.pdf (file attached)',
  '.webp (file attached)',
];

// Event keywords (Spanish)
const EVENT_KEYWORDS = [
  'ensayo', 'rehearsal', 'actuación', 'performance', 'concierto', 'concert',
  'quedamos', 'meet', 'reunión', 'meeting', 'clase', 'class',
  'sábado', 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes',
  'mañana', 'tomorrow', 'hoy', 'today', 'próximo', 'next'
];

// Important message indicators
const IMPORTANT_INDICATORS = [
  'importante', 'important', 'urgente', 'urgent', 'atención', 'attention',
  'recordar', 'remember', 'no olvidar', 'don\'t forget', 'confirmar', 'confirm',
  'cancelado', 'cancelled', 'cambio', 'change', 'nuevo horario', 'new time'
];

function parseTimestamp(dateStr, timeStr) {
  // Handle various date formats
  const dateParts = dateStr.split('/');
  let day, month, year;

  if (dateParts[0].length <= 2) {
    // DD/MM/YYYY or DD/MM/YY
    day = parseInt(dateParts[0]);
    month = parseInt(dateParts[1]) - 1;
    year = parseInt(dateParts[2]);
  } else {
    // YYYY/MM/DD
    year = parseInt(dateParts[0]);
    month = parseInt(dateParts[1]) - 1;
    day = parseInt(dateParts[2]);
  }

  if (year < 100) year += 2000;

  // Handle time with AM/PM
  let cleanTime = timeStr.trim();
  let hours, minutes, seconds = 0;
  const isPM = /[Pp][Mm]/.test(cleanTime);
  const isAM = /[Aa][Mm]/.test(cleanTime);
  cleanTime = cleanTime.replace(/\s*[AaPp][Mm]\s*/, '');

  const timeParts = cleanTime.split(':');
  hours = parseInt(timeParts[0]);
  minutes = parseInt(timeParts[1]);
  if (timeParts[2]) seconds = parseInt(timeParts[2]);

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return new Date(year, month, day, hours, minutes, seconds);
}

function detectMediaType(content) {
  const lower = content.toLowerCase();

  if (MEDIA_INDICATORS.some(ind => lower.includes(ind.toLowerCase()))) {
    if (lower.includes('image') || lower.includes('imagen') || lower.includes('.jpg') || lower.includes('.png') || lower.includes('.webp')) {
      return { hasMedia: true, mediaType: 'image' };
    }
    if (lower.includes('video') || lower.includes('.mp4')) {
      return { hasMedia: true, mediaType: 'video' };
    }
    if (lower.includes('audio') || lower.includes('.opus') || lower.includes('.ogg')) {
      return { hasMedia: true, mediaType: 'audio' };
    }
    if (lower.includes('sticker')) {
      return { hasMedia: true, mediaType: 'sticker' };
    }
    if (lower.includes('gif')) {
      return { hasMedia: true, mediaType: 'gif' };
    }
    if (lower.includes('document') || lower.includes('documento') || lower.includes('.pdf')) {
      return { hasMedia: true, mediaType: 'document' };
    }
    return { hasMedia: true, mediaType: 'media' };
  }

  // Check for file attachments
  const fileMatch = content.match(/([^\s]+\.(jpg|jpeg|png|gif|mp4|mov|avi|opus|ogg|mp3|pdf|doc|docx|webp))/i);
  if (fileMatch) {
    const ext = fileMatch[2].toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return { hasMedia: true, mediaType: 'image', mediaFilename: fileMatch[1] };
    if (['mp4', 'mov', 'avi'].includes(ext)) return { hasMedia: true, mediaType: 'video', mediaFilename: fileMatch[1] };
    if (['opus', 'ogg', 'mp3'].includes(ext)) return { hasMedia: true, mediaType: 'audio', mediaFilename: fileMatch[1] };
    return { hasMedia: true, mediaType: 'document', mediaFilename: fileMatch[1] };
  }

  return { hasMedia: false, mediaType: null };
}

function isImportant(content) {
  const lower = content.toLowerCase();
  return IMPORTANT_INDICATORS.some(ind => lower.includes(ind));
}

function detectTags(content, sender) {
  const tags = [];
  const lower = content.toLowerCase();

  // Rhythm/music tags
  if (lower.match(/avenida/)) tags.push('avenida');
  if (lower.match(/merengue/)) tags.push('merengue');
  if (lower.match(/reggae/)) tags.push('reggae');
  if (lower.match(/afro/)) tags.push('afro');
  if (lower.match(/swing/)) tags.push('swing');
  if (lower.match(/samba/)) tags.push('samba');
  if (lower.match(/funk/)) tags.push('funk');

  // Content type tags
  if (lower.match(/ensayo|rehearsal|clase|class/)) tags.push('rehearsal');
  if (lower.match(/actuaci[oó]n|performance|concierto|concert|pasacalle/)) tags.push('gig');
  if (lower.match(/tutorial|pr[aá]ctica|practice/)) tags.push('tutorial');

  // Instrument tags
  if (lower.match(/repinique|repi/)) tags.push('repinique');
  if (lower.match(/surdo/)) tags.push('surdo');
  if (lower.match(/caja|snare/)) tags.push('caja');
  if (lower.match(/agog[oô]/)) tags.push('agogo');
  if (lower.match(/tamborim/)) tags.push('tamborim');
  if (lower.match(/chocalho|shaker/)) tags.push('chocalho');

  return tags;
}

function parseWhatsAppExport(text) {
  const lines = text.split('\n');
  const messages = [];
  let currentMessage = null;
  const senders = new Set();

  for (const line of lines) {
    // Try Android format first
    let match = line.match(ANDROID_PATTERN);
    let isIOS = false;

    if (!match) {
      match = line.match(IOS_PATTERN);
      isIOS = true;
    }

    if (match) {
      // Save previous message
      if (currentMessage) {
        messages.push(currentMessage);
      }

      const [, dateStr, timeStr, sender, content] = match;
      const timestamp = parseTimestamp(dateStr, timeStr);
      const { hasMedia, mediaType, mediaFilename } = detectMediaType(content);
      const tags = detectTags(content, sender);
      const important = isImportant(content);

      senders.add(sender);

      currentMessage = {
        id: uuidv4(),
        sender: sender.trim(),
        content: content.trim(),
        timestamp,
        message_type: hasMedia ? mediaType : (content.trim().length === 0 ? 'empty' : 'text'),
        has_media: hasMedia,
        media_filename: mediaFilename || null,
        media_type: mediaType,
        is_important: important,
        tags
      };
    } else {
      // Check if it's a system message
      const sysMatch = line.match(SYSTEM_PATTERN);
      if (sysMatch && !line.match(ANDROID_PATTERN)) {
        if (currentMessage) messages.push(currentMessage);
        const [, dateStr, timeStr, content] = sysMatch;
        currentMessage = {
          id: uuidv4(),
          sender: 'System',
          content: content.trim(),
          timestamp: parseTimestamp(dateStr, timeStr),
          message_type: 'system',
          has_media: false,
          media_filename: null,
          media_type: null,
          is_important: false,
          tags: []
        };
      } else if (currentMessage && line.trim()) {
        // Continuation of previous message
        currentMessage.content += '\n' + line;
        // Re-check tags and importance with updated content
        currentMessage.tags = [...new Set([...currentMessage.tags, ...detectTags(line, currentMessage.sender)])];
        if (isImportant(line)) currentMessage.is_important = true;
      }
    }
  }

  // Don't forget the last message
  if (currentMessage) {
    messages.push(currentMessage);
  }

  return {
    messages,
    senders: Array.from(senders).sort(),
    stats: {
      totalMessages: messages.length,
      textMessages: messages.filter(m => m.message_type === 'text').length,
      mediaMessages: messages.filter(m => m.has_media).length,
      systemMessages: messages.filter(m => m.message_type === 'system').length,
      importantMessages: messages.filter(m => m.is_important).length,
      dateRange: messages.length > 0 ? {
        start: messages[0].timestamp,
        end: messages[messages.length - 1].timestamp
      } : null
    }
  };
}

module.exports = { parseWhatsAppExport };
