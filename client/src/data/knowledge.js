// OnuBatú Knowledge Base - seeded from group chat and past conversations
// This is the static reference data. Dynamic content comes from chat uploads via tags.

export const INSTRUMENT_GROUPS = {
  agudos: {
    name: 'Agudos',
    nameEn: 'High voices',
    description: 'Los instrumentos agudos — the high-pitched instruments that carry melody, rhythm patterns, and call-and-response leads.',
    descriptionEn: 'The high-pitched instruments that carry melody, rhythm patterns, and call-and-response leads.',
    color: '#E8453C',
    instruments: ['tamborim', 'repinique', 'caixa', 'agogo', 'chocalho']
  },
  graves: {
    name: 'Graves',
    nameEn: 'Low voices',
    description: 'Los instrumentos graves — the bass section that provides the foundation, pulse, and power of the batucada.',
    descriptionEn: 'The bass section that provides the foundation, pulse, and power of the batucada.',
    color: '#3B82C4',
    instruments: ['surdo_fundo', 'surdo_dobra', 'timba']
  }
};

export const INSTRUMENTS = {
  tamborim: {
    name: 'Tamborim',
    group: 'agudos',
    description: 'Small handheld frame drum (~6"). Played with a flexible stick (baqueta). Produces sharp, cutting high-pitched sounds. Often plays intricate patterns and the "virado" flip technique.',
    descriptionEs: 'Pequeño tambor de mano (~6"). Se toca con una baqueta flexible. Produce sonidos agudos y cortantes.',
    technique: 'Hold in non-dominant hand, strike with flexible stick. The "virado" technique involves flipping the drum on certain beats for accent patterns.',
    role: 'Carries melodic rhythm patterns. Often plays the most complex parts. In call-and-response, tamborims are part of the agudos (high) section.',
    players: ['Aurora', 'Sergio', 'Mariquilla', 'Carlitos', 'Judith', 'Mery', 'Nuria'],
    icon: '🥁'
  },
  repinique: {
    name: 'Repinique',
    group: 'agudos',
    description: 'Medium-sized drum (~10-12") worn with a strap. Played with one stick and one bare hand. The "lead voice" of the batucada — cuts through everything.',
    descriptionEs: 'Tambor mediano (~10-12") que se lleva con correa. Se toca con un palo y una mano. La "voz líder" de la batucada.',
    technique: 'Stick hand plays rim shots and rim clicks. Bare hand plays open tones, muted strokes, and slaps. Key strokes: rim shot (X), rim click (R), open tone (o), muted press.',
    role: 'Lead voice. Calls breaks (cortes), signals transitions, plays call patterns. In many rhythms the repinique initiates and the ensemble responds. Often has the most freedom for improvisation.',
    players: ['Inma', 'Dave'],
    icon: '🪘'
  },
  caixa: {
    name: 'Caixa',
    group: 'agudos',
    description: 'Snare drum with wire snares on the bottom head. Provides the constant "buzz" and drive of the batucada. Played with two sticks.',
    descriptionEs: 'Caja clara con bordones. Proporciona el "zumbido" constante y la energía de la batucada. Se toca con dos baquetas.',
    technique: 'Two-stick technique. Alternating strokes with accents. Ghost notes create the buzz underneath. Rim clicks for accents.',
    role: 'The engine — keeps constant drive and energy. Fills in the gaps between other instruments. In a parade, the caixa section is what keeps everyone moving.',
    players: ['Adrián', 'Dave'],
    icon: '🥁'
  },
  agogo: {
    name: 'Agogô',
    group: 'agudos',
    description: 'Double bell instrument (two connected metal bells of different pitches). Struck with a stick. Each rhythm has its own specific agogô pattern.',
    descriptionEs: 'Instrumento de doble campana (dos campanas metálicas de diferentes tonos conectadas). Se golpea con un palo.',
    technique: 'Hold bells in one hand, strike with stick in the other. Alternate between high and low bells to create the pattern. Can also squeeze bells together for a muted sound.',
    role: 'Carries the timeline — similar to a clave in Cuban music. The agogô pattern is often the "key" that defines which rhythm is being played. Especially important in afro beats.',
    players: ['Virginia'],
    icon: '🔔'
  },
  chocalho: {
    name: 'Chocalho',
    group: 'agudos',
    description: 'Shaker/rattle — a frame with metal jingles or platinelas. Provides shimmer and texture.',
    descriptionEs: 'Maraca/sonajero — un marco con cascabeles metálicos. Proporciona brillo y textura.',
    technique: 'Shake with wrist motion, accenting certain beats. Can be twisted for different timbres.',
    role: 'Adds texture and shimmer. Fills out the high-frequency space. Often plays a steady pattern that glues everything together.',
    players: [],
    icon: '🎵'
  },
  surdo_fundo: {
    name: 'Surdo de Fundo (1ª)',
    group: 'graves',
    description: 'The deepest, biggest surdo (~22-24"). The heartbeat of the batucada. Plays on beat 2 in most samba patterns.',
    descriptionEs: 'El surdo más profundo y grande (~22-24"). El latido de la batucada. Toca en el tiempo 2 en la mayoría de los patrones de samba.',
    technique: 'Played with a large soft mallet (maza). One hand holds the mallet, the other hand mutes the head. Mute on beat 1, open hit on beat 2.',
    role: 'The pulse. Everything is built on top of the fundo. In a parade, it\'s what people feel in their chest. The marcação (basic pattern) is the foundation of every rhythm.',
    players: ['Jessi', 'Marta'],
    icon: '🪘'
  },
  surdo_dobra: {
    name: 'Surdo de Dobra (2ª)',
    group: 'graves',
    description: 'Mid-range surdo (~18-20"). Plays a complementary pattern to the fundo, usually hitting on beat 1. Together with fundo creates the "heartbeat" groove.',
    descriptionEs: 'Surdo de rango medio (~18-20"). Toca un patrón complementario al fundo, generalmente golpeando en el tiempo 1.',
    technique: 'Same mallet technique as fundo. Pattern interlocks with fundo — when fundo plays, dobra mutes, and vice versa.',
    role: 'Interlocks with fundo to create the full bass groove. The dobra "answers" the fundo. Together they create the characteristic boom-BOOM, boom-BOOM of samba.',
    players: ['Cynthia', 'Rocío'],
    icon: '🪘'
  },
  timba: {
    name: 'Timba / Timbau',
    group: 'graves',
    description: 'Lightweight conical drum made of nylon/synthetic materials. Higher pitched than surdos but still in the graves section. Very versatile — can play bass patterns and melodic fills.',
    descriptionEs: 'Tambor cónico ligero hecho de materiales sintéticos. Más agudo que los surdos pero aún en la sección de graves.',
    technique: 'Can be played with hands, sticks, or combination. Hand technique includes open tones, slaps, bass tones, and muted strokes.',
    role: 'Bridge between graves and agudos. Adds rhythmic complexity to the bass section. In some rhythms (especially afro), timbas play intricate patterns and fills.',
    players: ['Nacho', 'Iván', 'Teresa'],
    icon: '🪘'
  }
};

