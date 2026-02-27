import { useState, useEffect } from 'react'
import { MessageSquare, Image, Clock } from 'lucide-react'
import { getSenders } from '../utils/api'

const COLORS = ['#E8453C', '#3B82C4', '#4DB861', '#F5943B', '#8B5EA6', '#45B5AA', '#D64A8C', '#5B5EA6']

export default function Members() {
  const [senders, setSenders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSenders()
      .then(setSenders)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-onubatu-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const maxMessages = Math.max(...senders.map(s => parseInt(s.message_count)), 1)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Miembros</h2>
        <p className="text-sm text-gray-400 mt-1">{senders.length} personas en el chat</p>
      </div>

      <div className="grid gap-3">
        {senders.map((sender, i) => {
          const color = COLORS[i % COLORS.length]
          const pct = (parseInt(sender.message_count) / maxMessages) * 100

          return (
            <div
              key={sender.sender}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {sender.sender.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-onubatu-dark truncate">{sender.sender}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={11} />
                        {parseInt(sender.message_count).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Image size={11} />
                        {parseInt(sender.media_count).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Activity bar */}
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>

                  <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400">
                    <Clock size={9} />
                    Último mensaje: {new Date(sender.last_message).toLocaleDateString('es-ES', {
                      day: 'numeric', month: 'short', year: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
