export const INSTRUMENT_GROUPS = {
  agudos: {
    name: 'Agudos',
    nameEn: 'Voces agudas',
    description: 'Los instrumentos agudos — llevan la melodía, los patrones rítmicos y las llamadas y respuestas.',
    color: '#E8453C',
    instruments: ['tamborim', 'repinique', 'caixa', 'agogo', 'chocalho']
  },
  graves: {
    name: 'Graves',
    nameEn: 'Voces graves',
    description: 'La sección de graves — proporciona la base, el pulso y la potencia de la batucada.',
    color: '#3B82C4',
    instruments: ['surdo_fundo', 'surdo_dobra', 'timba']
  }
};

export const INSTRUMENTS = {
  tamborim: { name: 'Tamborim', group: 'agudos', description: 'Pequeño tambor de mano (~6"). Se toca con una baqueta flexible. Produce sonidos agudos y cortantes. A menudo toca patrones complejos y la técnica del "virado".', technique: 'Se sujeta con la mano no dominante, se golpea con baqueta flexible. La técnica del "virado" consiste en girar el tambor en ciertos tiempos para acentuar.', role: 'Lleva los patrones rítmicos melódicos. Suele tocar las partes más complejas. En llamada y respuesta, los tamborims forman parte de los agudos.', players: ['Aurora', 'Sergio', 'Mariquilla', 'Carlitos', 'Judith', 'Mery', 'Nuria'], icon: '🥁' },
  repinique: { name: 'Repinique', group: 'agudos', description: 'Tambor mediano (~10-12") que se lleva con correa. Se toca con un palo y una mano. La "voz líder" de la batucada — corta a través de todo.', technique: 'La mano del palo toca rim shots y rim clicks. La mano desnuda toca tonos abiertos, golpes apagados y slaps. Golpes clave: rim shot (X), rim click (R), tono abierto (o), apagado.', role: 'Voz líder. Marca los cortes, señala las transiciones, toca los patrones de llamada. En muchos ritmos el repinique inicia y el conjunto responde. Tiene más libertad para improvisar.', players: ['Inma', 'Dave'], icon: '🪘' },
  caixa: { name: 'Caixa', group: 'agudos', description: 'Caja clara con bordones en la parte inferior. Proporciona el "zumbido" constante y la energía de la batucada. Se toca con dos baquetas.', technique: 'Técnica de dos baquetas. Golpes alternos con acentos. Las notas fantasma crean el zumbido debajo. Rim clicks para acentos.', role: 'El motor — mantiene el impulso y la energía constante. Rellena los huecos entre otros instrumentos. En un pasacalle, la sección de caixa es lo que mantiene a todos en movimiento.', players: ['Adrián', 'Dave'], icon: '🥁' },
  agogo: { name: 'Agogô', group: 'agudos', description: 'Instrumento de doble campana (dos campanas metálicas de diferentes tonos). Se golpea con un palo. Cada ritmo tiene su propio patrón de agogô.', technique: 'Se sujetan las campanas con una mano y se golpean con el palo en la otra. Se alterna entre la campana aguda y grave. También se pueden apretar para un sonido apagado.', role: 'Lleva la línea temporal — similar a una clave en la música cubana. El patrón del agogô define qué ritmo se está tocando. Especialmente importante en los beats afro.', players: ['Virginia'], icon: '🔔' },
  chocalho: { name: 'Chocalho', group: 'agudos', description: 'Maraca/sonajero — un marco con cascabeles metálicos o platinelas. Proporciona brillo y textura.', technique: 'Se agita con movimiento de muñeca, acentuando ciertos tiempos. Se puede girar para diferentes timbres.', role: 'Añade textura y brillo. Rellena el espacio de alta frecuencia. A menudo toca un patrón constante que une todo.', players: [], icon: '🎵' },
  surdo_fundo: { name: 'Surdo de Fundo (1ª)', group: 'graves', description: 'El surdo más profundo y grande (~22-24"). El latido de la batucada. Toca en el tiempo 2 en la mayoría de los patrones de samba.', technique: 'Se toca con una maza grande y suave. Una mano sujeta la maza, la otra apaga el parche. Apagar en tiempo 1, golpe abierto en tiempo 2.', role: 'El pulso. Todo se construye sobre el fundo. En un pasacalle, es lo que la gente siente en el pecho. La marcação es la base de cada ritmo.', players: ['Jessi', 'Marta'], icon: '🪘' },
  surdo_dobra: { name: 'Surdo de Dobra (2ª)', group: 'graves', description: 'Surdo de rango medio (~18-20"). Toca un patrón complementario al fundo, generalmente en el tiempo 1. Junto con el fundo crea el groove del "latido".', technique: 'Misma técnica de maza que el fundo. El patrón se entrelaza con el fundo — cuando el fundo toca, la dobra apaga, y viceversa.', role: 'Se entrelaza con el fundo para crear el groove completo. La dobra "responde" al fundo. Juntos crean el boom-BOOM, boom-BOOM del samba.', players: ['Cynthia', 'Rocío'], icon: '🪘' },
  timba: { name: 'Timba / Timbau', group: 'graves', description: 'Tambor cónico ligero hecho de materiales sintéticos. Más agudo que los surdos pero aún en la sección de graves. Muy versátil.', technique: 'Se puede tocar con manos, baquetas o combinación. Tonos abiertos, slaps, tonos graves y golpes apagados.', role: 'Puente entre graves y agudos. Añade complejidad rítmica a la sección de graves. En algunos ritmos (especialmente afro), las timbas tocan patrones complejos.', players: ['Nacho', 'Iván', 'Teresa'], icon: '🪘' }
};