export const RHYTHMS = {
  avenida: {
    name: 'Avenida',
    nameAlt: 'Samba de Enredo',
    status: 'active',
    clave: 'Avenida clave (also used for: Son, Candombe, Congo, Teatro Falla Carnaval Cádiz)',
    feel: 'Straight 4/4, driving samba feel',
    description: 'The main parade rhythm. High energy, driving, powerful. This is what batucadas play marching down the street. Named "avenida" (avenue) because it\'s the rhythm for the avenue/parade route.',
    descriptionEs: 'El ritmo principal de desfile. Alta energía, impulso, potencia. Lo que las batucadas tocan marchando por la calle.',
    fullSequence: [
      { order: 1, name: 'La Foto', description: 'Photo pose / freeze' },
      { order: 2, name: 'Ritmo Avenida', description: 'Main groove starts' },
      { order: 3, name: 'Corte 1 Olodum "Je Je"', description: 'First break — Olodum style' },
      { order: 4, name: 'Un Break', description: 'A break section' },
      { order: 5, name: 'Ritmo Avenida', description: 'Back to main groove' },
      { order: 6, name: 'Corte 1 OnuBatú', description: 'Repeated 3×: first 2 times slowing down as if stopping, 3rd time rhythm continues' },
      { order: 7, name: '4 Claves y Stop', description: '4 avenida claves then full stop' }
    ],
    source: 'Sergio video 7:41 sent to Marta — full sequence start to finish'
  },
  merengue: {
    name: 'Merengue',
    nameAlt: 'Samba Merengue',
    status: 'active',
    clave: 'Merengue clave (also used for: Bossa Nova)',
    feel: 'Straight 4/4, slightly different swing from avenida',
    description: 'A samba-influenced merengue feel. Features call-and-response between agudos and graves sections.',
    descriptionEs: 'Un ritmo de merengue con influencia de samba. Presenta llamada y respuesta entre secciones de agudos y graves.',
    fullSequence: null
  },
  afro: {
    name: 'Afro',
    nameAlt: 'Samba Afro',
    status: 'learning',
    clave: null,
    feel: '6/8 or 12/8 swing/triplet feel — NOT straight 4/4',
    description: 'Syncopated, triplet-feel rhythm rooted in Afro-Brazilian traditions. Think shuffle: long-short, long-short. Heavy downbeat emphasis, rolling/circular feel. More space and freedom than tighter samba patterns. The agogô bell pattern is especially important here as it carries the main timeline.',
    descriptionEs: 'Ritmo sincopado con sensación de tresillo enraizado en tradiciones afro-brasileñas. Más espacio y libertad que los patrones de samba más cerrados.',
    fullSequence: null,
    notes: 'Sergio recorded instrument-by-instrument afro patterns at end of rehearsal (late Jan 2026). Videos may be floating around in the group.'
  },
  swing: {
    name: 'Swing',
    nameAlt: 'Rumba',
    status: 'not_yet',
    clave: 'Swing clave (also used for: Rumba)',
    feel: 'Swing/shuffle feel',
    description: 'On the clave sheet but not yet taught to the group. Rumba-influenced swing rhythm.',
    descriptionEs: 'En la hoja de claves pero aún no enseñado al grupo. Ritmo de swing con influencia de rumba.',
    fullSequence: null
  },
  reggae: {
    name: 'Reggae',
    nameAlt: 'Samba Reggae',
    status: 'not_yet',
    clave: null,
    feel: 'Half-time feel, heavy backbeat',
    description: 'Samba reggae — originated in Salvador da Bahia. Slower, heavier feel with emphasis on the offbeat. Not yet in the OnuBatú repertoire.',
    descriptionEs: 'Samba reggae — originado en Salvador de Bahía. Ritmo más lento y pesado con énfasis en el contratiempo.',
    fullSequence: null
  },
  samba_de_roda: {
    name: 'Samba de Roda',
    nameAlt: 'Toma ke Toma / Clave Coco / Partido Alto',
    status: 'not_yet',
    clave: 'Samba de Roda ½ Clave',
    feel: 'Circle samba feel',
    description: 'Traditional circle samba from Bahia. On the clave sheet but not yet taught.',
    descriptionEs: 'Samba de rueda tradicional de Bahía. En la hoja de claves pero aún no enseñado.',
    fullSequence: null
  }
};

