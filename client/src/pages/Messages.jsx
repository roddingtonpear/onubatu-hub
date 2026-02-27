import { useState, useEffect, useCallback } from 'react'
import { Filter, ChevronLeft, ChevronRight, AlertCircle, Image, Video, Music, FileText } from 'lucide-react'
import { getMessages, getSenders } from '../utils/api'

const StickerIcon = () => <span className="text-base">🎭</span>

const TYPE_ICONS = {
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,
  sticker: StickerIcon,
  media: Image,
}

const COLORS = ['#E8453C', '#3B82C4', '#4DB861', '#F5943B', '#8B5EA6', '#45B5AA', '#D64A8C', '#5B5EA6']

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [senders, setSenders] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    sender: '',
    type: '',
    tag: '',
    important: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  const senderColorMap = {}
  senders.forEach((s, i) => {
    senderColorMap[s.sender] = i % COLORS.length
  })

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getMessages({ ...filters, page, limit: 50 })
      setMessages(data.messages)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }, [filters, page])

  useEffect(() => {
    getSenders().then(setSenders).catch(console.error)
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: '2-digit' }) +
      ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-onubatu-dark">Messages</h2>
          <p className="text-sm text-gray-400 mt-1">{total.toLocaleString()} messages</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
            ${showFilters ? 'bg-onubatu-blue text-white' : 'bg-white/70 text-gray-600 hover:bg-white border border-gray-200'}`}
        >
          <Filter size={14} /> Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 animate-fade-in grid grid-cols-2 lg:grid-cols-4 gap-3">
          <select
            value={filters.sender}
            onChange={e => { setFilters(f => ({ ...f, sender: e.target.value })); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-onubatu-blue"
          >
            <option value="">All senders</option>
            {senders.map(s => <option key={s.sender} value={s.sender}>{s.sender}</option>)}
          </select>

          <select
            value={filters.type}
            onChange={e => { setFilters(f => ({ ...f, type: e.target.value })); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-onubatu-blue"
          >
            <option value="">All types</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
          </select>

          <select
            value={filters.tag}
            onChange={e => { setFilters(f => ({ ...f, tag: e.target.value })); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-onubatu-blue"
          >
            <option value="">All tags</option>
            <option value="avenida">Avenida</option>
            <option value="merengue">Merengue</option>
            <option value="reggae">Reggae</option>
            <option value="afro">Afro</option>
            <option value="swing">Swing</option>
            <option value="rehearsal">Rehearsal</option>
            <option value="gig">Gig</option>
            <option value="tutorial">Tutorial</option>
          </select>

          <select
            value={filters.important}
            onChange={e => { setFilters(f => ({ ...f, important: e.target.value })); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-onubatu-blue"
          >
            <option value="">All messages</option>
            <option value="true">Important only</option>
          </select>
        </div>
      )}

      {/* Message list */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-onubatu-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">No messages found</div>
        ) : (
          messages.map((msg, idx) => {
            const colorIdx = senderColorMap[msg.sender] ?? 0
            const TypeIcon = TYPE_ICONS[msg.media_type]

            return (
              <div
                key={msg.id}
                className={`sender-bg-${colorIdx} rounded-xl p-3 animate-slide-in`}
                style={{ animationDelay: `${idx * 20}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold text-sm sender-color-${colorIdx}`}>
                        {msg.sender}
                      </span>
                      {msg.is_important && (
                        <AlertCircle size={12} className="text-onubatu-red flex-shrink-0" />
                      )}
                      {msg.has_media && TypeIcon && (
                        <TypeIcon size={12} className="text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
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
                  <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white/70 border border-gray-200 disabled:opacity-30 hover:bg-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-xl bg-white/70 border border-gray-200 disabled:opacity-30 hover:bg-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