export const RHYTHMS = {
  avenida: { name: 'Avenida', nameAlt: 'Samba de Enredo', status: 'active', clave: 'Clave de Avenida (también: Son, Candombe, Congo, Teatro Falla Carnaval Cádiz)', feel: '4/4 recto, samba con mucha energía', description: 'El ritmo principal de desfile. Alta energía, impulso, potencia. Lo que las batucadas tocan marchando por la calle.', fullSequence: [{ order: 1, name: 'La Foto', description: 'Pose / congelados' }, { order: 2, name: 'Ritmo Avenida', description: 'Empieza el groove principal' }, { order: 3, name: 'Corte 1 Olodum "Je Je"', description: 'Primer corte — estilo Olodum' }, { order: 4, name: 'Un Break', description: 'Sección de break' }, { order: 5, name: 'Ritmo Avenida', description: 'Vuelve al groove principal' }, { order: 6, name: 'Corte 1 OnuBatú', description: 'Repetido 3×: las 2 primeras frenando, la 3ª continúa' }, { order: 7, name: '4 Claves y Stop', description: '4 claves de avenida y parada total' }], source: 'Vídeo de Sergio 7:41 enviado a Marta' },
  merengue: { name: 'Merengue', nameAlt: 'Samba Merengue', status: 'active', clave: 'Clave de Merengue (también: Bossa Nova)', feel: '4/4 recto', description: 'Ritmo de merengue con influencia de samba. Llamada y respuesta entre agudos y graves.', fullSequence: null },
  afro: { name: 'Afro', nameAlt: 'Samba Afro', status: 'learning', clave: null, feel: '6/8 o 12/8 swing/tresillo — NO es 4/4 recto', description: 'Ritmo sincopado con tresillo. Shuffle: largo-corto. Más espacio y libertad que el samba cerrado. El agogô es clave aquí.', fullSequence: null, notes: 'Sergio grabó patrones afro instrumento por instrumento al final del ensayo (finales de enero 2026). Los vídeos pueden estar por el grupo.' },
  swing: { name: 'Swing', nameAlt: 'Rumba', status: 'not_yet', clave: 'Clave de Swing (también: Rumba)', feel: 'Swing/shuffle', description: 'En la hoja de claves pero aún no enseñado al grupo.', fullSequence: null },
  reggae: { name: 'Reggae', nameAlt: 'Samba Reggae', status: 'not_yet', clave: null, feel: 'A medio tiempo, contratiempo fuerte', description: 'Samba reggae — de Salvador de Bahía. Más lento y pesado. Aún no en el repertorio.', fullSequence: null },
  samba_de_roda: { name: 'Samba de Roda', nameAlt: 'Toma ke Toma / Clave Coco / Partido Alto', status: 'not_yet', clave: 'Samba de Roda ½ Clave', feel: 'Samba en círculo', description: 'Samba de rueda tradicional de Bahía. En la hoja de claves pero aún no enseñado.', fullSequence: null }
};

