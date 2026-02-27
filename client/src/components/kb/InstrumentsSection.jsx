import { useState } from 'react'
import { INSTRUMENTS, INSTRUMENT_GROUPS } from '../../data/knowledge'

export default function InstrumentsSection() {
  const [selected, setSelected] = useState(null)
  const [groupFilter, setGroupFilter] = useState('all')

  const filteredInstruments = Object.entries(INSTRUMENTS).filter(([key, inst]) => {
    if (groupFilter === 'all') return true
    return inst.group === groupFilter
  })

  return (
    <div className="space-y-4">
      {/* Group filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setGroupFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
            ${groupFilter === 'all' ? 'bg-onubatu-dark text-white' : 'bg-white/70 text-gray-500 border border-gray-200'}`}
        >
          All
        </button>
        {Object.entries(INSTRUMENT_GROUPS).map(([key, group]) => (
          <button
            key={key}
            onClick={() => setGroupFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${groupFilter === key ? 'text-white' : 'bg-white/70 text-gray-500 border border-gray-200'}`}
            style={groupFilter === key ? { backgroundColor: group.color } : {}}
          >
            {group.name} ({group.nameEn})
          </button>
        ))}
      </div>

      {/* Group descriptions */}
      {groupFilter !== 'all' && (
        <div
          className="rounded-xl p-4 animate-fade-in"
          style={{
            backgroundColor: `${INSTRUMENT_GROUPS[groupFilter].color}10`,
            borderLeft: `3px solid ${INSTRUMENT_GROUPS[groupFilter].color}`
          }}
        >
          <p className="text-sm font-medium" style={{ color: INSTRUMENT_GROUPS[groupFilter].color }}>
            {INSTRUMENT_GROUPS[groupFilter].name} — {INSTRUMENT_GROUPS[groupFilter].nameEn}
          </p>
          <p className="text-sm text-gray-600 mt-1">{INSTRUMENT_GROUPS[groupFilter].descriptionEn}</p>
        </div>
      )}

      {/* Instrument cards */}
      <div className="grid gap-3">
        {filteredInstruments.map(([key, inst], i) => {
          const group = INSTRUMENT_GROUPS[inst.group]
          const isOpen = selected === key

          return (
            <div
              key={key}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden animate-fade-in cursor-pointer transition-all hover:shadow-sm"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => setSelected(isOpen ? null : key)}
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{inst.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-onubatu-dark">{inst.name}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: `${group.color}18`, color: group.color }}
                      >
                        {group.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{inst.description}</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 space-y-3 animate-fade-in border-t border-gray-50 pt-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Técnica</p>
                    <p className="text-sm text-gray-700">{inst.technique}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Rol en el conjunto</p>
                    <p className="text-sm text-gray-700">{inst.role}</p>
                  </div>
                  {inst.players.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Jugadores OnuBatú</p>
                      <div className="flex flex-wrap gap-1.5">
                        {inst.players.map(p => (
                          <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {inst.descriptionEs && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">En español</p>
                      <p className="text-sm text-gray-500 italic">{inst.descriptionEs}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
