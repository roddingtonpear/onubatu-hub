import { Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, MessageSquare, Users, Upload, Search, BookOpen, Music, BarChart2, Menu, X } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import Members from './pages/Members'
import UploadPage from './pages/UploadPage'
import SearchPage from './pages/SearchPage'
import KnowledgeBase from './pages/KnowledgeBase'
import NotationTranscriber from './pages/NotationTranscriber'
import FunStats from './pages/FunStats'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Inicio' },
  { to: '/knowledge', icon: BookOpen, label: 'Guía' },
  { to: '/notation', icon: Music, label: 'Notación' },
  { to: '/stats', icon: BarChart2, label: 'Estadísticas' },
  { to: '/messages', icon: MessageSquare, label: 'Mensajes' },
  { to: '/members', icon: Users, label: 'Miembros' },
  { to: '/search', icon: Search, label: 'Buscar' },
  { to: '/upload', icon: Upload, label: 'Subir' },
]

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen watercolor-bg flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-xl border-r border-onubatu-blue/10
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Logo area */}
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-onubatu-dark tracking-tight">
              Onu<span className="text-onubatu-blue">Batú</span>
            </h1>
            <p className="text-xs text-gray-400 font-body mt-1">Hub · by OnuJazz</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-onubatu-blue/10 text-onubatu-blue'
                    : 'text-gray-500 hover:text-onubatu-dark hover:bg-gray-50'}
                `}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-onubatu-red/5 via-onubatu-blue/5 to-onubatu-green/5 border border-onubatu-blue/10">
            <p className="text-xs text-gray-500 leading-relaxed">
              Sube los exports de WhatsApp para organizar el chat de tu grupo de batucada
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-onubatu-blue/10 bg-white/60 backdrop-blur-lg sticky top-0 z-20">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-display text-lg font-bold text-onubatu-dark">
            Onu<span className="text-onubatu-blue">Batú</span> Hub
          </h1>
          <div className="w-9" />
        </div>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/notation" element={<NotationTranscriber />} />
            <Route path="/stats" element={<FunStats />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/members" element={<Members />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