export const CORTES = {
  avenida: [
    { name: 'Corte OnuBatú (Corte Largo)', signal: 'Señal: forma de O', rhythm: 'avenida', description: 'El corte característico de OnuBatú. Pakito grabó explicación 11/11/2025.', repinique: 'Pendiente de confirmar', source: 'Vídeo de Pakito 11/11/2025' },
    { name: 'Corte 1 Olodum "Je Je"', signal: null, rhythm: 'avenida', description: 'Corte estilo Olodum. Paso 3 de la secuencia de avenida.', repinique: 'Pendiente de confirmar', source: 'Vídeo secuencia de Sergio' },
    { name: 'Corte Avenida (Rodillo graves)', signal: null, rhythm: 'avenida', description: 'Graves hacen rodillo → repinique responde → "heys".', repinique: 'Responde después del rodillo', source: 'Pendiente confirmar en ensayo' }
  ],
  merengue: [
    { name: 'Merengue Corte 1', signal: null, rhythm: 'merengue', description: 'Todos suben → repinique 2× ráfagas de 5 golpes.', repinique: '2× ráfagas de 5 golpes', source: 'Ensayo' },
    { name: 'Merengue Corte 2', signal: null, rhythm: 'merengue', description: 'Empieza en tiempo 2, tresillos. Agudos preguntan, graves contestan.', repinique: 'Parte de agudos', source: 'Vídeo Sergio 01/02/2026' },
    { name: 'Merengue Corte 3', signal: null, rhythm: 'merengue', description: 'Todos juntos.', repinique: 'Toca con todos', source: 'Aclaración de Marta' },
    { name: 'Merengue Corte 3 Quebrado', signal: null, rhythm: 'merengue', description: 'Los agudos preguntan, los graves contestan.', repinique: 'Parte de la llamada de agudos', source: 'Marta: "el 3 quebrado es donde los agudos preguntan y los graves contestan"' }
  ],
  afro: [
    { name: 'Break Afro', signal: null, rhythm: 'afro', description: '3 golpes + 4 golpes → timbas hacen rodillo → vuelven a entrar.', repinique: '⚠️ Prioridad: clavar la re-entrada al groove afro.', source: 'Ensayo' }
  ],
  general: [
    { name: 'Pedi pa pará', signal: null, rhythm: 'general', description: 'Llamada específica del repinique.', repinique: 'El repinique inicia', source: 'Pendiente notación' },
    { name: 'Break "Hey"', signal: null, rhythm: 'general', description: 'Un golpe → todos gritan "HEY" → siguen tocando.', repinique: 'Toca el golpe', source: 'Ensayo' },
    { name: 'La Foto', signal: null, rhythm: 'general', description: '3 primeras notas de la clave → congelados/pose.', repinique: 'Toca los 3 golpes y se congela', source: 'Ensayo' },
    { name: 'Cambio a tresillo', signal: 'Señal: 3 dedos', rhythm: 'general', description: 'Cambia a sensación de tresillo.', repinique: 'Pendiente confirmar', source: 'Ensayo' }
  ]
};

export const HAND_SIGNALS = [
  { signal: 'Forma de O (mano)', meaning: 'Corte OnuBatú', context: 'Avenida', description: 'El director hace una O → Corte Largo / Corte OnuBatú' },
  { signal: '3 dedos', meaning: 'Cambio a tresillo', context: 'Cualquier ritmo', description: 'El director levanta 3 dedos → cambio a sensación de tresillo' },
  { signal: 'Puño cerrado', meaning: 'Parada / Silencio', context: 'Cualquier ritmo', description: 'Puño cerrado → parada total' },
  { signal: 'Palma abajo, bajando', meaning: 'Más suave', context: 'Cualquier ritmo', description: 'Baja la palma → reducir volumen' },
  { signal: 'Palma arriba, subiendo', meaning: 'Más fuerte', context: 'Cualquier ritmo', description: 'Sube la palma → aumentar volumen' },
  { signal: 'Movimiento circular', meaning: 'Continuar', context: 'Cualquier ritmo', description: 'Movimiento circular → seguir tocando' },
  { signal: 'Señalar a sección', meaning: 'Sección protagonista', context: 'Cualquier ritmo', description: 'Señala a una sección → solo esa sección toca' }
];

export const NOTATION_PATTERNS = {
  afro_repinique: {
    rhythm: 'afro', instrument: 'repinique', feel: 'Swing/tresillo',
    grid: `Tiempo: 1 . . . 2 . . . 3 . . . 4 . . .\nPalo:   X . . R . . X . . R . . X . . .\nMano:   . o . . o . . o . . o . . o . .`,
    tripletGrid: `|1 . .|2 . .|3 . .|4 . .|\n| X o .| R o .| X o .| R o .|`,
    key: { 'X': 'Rim shot / acento (palo)', 'R': 'Rim click (palo)', 'o': 'Tono abierto (mano)', '.': 'Silencio / nota fantasma' },
    feel_description: 'CRACK-pa... tick-pa... CRACK-pa... tick-pa...',
    warning: 'Patrón genérico — confirmar con lo que Sergio enseña',
    source: 'Patrones estándar de batucada afro'
  }
};

