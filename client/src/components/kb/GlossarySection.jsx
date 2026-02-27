import { useState } from 'react'
import { GLOSSARY } from '../../data/knowledge'

const CATEGORY_LABELS = {
  instrument: { label: 'Instruments', color: '#3B82C4' },
  music: { label: 'Music', color: '#E8453C' },
  technique: { label: 'Technique', color: '#4DB861' },
  equipment: { label: 'Equipment', color: '#F5943B' },
  role: { label: 'Roles', color: '#8B5EA6' },
  event: { label: 'Events', color: '#45B5AA' },
  slang: { label: 'Slang', color: '#D64A8C' },
}

export default function GlossarySection() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = GLOSSARY.filter(item => {
    if (filter !== 'all' && item.category !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return item.term.toLowerCase().includes(q) || item.translation.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search glossary..."
        className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-gray-200 text-sm
          focus:outline-none focus:border-onubatu-blue focus:ring-2 focus:ring-onubatu-blue/20"
      />

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all
            ${filter === 'all' ? 'bg-onubatu-dark text-white' : 'bg-white/70 text-gray-500 border border-gray-100'}`}
        >
          All
        </button>
        {Object.entries(CATEGORY_LABELS).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap
              ${filter === key ? 'text-white' : 'bg-white/70 text-gray-500 border border-gray-100'}`}
            style={filter === key ? { backgroundColor: color } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Terms */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No matches found</div>
        ) : (
          filtered.map((item, i) => {
            const cat = CATEGORY_LABELS[item.category]
            return (
              <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 15, 300)}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-sm text-onubatu-dark">{item.term}</span>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{item.translation}</p>
                </div>
              </div>
            )
          })
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">{filtered.length} terms</p>
    </div>
  )
}
