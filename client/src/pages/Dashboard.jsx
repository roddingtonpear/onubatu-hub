import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { MessageSquare, Image, AlertCircle, Users, TrendingUp } from 'lucide-react'
import { getStats } from '../utils/api'

const COLORS = ['#E8453C', '#3B82C4', '#4DB861', '#F5943B', '#8B5EA6', '#45B5AA', '#D64A8C', '#5B5EA6', '#F7D34A']

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-display font-bold text-onubatu-dark">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-onubatu-blue border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading stats...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-onubatu-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload size={24} className="text-onubatu-orange" />
        </div>
        <h2 className="font-display text-xl font-bold text-onubatu-dark mb-2">No data yet</h2>
        <p className="text-gray-500 text-sm">Upload a WhatsApp export to get started</p>
      </div>
    )
  }

  const { totals, bySender, byType, byTag, byDate } = stats

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1">Overview of your OnuBatú group chat</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} label="Messages" value={Number(totals.total_messages).toLocaleString()} color="bg-onubatu-blue" />
        <StatCard icon={Image} label="Media" value={Number(totals.total_media).toLocaleString()} color="bg-onubatu-green" />
        <StatCard icon={AlertCircle} label="Important" value={Number(totals.total_important).toLocaleString()} color="bg-onubatu-red" />
        <StatCard icon={Users} label="Members" value={Number(totals.total_senders).toLocaleString()} color="bg-onubatu-purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages by sender */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h3 className="font-display font-semibold text-onubatu-dark mb-4">Top Senders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bySender.slice(0, 10)} layout="vertical" margin={{ left: 0, right: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#999' }} />
              <YAxis type="category" dataKey="sender" width={100} tick={{ fontSize: 11, fill: '#555' }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {bySender.slice(0, 10).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Message types pie */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h3 className="font-display font-semibold text-onubatu-dark mb-4">Message Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byType.filter(t => t.message_type !== 'system')}
                dataKey="count"
                nameKey="message_type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                paddingAngle={2}
                label={({ message_type, percent }) =>
                  `${message_type} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={{ stroke: '#ddd' }}
              >
                {byType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tags */}
      {byTag.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h3 className="font-display font-semibold text-onubatu-dark mb-4">Topics & Tags</h3>
          <div className="flex flex-wrap gap-2">
            {byTag.map((t, i) => (
              <span
                key={t.tag}
                className="tag-pill"
                style={{
                  backgroundColor: `${COLORS[i % COLORS.length]}18`,
                  color: COLORS[i % COLORS.length]
                }}
              >
                #{t.tag} ({t.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Activity by date */}
      {byDate.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <h3 className="font-display font-semibold text-onubatu-dark mb-4">
            <TrendingUp size={16} className="inline mr-2" />
            Recent Activity
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[...byDate].reverse()}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#999' }}
                tickFormatter={(d) => new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
              />
              <YAxis tick={{ fontSize: 11, fill: '#999' }} />
              <Tooltip
                labelFormatter={(d) => new Date(d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" fill="#3B82C4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

function Upload(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