export const GLOSSARY = [
  { term: 'Agudos', translation: 'Instrumentos agudos (tamborim, repinique, caixa, agogô, chocalho)', category: 'instrument' },
  { term: 'Graves', translation: 'Instrumentos graves / bajos (surdos, timbas)', category: 'instrument' },
  { term: 'Marcação', translation: 'Patrón básico / groove de base (especialmente surdo)', category: 'music' },
  { term: 'Corte', translation: 'Un patrón preparado que interrumpe el groove', category: 'music' },
  { term: 'Clave', translation: 'La clave rítmica que define un ritmo. También los palos de madera.', category: 'music' },
  { term: 'Virado', translation: 'Técnica de girar el tamborim en ciertos tiempos', category: 'technique' },
  { term: 'Baqueta', translation: 'Palo / baqueta para tocar', category: 'equipment' },
  { term: 'Maza', translation: 'Mazo grande y suave (para surdos)', category: 'equipment' },
  { term: 'Mestre', translation: 'Maestro / Director — quien dirige la batucada (Sergio)', category: 'role' },
  { term: 'Pasacalle', translation: 'Desfile por la calle', category: 'event' },
  { term: 'Ensayo', translation: 'Práctica', category: 'event' },
  { term: 'Actuación', translation: 'Actuación / concierto', category: 'event' },
  { term: 'Quebrado', translation: 'Variación donde las secciones alternan en vez de tocar juntas', category: 'music' },
  { term: 'Chamada', translation: 'Llamada — frase musical que señala un cambio', category: 'music' },
  { term: 'Parada', translation: 'Parada / pausa en la música', category: 'music' },
  { term: 'Repique', translation: 'Rodillo / adorno en un tambor', category: 'technique' },
  { term: 'Rim shot', translation: 'Golpear aro y parche a la vez (sonido fuerte)', category: 'technique' },
  { term: 'Nota fantasma', translation: 'Golpe muy suave que añade textura sin oírse claramente', category: 'technique' },
  { term: 'Tono abierto', translation: 'Dejar que el parche vibre libremente después de golpear', category: 'technique' },
  { term: 'Golpe apagado', translation: 'Presionar la mano en el parche para parar la vibración', category: 'technique' },
  { term: 'Rueda de percusión', translation: 'Círculo de percusión', category: 'event' },
  { term: 'Tresillo', translation: 'Sensación de triplete — dividir el tiempo en 3 en vez de 2', category: 'music' },
];

export const YOUTUBE_RESOURCES = [
  { date: '2025-11-14', who: 'Sergio', title: 'Material de estudio Timbau/Djembe (×3)', urls: ['https://youtu.be/THm2au_oEXo', 'https://youtube.com/shorts/1LHLAMenfJg', 'https://youtu.be/pd4QWbyyK_I'], tags: ['timba', 'tutorial'] },
  { date: '2025-11-20', who: 'Sergio', title: 'Práctica de tamborim', urls: ['https://youtu.be/h1bIZ2NMOm8'], tags: ['tamborim', 'tutorial'] },
  { date: '2025-11-27', who: 'Sergio', title: 'Baquetas/mazas DIY', urls: ['https://youtu.be/jcwJOWHuBhw'], tags: ['equipo'] },
  { date: '2025-12-03', who: 'Tana', title: 'Técnica de surdo', urls: ['https://youtube.com/shorts/VWgYn6YvbvE'], tags: ['surdo', 'tutorial'] },
  { date: '2025-12-07', who: 'Sergio', title: 'Vídeo de referencia', urls: ['https://youtu.be/TWB8-kTd0LE'], tags: [] },
  { date: '2026-01-21', who: 'Manuel', title: 'Referencia', urls: ['https://youtu.be/X7SWXN-MUvg'], tags: [] },
  { date: '2026-01-31', who: 'Manuel', title: 'Sobre esa piedra empezó todo', urls: ['https://youtu.be/BdBRuHuUhJo'], tags: ['historia'] },
  { date: '2026-02-06', who: 'Adrián', title: 'Short', urls: ['https://youtube.com/shorts/-wZrJp-qz1c'], tags: [] },
];

export const EXTERNAL_RESOURCES = {
  spotify: { name: 'Playlist Batuquero (Colaborativa)', url: 'https://open.spotify.com/playlist/7vZFBetDhqRAge8B9MCDae', createdBy: 'Judith', date: '2026-02-06' },
  sergioYoutube: { name: 'YouTube de Sergio', url: 'https://youtube.com/@sergitofernandez2012' },
  shops: [
    { name: 'Grosso Percussion', note: 'Inma pidió su repique aquí' },
    { name: 'Tam Tam Percusión', note: 'Instrumentos' },
    { name: 'Percuforum', note: 'Instrumentos' },
    { name: 'Arte y Sonido', note: 'Local — Onujazz pidió el fundo 22" aquí' },
    { name: 'musicaltommy.com', note: 'Tienda recomendada por Manuel' },
  ]
};

export const STATUS_LABELS = {
  active: { label: 'Activo', color: '#4DB861', icon: '✅' },
  learning: { label: 'Aprendiendo', color: '#F5943B', icon: '🟡' },
  not_yet: { label: 'Pendiente', color: '#999', icon: '🔴' }
};
