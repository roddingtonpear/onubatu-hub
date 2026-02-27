import { useState } from 'react'
import { CORTES, RHYTHMS } from '../../data/knowledge'

const RHYTHM_COLORS = {
  avenida: '#E8453C',
  merengue: '#3B82C4',
  afro: '#8B5EA6',
  general: '#45B5AA',
}

export default function CortesSection() {
  const [filter, setFilter] = useState('all')

  const sections = filter === 'all'
    ? Object.entries(CORTES)
    : Object.entries(CORTES).filter(([key]) => key === filter)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
            ${filter === 'all' ? 'bg-onubatu-dark text-white' : 'bg-white/70 text-gray-500 border border-gray-200'}`}
        >
          Todos los cortes
        </button>
        {Object.keys(CORTES).map(key => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize
              ${filter === key ? 'text-white' : 'bg-white/70 text-gray-500 border border-gray-200'}`}
            style={filter === key ? { backgroundColor: RHYTHM_COLORS[key] } : {}}
          >
            {key === 'general' ? 'General' : RHYTHMS[key]?.name || key}
          </button>
        ))}
      </div>

      {/* Cortes list */}
      {sections.map(([rhythmKey, cortes]) => (
        <div key={rhythmKey} className="space-y-2">
          <h3
            className="font-display font-semibold text-sm uppercase tracking-wide px-1"
            style={{ color: RHYTHM_COLORS[rhythmKey] }}
          >
            {rhythmKey === 'general' ? 'General / Todos los ritmos' : `${RHYTHMS[rhythmKey]?.name || rhythmKey} Cortes`}
          </h3>

          {cortes.map((corte, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 animate-fade-in"
              style={{
                animationDelay: `${i * 40}ms`,
                borderLeft: `3px solid ${RHYTHM_COLORS[rhythmKey]}`
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-display font-semibold text-onubatu-dark">{corte.name}</h4>
                {corte.signal && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-onubatu-orange/10 text-onubatu-orange whitespace-nowrap">
                    {corte.signal}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-2">{corte.description}</p>

              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5 flex-shrink-0 w-16">Repi</span>
                  <p className="text-sm text-onubatu-dark">{corte.repinique}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5 flex-shrink-0 w-16">Fuente</span>
                  <p className="text-xs text-gray-400">{corte.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
