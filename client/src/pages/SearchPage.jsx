import { useState } from 'react'
import { Search, AlertCircle } from 'lucide-react'
import { searchMessages } from '../utils/api'

const COLORS = ['#E8453C', '#3B82C4', '#4DB861', '#F5943B', '#8B5EA6', '#45B5AA', '#D64A8C', '#5B5EA6']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const handleSearch = async (e, p = 1) => {
    if (e) e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setPage(p)
    try {
      const data = await searchMessages(query, p)
      setResults(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: '2-digit' }) +
      ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  // Simple hash for sender color
  const senderColor = (name) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return COLORS[Math.abs(hash) % COLORS.length]
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Search</h2>
        <p className="text-sm text-gray-400 mt-1">Find any message in the archive</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search messages... (supports Spanish full-text search)"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 text-sm
              focus:outline-none focus:border-onubatu-blue focus:ring-2 focus:ring-onubatu-blue/20 transition-all"
          />
        </div>
      </form>

      {/* Results */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-onubatu-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {results && !loading && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">{results.total} results found</p>

          {results.messages.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">No messages match your search</div>
          ) : (
            results.messages.map((msg, idx) => {
              const color = senderColor(msg.sender)
              return (
                <div
                  key={msg.id}
                  className="rounded-xl p-3 animate-slide-in"
                  style={{
                    animationDelay: `${idx * 20}ms`,
                    backgroundColor: `${color}10`,
                    borderLeft: `3px solid ${color}`
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color }}>
                          {msg.sender}
                        </span>
                        {msg.is_important && <AlertCircle size={12} className="text-onubatu-red" />}
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{msg.content}</p>
                      {msg.tags?.length > 0 && (
                        <div className="flex gap-1 mt-1.5">
                          {msg.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-onubatu-blue/10 text-onubatu-blue">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              )
            })
          )}

          {/* Pagination */}
          {results.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => handleSearch(null, page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-white/70 border border-gray-200 text-sm disabled:opacity-30"
              >
                Prev
              </button>
              <span className="text-sm text-gray-500">
                {page} / {results.totalPages}
              </span>
              <button
                onClick={() => handleSearch(null, page + 1)}
                disabled={page === results.totalPages}
                className="px-3 py-1.5 rounded-lg bg-white/70 border border-gray-200 text-sm disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {!results && !loading && (
        <div className="bg-white/70 rounded-2xl p-5 border border-gray-100 mt-8">
          <h3 className="font-display font-semibold text-onubatu-dark mb-2">Search tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Search in Spanish — the search engine understands Spanish word forms</li>
            <li>• Try rhythm names: <strong>avenida</strong>, <strong>merengue</strong>, <strong>reggae</strong></li>
            <li>• Search for events: <strong>ensayo</strong>, <strong>actuación</strong></li>
            <li>• Find by person: use the Messages page filter instead</li>
          </ul>
        </div>
      )}
    </div>
  )
}