export const CORTES = {
  avenida: [
    {
      name: 'Corte OnuBatú (Corte Largo)',
      signal: 'Hand signal: O shape',
      rhythm: 'avenida',
      description: 'The signature OnuBatú cut. Also called "corte largo" (long cut). Pakito recorded an explanation on 11/11/2025.',
      repinique: 'Need to confirm specific part',
      source: 'Pakito explanation video 11/11/2025'
    },
    {
      name: 'Corte 1 Olodum "Je Je"',
      signal: null,
      rhythm: 'avenida',
      description: 'Olodum-style break. Part of the full avenida sequence (step 3).',
      repinique: 'Need to confirm',
      source: 'Sergio full sequence video'
    },
    {
      name: 'Avenida Corte (Graves Roll)',
      signal: null,
      rhythm: 'avenida',
      description: 'Graves do a roll → repinique responds → some "heys".',
      repinique: 'Responds after graves roll',
      source: 'Fuzzy — needs confirmation at rehearsal'
    }
  ],
  merengue: [
    {
      name: 'Merengue Corte 1',
      signal: null,
      rhythm: 'merengue',
      description: 'Everyone builds up → repinique starts with 2× 5-hit blasts.',
      repinique: '2× 5-hit blasts to initiate the cut',
      source: 'Rehearsal'
    },
    {
      name: 'Merengue Corte 2',
      signal: null,
      rhythm: 'merengue',
      description: 'Starts on beat 2, triplets. Call & response: agudos ask, graves answer.',
      repinique: 'Part of agudos response',
      source: 'Sergio video 01/02/2026'
    },
    {
      name: 'Merengue Corte 3',
      signal: null,
      rhythm: 'merengue',
      description: 'Everyone together (todos juntos).',
      repinique: 'Plays with full ensemble',
      source: 'Marta clarification'
    },
    {
      name: 'Merengue Corte 3 Quebrado',
      signal: null,
      rhythm: 'merengue',
      description: 'Call and response version of Corte 3: agudos (high-pitched) ask, graves (low-pitched) answer.',
      repinique: 'Part of agudos call',
      source: 'Marta clarification: "the 3 quebrado is where the high-pitched instruments ask and the low-pitched ones answer"'
    }
  ],
  afro: [
    {
      name: 'Afro Break',
      signal: null,
      rhythm: 'afro',
      description: '3 hits then 4 hits (per beat) → timbas do a little roll → jump back in.',
      repinique: 'Priority: nail the afro groove re-entry. Hardest rhythm to drop back into after a break.',
      source: 'Rehearsal'
    }
  ],
  general: [
    {
      name: 'Pedi pa pará',
      signal: null,
      rhythm: 'general',
      description: 'Repinique-specific call pattern.',
      repinique: 'Repinique initiates this call',
      source: 'Need notation/pattern'
    },
    {
      name: 'Break "Hey"',
      signal: null,
      rhythm: 'general',
      description: 'One shot → everyone shouts "HEY" → continue playing.',
      repinique: 'Plays the one shot',
      source: 'Rehearsal'
    },
    {
      name: 'Photo Break (La Foto)',
      signal: null,
      rhythm: 'general',
      description: 'First 3 notes of the clave (just the first 3 of the 5-note pattern) → freeze/pose.',
      repinique: 'Plays the 3 clave hits then freezes',
      source: 'Rehearsal'
    },
    {
      name: 'Triplet Beat Change',
      signal: 'Hand signal: 3 fingers',
      rhythm: 'general',
      description: 'Switches to triplet feel.',
      repinique: 'Need to confirm what repinique plays during/after transition',
      source: 'Rehearsal'
    }
  ]
};

