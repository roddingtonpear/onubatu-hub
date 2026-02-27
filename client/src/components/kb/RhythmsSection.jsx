import { useState } from 'react'
import { RHYTHMS, STATUS_LABELS, NOTATION_PATTERNS } from '../../data/knowledge'

export default function RhythmsSection() {
  const [selected, setSelected] = useState('avenida')

  return (
    <div className="space-y-4">
      {/* Rhythm selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(RHYTHMS).map(([key, rhythm]) => {
          const status = STATUS_LABELS[rhythm.status]
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0
                ${selected === key
                  ? 'bg-onubatu-dark text-white shadow-sm'
                  : 'bg-white/70 text-gray-500 border border-gray-200 hover:bg-white'
                }`}
            >
              <span>{status.icon}</span>
              {rhythm.name}
            </button>
          )
        })}
      </div>

      {/* Selected rhythm detail */}
      {selected && <RhythmDetail rhythm={RHYTHMS[selected]} rhythmKey={selected} />}
    </div>
  )
}

function RhythmDetail({ rhythm, rhythmKey }) {
  const status = STATUS_LABELS[rhythm.status]

  // Find notation patterns for this rhythm
  const patterns = Object.values(NOTATION_PATTERNS).filter(p => p.rhythm === rhythmKey)

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-display text-xl font-bold text-onubatu-dark">{rhythm.name}</h3>
          {rhythm.nameAlt && (
            <span className="text-xs text-gray-400">/ {rhythm.nameAlt}</span>
          )}
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium ml-auto"
            style={{ backgroundColor: `${status.color}18`, color: status.color }}
          >
            {status.icon} {status.label}
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-3">{rhythm.description}</p>

        {rhythm.descriptionEs && (
          <p className="text-sm text-gray-400 italic mb-3">{rhythm.descriptionEs}</p>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          {rhythm.feel && (
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Feel</span>
              <p className="text-gray-700 mt-0.5">{rhythm.feel}</p>
            </div>
          )}
          {rhythm.clave && (
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Clave</span>
              <p className="text-gray-700 mt-0.5">{rhythm.clave}</p>
            </div>
          )}
        </div>

        {rhythm.notes && (
          <div className="mt-3 p-3 rounded-xl bg-onubatu-orange/10 border border-onubatu-orange/20">
            <p className="text-xs font-semibold text-onubatu-orange mb-1">Nota</p>
            <p className="text-sm text-gray-700">{rhythm.notes}</p>
          </div>
        )}
      </div>

      {/* Full sequence */}
      {rhythm.fullSequence && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
          <h4 className="font-display font-semibold text-onubatu-dark mb-3">Secuencia completa</h4>
          <p className="text-xs text-gray-400 mb-3">{rhythm.source}</p>
          <div className="space-y-2">
            {rhythm.fullSequence.map((step, i) => (
              <div key={i} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="w-7 h-7 rounded-full bg-onubatu-blue/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-onubatu-blue">{step.order}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-onubatu-dark">{step.name}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notation patterns */}
      {patterns.length > 0 && patterns.map((pattern, i) => (
        <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-display font-semibold text-onubatu-dark">
              {pattern.instrument.charAt(0).toUpperCase() + pattern.instrument.slice(1)} Patrón
            </h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-onubatu-purple/10 text-onubatu-purple">
              {pattern.feel}
            </span>
          </div>

          <pre className="bg-onubatu-dark/5 rounded-xl p-4 text-xs font-mono text-onubatu-dark overflow-x-auto mb-3">
            {pattern.grid}
          </pre>

          {pattern.tripletGrid && (
            <>
              <p className="text-xs text-gray-400 mb-2">Triplet grouping:</p>
              <pre className="bg-onubatu-dark/5 rounded-xl p-4 text-xs font-mono text-onubatu-dark overflow-x-auto mb-3">
                {pattern.tripletGrid}
              </pre>
            </>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(pattern.key).map(([symbol, meaning]) => (
              <span key={symbol} className="text-xs px-2 py-1 rounded-lg bg-gray-50 text-gray-600">
                <code className="font-mono font-bold text-onubatu-dark mr-1">{symbol}</code> {meaning}
              </span>
            ))}
          </div>

          {pattern.feel_description && (
            <p className="text-sm font-medium text-onubatu-dark italic">
              Feel: {pattern.feel_description}
            </p>
          )}

          {pattern.warning && (
            <div className="mt-3 p-2 rounded-lg bg-onubatu-orange/10 border border-onubatu-orange/20">
              <p className="text-xs text-onubatu-orange">⚠️ {pattern.warning}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
