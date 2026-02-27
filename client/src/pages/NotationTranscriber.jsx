import { useState, useRef } from 'react'
import { Camera, Type, Loader, AlertTriangle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const RHYTHM_COLORS = {
  avenida: '#E8453C',
  merengue: '#3B82C4',
  afro: '#8B5EA6',
  swing: '#F5943B',
  reggae: '#4DB861',
  samba_de_roda: '#45B5AA',
  unknown: '#999',
}

const CONFIDENCE_STYLES = {
  high: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', label: 'High confidence' },
  medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', label: 'Medium — may need corrections' },
  low: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Low — likely needs manual fixes' },
}

export default function NotaciónTranscribirr() {
  const [mode, setMode] = useState('image') // 'image' | 'text'
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [showGuide, setShowGuide] = useState(false)
  const fileRef = useRef()

  const handleImageUpload = async (file) => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    setPreviewUrl(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${API_BASE}/notation/image`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Transcription failed')
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`${API_BASE}/notation/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Transcription failed')
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Transcriptor de Notación</h2>
        <p className="text-sm text-gray-400 mt-1">Foto o texto → notación limpia en formato tubos</p>
      </div>

      {/* How to read guide toggle */}
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="flex items-center gap-2 text-sm text-onubatu-blue font-medium hover:text-onubatu-dark transition-colors w-full"
      >
        <HelpCircle size={15} />
        Cómo leer la notación tubos
        {showGuide ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
      </button>

      {showGuide && <HowToReadGuide />}

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('image')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
            ${mode === 'image' ? 'bg-onubatu-blue text-white' : 'bg-white/70 text-gray-500 border border-gray-200'}`}
        >
          <Camera size={15} /> Photo
        </button>
        <button
          onClick={() => setMode('text')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
            ${mode === 'text' ? 'bg-onubatu-blue text-white' : 'bg-white/70 text-gray-500 border border-gray-200'}`}
        >
          <Type size={15} /> Text
        </button>
      </div>

      {/* Input area */}
      {mode === 'image' ? (
        <div
          className={`upload-zone rounded-2xl p-8 text-center cursor-pointer transition-all ${loading ? 'opacity-60 pointer-events-none' : ''}`}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {previewUrl && !loading ? (
            <div>
              <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-xl mb-3 shadow-sm" />
              <p className="text-xs text-gray-400">Toca para elegir otra foto</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 bg-onubatu-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Camera size={24} className="text-onubatu-blue" />
              </div>
              <p className="text-sm font-medium text-onubatu-dark mb-1">
                Sube una foto de notación
              </p>
              <p className="text-xs text-gray-400">
                Hojas escritas a mano, patrones de clave, notación de Sergio, capturas del móvil
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder={"Pega la notación aquí...\n\nExamples:\n• Copy from WhatsApp: \"X . o . X . o . X . o .\"\n• Sergio's patterns: \"1 e + a 2 e + a ...\"\n• Any text description: \"surdo fundo hits on 2 and 4, muted on 1 and 3\""}
            className="w-full h-48 px-4 py-3 rounded-2xl bg-white/70 border border-gray-200 text-sm font-mono
              focus:outline-none focus:border-onubatu-blue focus:ring-2 focus:ring-onubatu-blue/20 resize-none"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || loading}
            className="px-5 py-2.5 rounded-xl bg-onubatu-blue text-white text-sm font-medium
              hover:bg-onubatu-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Transcribir
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-8">
          <Loader size={18} className="text-onubatu-blue animate-spin" />
          <p className="text-sm text-gray-500">La IA está leyendo la notación...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-onubatu-red/10 rounded-2xl p-4 border border-onubatu-red/20 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-onubatu-red" />
            <span className="text-sm text-onubatu-red">{error}</span>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !loading && <NotaciónResult result={result} />}
    </div>
  )
}

function NotaciónResult({ result }) {
  if (result.raw) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 animate-fade-in">
        <p className="text-xs text-onubatu-orange font-medium mb-2">Couldn't structure the output — raw response:</p>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 rounded-xl p-4">{result.text}</pre>
      </div>
    )
  }

  const n = result.notation
  const conf = CONFIDENCE_STYLES[n.confidence] || CONFIDENCE_STYLES.medium
  const rhythmColor = RHYTHM_COLORS[n.rhythm] || RHYTHM_COLORS.unknown

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h3 className="font-display text-lg font-bold text-onubatu-dark">{n.title || 'Transcribird Pattern'}</h3>
          {n.rhythm && n.rhythm !== 'unknown' && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
              style={{ backgroundColor: `${rhythmColor}18`, color: rhythmColor }}
            >
              {n.rhythm.replace('_', ' ')}
            </span>
          )}
          {n.instrument && n.instrument !== 'unknown' && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-onubatu-purple/10 text-onubatu-purple font-medium capitalize">
              {n.instrument.replace('_', ' ')}
            </span>
          )}
        </div>

        <div className="flex gap-4 text-xs text-gray-500 mb-3">
          {n.timeSignature && <span>Time: {n.timeSignature}</span>}
          {n.feel && <span>Feel: {n.feel}</span>}
          {n.bpm && <span>BPM: {n.bpm}</span>}
          {n.bars && <span>{n.bars} bar{n.bars > 1 ? 's' : ''}</span>}
        </div>

        {/* Confidence */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${conf.bg} ${conf.border} ${conf.text} border`}>
          {n.confidence === 'high' ? '✅' : n.confidence === 'medium' ? '⚠️' : '❌'} {conf.label}
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
        <h4 className="font-display font-semibold text-onubatu-dark mb-3">Notación</h4>
        <pre className="bg-onubatu-dark rounded-xl p-5 text-sm font-mono text-green-300 overflow-x-auto leading-relaxed">
          {n.grid}
        </pre>
      </div>

      {/* Key */}
      {n.key && Object.keys(n.key).length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
          <h4 className="font-display font-semibold text-onubatu-dark mb-3">Key</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(n.key).map(([symbol, meaning]) => (
              <div key={symbol} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50">
                <code className="font-mono font-bold text-onubatu-dark text-base w-6 text-center">{symbol}</code>
                <span className="text-xs text-gray-600">{meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {n.notes && (
        <div className="bg-onubatu-blue/5 rounded-2xl p-4 border border-onubatu-blue/10">
          <p className="text-xs font-semibold text-onubatu-blue mb-1">Notas de interpretación</p>
          <p className="text-sm text-gray-700">{n.notes}</p>
        </div>
      )}
    </div>
  )
}

function HowToReadGuide() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 animate-fade-in space-y-4">
      <h3 className="font-display font-semibold text-onubatu-dark">How to Read Tubos Grid Notación</h3>

      <p className="text-sm text-gray-600">
        Tubos grid notation is a simple way to write down percussion patterns using a grid of boxes.
        Each box represents a tiny slice of time. Reading left to right is like listening to the rhythm play out.
      </p>

      {/* The grid explained */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">The Grid</p>
        <pre className="bg-onubatu-dark rounded-xl p-4 text-sm font-mono text-green-300 overflow-x-auto">
{`Beat:  1 . . . 2 . . . 3 . . . 4 . . .
Right: X . . o . . X . . o . . X . . .
Left:  . o . . o . . o . . o . . o . .`}
        </pre>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p><strong>Top row (Beat):</strong> Shows where beats 1, 2, 3, 4 fall. The dots between them are subdivisions — the "and" and "e" and "a" of each beat.</p>
          <p><strong>Other rows:</strong> Each row is a hand or stick. A symbol means "play something here." A dot means silence.</p>
          <p><strong>16 columns = 1 bar</strong> of 4/4 time (4 beats × 4 subdivisions each).</p>
        </div>
      </div>

      {/* Symbols */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Common Symbols</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            ['X', 'Accent / rim shot (LOUD)', '#E8453C'],
            ['x', 'Regular hit', '#F5943B'],
            ['o', 'Open tone (let it ring)', '#3B82C4'],
            ['m', 'Muted stroke (dead sound)', '#8B5EA6'],
            ['r', 'Rim click (stick on rim only)', '#45B5AA'],
            ['s', 'Slap (sharp, hand)', '#D64A8C'],
            ['g', 'Ghost note (barely there)', '#999'],
            ['.', 'Rest — silence', '#ccc'],
            ['R', 'Roll (multiple fast hits)', '#4DB861'],
          ].map(([sym, desc, color]) => (
            <div key={sym} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50">
              <code className="font-mono font-bold text-base w-5 text-center" style={{ color }}>{sym}</code>
              <span className="text-xs text-gray-600">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Straight vs Triplet */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Straight vs Triplet Feel</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-gray-50">
            <p className="text-xs font-semibold text-onubatu-dark mb-1">Straight (4/4) — 16 boxes</p>
            <p className="text-xs text-gray-500 mb-2">Avenida, Merengue, Reggae</p>
            <pre className="text-[11px] font-mono text-gray-700">1 . . . 2 . . . 3 . . . 4 . . .</pre>
            <p className="text-[10px] text-gray-400 mt-1">Even spacing. Like a ticking clock.</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50">
            <p className="text-xs font-semibold text-onubatu-dark mb-1">Triplet (6/8) — 12 boxes</p>
            <p className="text-xs text-gray-500 mb-2">Afro</p>
            <pre className="text-[11px] font-mono text-gray-700">1 . . 2 . . 3 . . 4 . .</pre>
            <p className="text-[10px] text-gray-400 mt-1">Shuffle feel. Long-short, long-short.</p>
          </div>
        </div>
      </div>

      {/* Example */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Example: Afro Repinique</p>
        <pre className="bg-onubatu-dark rounded-xl p-4 text-sm font-mono text-green-300 overflow-x-auto">
{`Beat:  1 . . 2 . . 3 . . 4 . .
Stick: X . . r . . X . . r . .
Hand:  . o . . o . . o . . o .`}
        </pre>
        <p className="text-sm text-gray-600 mt-2">
          Read it like this: On beat 1, the stick plays a loud rim shot (<code className="font-mono font-bold text-onubatu-red">X</code>). 
          Then the hand plays an open tone (<code className="font-mono font-bold text-onubatu-blue">o</code>). 
          Then silence. On beat 2, the stick plays a quiet rim click (<code className="font-mono font-bold text-onubatu-teal">r</code>), 
          followed by another hand open tone. And so on.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          The feel is: <strong className="text-onubatu-dark">CRACK-pa... tick-pa... CRACK-pa... tick-pa...</strong>
        </p>
      </div>

      {/* Tips */}
      <div className="p-3 rounded-xl bg-onubatu-green/10 border border-onubatu-green/20">
        <p className="text-xs font-semibold text-onubatu-green mb-1">Tips</p>
        <ul className="text-xs text-gray-600 space-y-0.5">
          <li>• Start slow — clap or tap the pattern before playing on the drum</li>
          <li>• Focus on where the accents (X) fall first, then fill in the softer hits</li>
          <li>• Record yourself and compare to the group sound</li>
          <li>• The grid loops — when you reach the end, go straight back to the start</li>
        </ul>
      </div>
    </div>
  )
}