export const HAND_SIGNALS = [
  {
    signal: 'O shape (hand)',
    meaning: 'Corte OnuBatú',
    context: 'Avenida rhythm',
    description: 'Director makes an O shape with hand → triggers the Corte Largo / Corte OnuBatú break'
  },
  {
    signal: '3 fingers',
    meaning: 'Triplet beat change',
    context: 'Any rhythm',
    description: 'Director holds up 3 fingers → ensemble switches to triplet feel'
  },
  {
    signal: 'Fist / closed hand',
    meaning: 'Stop / Silence',
    context: 'Any rhythm',
    description: 'Director closes fist → full stop. Everyone stops playing.'
  },
  {
    signal: 'Palm down, lowering',
    meaning: 'Quieter / Dynamics down',
    context: 'Any rhythm',
    description: 'Director lowers open palm → reduce volume gradually'
  },
  {
    signal: 'Palm up, raising',
    meaning: 'Louder / Dynamics up',
    context: 'Any rhythm',
    description: 'Director raises open palm → increase volume gradually'
  },
  {
    signal: 'Circular motion',
    meaning: 'Continue / Keep going',
    context: 'Any rhythm',
    description: 'Director makes circular motion → keep playing the current pattern'
  },
  {
    signal: 'Point to section',
    meaning: 'Section spotlight',
    context: 'Any rhythm',
    description: 'Director points to specific section (agudos, graves, tamborims, etc.) → only that section plays. Used in practice to layer parts and in call-and-response.'
  }
];

export const NOTATION_PATTERNS = {
  afro_repinique: {
    rhythm: 'afro',
    instrument: 'repinique',
    feel: 'Swung/triplet',
    grid: `Beat:  1 . . . 2 . . . 3 . . . 4 . . .
Stick: X . . R . . X . . R . . X . . .
Hand:  . o . . o . . o . . o . . o . .`,
    tripletGrid: `|1 . .|2 . .|3 . .|4 . .|
| X o .| R o .| X o .| R o .|`,
    key: {
      'X': 'Rim shot / accent (stick)',
      'R': 'Rim click (stick)',
      'o': 'Open tone (hand)',
      '.': 'Rest / ghost'
    },
    feel_description: 'CRACK-pa... tick-pa... CRACK-pa... tick-pa...',
    warning: 'Generic pattern — confirm with what Sergio actually teaches',
    source: 'Compiled from standard batucada afro patterns'
  }
};

