import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import { Trophy, Moon, Sun, Image, MessageSquare, Clock, Flame, Smile, AlertCircle, Calendar } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const COLORS = ['#E8453C', '#3B82C4', '#4DB861', '#F5943B', '#8B5EA6', '#45B5AA', '#D64A8C', '#5B5EA6', '#F7D34A', '#999']
const MEDAL = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']

function LeaderboardCard({ title, icon: Icon, iconColor, data, labelKey = 'sender', valueKey = 'count', valueSuffix = '', emptyText = 'No data' }) {
  if (!data || data.length === 0) {
    return null
  }

  const max = Math.max(...data.map(d => parseInt(d[valueKey])), 1)

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon size={15} style={{ color: iconColor }} />
        </div>
        <h3 className="font-display font-semibold text-onubatu-dark text-sm">{title}</h3>
      </div>

      <div className="space-y-2.5">
        {data.map((item, i) => {
          const pct = (parseInt(item[valueKey]) / max) * 100
          return (
            <div key={i} className="animate-slide-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{MEDAL[i] || `${i + 1}.`}</span>
                  <span className="text-sm font-medium text-onubatu-dark truncate max-w-[140px]">{item[labelKey]}</span>
                </div>
                <span className="text-xs font-mono text-gray-500">
                  {parseInt(item[valueKey]).toLocaleString()}{valueSuffix}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BigStat({ icon: Icon, iconColor, label, value, sub }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon size={14} style={{ color: iconColor }} />
        </div>
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xl font-display font-bold text-onubatu-dark">{value}</p>
      {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function FunStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/chat/fun-stats`)
      .then(r => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-onubatu-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Upload a chat export first to see stats</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Stats & Leaderboards</h2>
        <p className="text-sm text-gray-400 mt-1">Who talks the most? Who's the night owl? 👀</p>
      </div>

      {/* Big highlight stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <BigStat
          icon={MessageSquare} iconColor="#3B82C4"
          label="Avg / Day"
          value={`${stats.avgPerDay} msgs`}
        />
        <BigStat
          icon={Calendar} iconColor="#4DB861"
          label="Busiest Day"
          value={stats.busiestDay?.day || '—'}
          sub={stats.busiestDay ? `${parseInt(stats.busiestDay.count).toLocaleString()} messages` : ''}
        />
        <BigStat
          icon={Clock} iconColor="#F5943B"
          label="Peak Hour"
          value={stats.busiestHour?.hour || '—'}
          sub={stats.busiestHour ? `${parseInt(stats.busiestHour.count).toLocaleString()} messages` : ''}
        />
        <BigStat
          icon={Flame} iconColor="#E8453C"
          label="Longest Streak"
          value={stats.longestStreak ? `${stats.longestStreak.streak_days} days` : '—'}
          sub={stats.longestStreak?.sender || ''}
        />
      </div>

      {/* Leaderboards grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        <LeaderboardCard
          title="Most Messages"
          icon={Trophy}
          iconColor="#F7D34A"
          data={stats.chattiest}
        />
        <LeaderboardCard
          title="Most Media Shared"
          icon={Image}
          iconColor="#4DB861"
          data={stats.mediaKings}
        />
        <LeaderboardCard
          title="Night Owls (00:00–05:00)"
          icon={Moon}
          iconColor="#8B5EA6"
          data={stats.nightOwls}
        />
        <LeaderboardCard
          title="Early Birds (06:00–08:00)"
          icon={Sun}
          iconColor="#F5943B"
          data={stats.earlyBirds}
        />
        <LeaderboardCard
          title="Longest Average Messages"
          icon={MessageSquare}
          iconColor="#3B82C4"
          data={stats.longestMessages}
          valueKey="avg_length"
          valueSuffix=" chars"
        />
        <LeaderboardCard
          title="Most 'Important' Messages"
          icon={AlertCircle}
          iconColor="#E8453C"
          data={stats.mostImportant}
        />
      </div>

      {/* The quiet ones */}
      {stats.quietest?.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🤫</span>
            <h3 className="font-display font-semibold text-onubatu-dark text-sm">The Quiet Ones</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.quietest.map((item, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                {item.sender} — {item.count} msgs
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Activity by hour chart */}
      {stats.hourBreakdown?.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
          <h3 className="font-display font-semibold text-onubatu-dark text-sm mb-4">Activity by Hour</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.hourBreakdown}>
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: '#999' }}
                tickFormatter={(h) => `${String(h).padStart(2, '0')}h`}
              />
              <YAxis tick={{ fontSize: 10, fill: '#999' }} />
              <Tooltip
                labelFormatter={(h) => `${String(h).padStart(2, '0')}:00 - ${String(h).padStart(2, '0')}:59`}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {stats.hourBreakdown.map((entry, i) => {
                  // Color by time of day
                  let color = '#3B82C4'
                  if (entry.hour >= 0 && entry.hour < 6) color = '#8B5EA6'   // night
                  else if (entry.hour >= 6 && entry.hour < 9) color = '#F5943B'  // morning
                  else if (entry.hour >= 9 && entry.hour < 14) color = '#F7D34A' // midday
                  else if (entry.hour >= 14 && entry.hour < 20) color = '#4DB861' // afternoon
                  else color = '#45B5AA' // evening
                  return <rect key={i} fill={color} />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 mt-2 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8B5EA6]" /> Night</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F5943B]" /> Morning</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F7D34A]" /> Midday</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#4DB861]" /> Afternoon</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#45B5AA]" /> Evening</span>
          </div>
        </div>
      )}

      {/* Activity by day chart */}
      {stats.dayBreakdown?.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
          <h3 className="font-display font-semibold text-onubatu-dark text-sm mb-4">Activity by Day of Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.dayBreakdown}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#999' }} tickFormatter={d => d.slice(0, 3)} />
              <YAxis tick={{ fontSize: 10, fill: '#999' }} />
              <Tooltip
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