export const GLOSSARY = [
  { term: 'Agudos', translation: 'High-pitched instruments (tamborim, repinique, caixa, agogô, chocalho)', category: 'instrument' },
  { term: 'Graves', translation: 'Low-pitched / bass instruments (surdos, timbas)', category: 'instrument' },
  { term: 'Marcação', translation: 'Basic pattern / foundation groove (especially surdo)', category: 'music' },
  { term: 'Corte', translation: 'Cut / break — a pre-arranged pattern that interrupts the groove', category: 'music' },
  { term: 'Clave', translation: 'The rhythmic key/pattern that defines a rhythm. Also the wooden sticks.', category: 'music' },
  { term: 'Virado', translation: 'Flip technique (tamborim) — flipping the drum on certain beats', category: 'technique' },
  { term: 'Baqueta', translation: 'Drumstick / beater', category: 'equipment' },
  { term: 'Maza', translation: 'Large soft mallet (for surdos)', category: 'equipment' },
  { term: 'Mestre', translation: 'Master / Director — the person who conducts the batucada (Sergio)', category: 'role' },
  { term: 'Pasacalle', translation: 'Street parade / procession', category: 'event' },
  { term: 'Ensayo', translation: 'Rehearsal', category: 'event' },
  { term: 'Actuación', translation: 'Performance / gig', category: 'event' },
  { term: 'Quebrado', translation: 'Broken — a variation where sections alternate instead of playing together', category: 'music' },
  { term: 'Chamada', translation: 'Call — a musical phrase that signals a change', category: 'music' },
  { term: 'Parada', translation: 'Stop / pause in the music', category: 'music' },
  { term: 'Repique', translation: 'Roll / flourish on a drum', category: 'technique' },
  { term: 'Rim shot', translation: 'Hitting the rim and head simultaneously for a loud crack', category: 'technique' },
  { term: 'Ghost note', translation: 'Very quiet stroke that adds texture without being heard distinctly', category: 'technique' },
  { term: 'Open tone', translation: 'Letting the drumhead ring freely after striking', category: 'technique' },
  { term: 'Muted stroke', translation: 'Pressing hand on head while/after striking to stop it ringing', category: 'technique' },
  { term: 'Rueda de percusión', translation: 'Percussion circle / drum circle', category: 'event' },
  { term: 'Tresillo', translation: 'Triplet feel — dividing the beat into 3 instead of 2', category: 'music' },
];

export const YOUTUBE_RESOURCES = [
  { date: '2025-11-14', who: 'Sergio', title: 'Timbau/Djembe study material (×3)', urls: ['https://youtu.be/THm2au_oEXo', 'https://youtube.com/shorts/1LHLAMenfJg', 'https://youtu.be/pd4QWbyyK_I'], tags: ['timba', 'tutorial'] },
  { date: '2025-11-20', who: 'Sergio', title: 'Tamborim practice', urls: ['https://youtu.be/h1bIZ2NMOm8'], tags: ['tamborim', 'tutorial'] },
  { date: '2025-11-27', who: 'Sergio', title: 'DIY baquetas/mazas', urls: ['https://youtu.be/jcwJOWHuBhw'], tags: ['equipment'] },
  { date: '2025-12-03', who: 'Tana', title: 'Surdo technique', urls: ['https://youtube.com/shorts/VWgYn6YvbvE'], tags: ['surdo', 'tutorial'] },
  { date: '2025-12-07', who: 'Sergio', title: 'Reference video', urls: ['https://youtu.be/TWB8-kTd0LE'], tags: [] },
  { date: '2026-01-21', who: 'Manuel', title: 'Reference', urls: ['https://youtu.be/X7SWXN-MUvg'], tags: [] },
  { date: '2026-01-31', who: 'Manuel', title: 'Sobre esa piedra empezó todo (origins)', urls: ['https://youtu.be/BdBRuHuUhJo'], tags: ['history'] },
  { date: '2026-02-06', who: 'Adrián', title: 'Short', urls: ['https://youtube.com/shorts/-wZrJp-qz1c'], tags: [] },
];

export const EXTERNAL_RESOURCES = {
  spotify: {
    name: 'Batuquero Playlist (Collaborative)',
    url: 'https://open.spotify.com/playlist/7vZFBetDhqRAge8B9MCDae',
    createdBy: 'Judith',
    date: '2026-02-06'
  },
  sergioYoutube: {
    name: "Sergio's YouTube",
    url: 'https://youtube.com/@sergitofernandez2012'
  },
  shops: [
    { name: 'Grosso Percussion', note: 'Inma ordered repique here' },
    { name: 'Tam Tam Percusión', note: 'Instruments' },
    { name: 'Percuforum', note: 'Instruments' },
    { name: 'Arte y Sonido', note: 'Local — Onujazz ordered fundo 22" here' },
    { name: 'musicaltommy.com', note: "Manuel's recommended shop" },
  ]
};

export const STATUS_LABELS = {
  active: { label: 'Active', labelEs: 'Activo', color: '#4DB861', icon: '✅' },
  learning: { label: 'Learning', labelEs: 'Aprendiendo', color: '#F5943B', icon: '🟡' },
  not_yet: { label: 'Not Yet', labelEs: 'Pendiente', color: '#999', icon: '🔴' }
};
