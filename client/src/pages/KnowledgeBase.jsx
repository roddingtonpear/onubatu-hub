import { useState } from 'react'
import { Music, Drum, Hand, Scissors, BookOpen, Youtube, ExternalLink } from 'lucide-react'
import InstrumentsSection from '../components/kb/InstrumentsSection'
import RhythmsSection from '../components/kb/RhythmsSection'
import CortesSection from '../components/kb/CortesSection'
import SignalsSection from '../components/kb/SignalsSection'
import GlossarySection from '../components/kb/GlossarySection'
import ResourcesSection from '../components/kb/ResourcesSection'

const TABS = [
  { id: 'rhythms', label: 'Rhythms', labelEs: 'Ritmos', icon: Music },
  { id: 'instruments', label: 'Instruments', labelEs: 'Instrumentos', icon: Drum },
  { id: 'cortes', label: 'Cortes', labelEs: 'Cortes', icon: Scissors },
  { id: 'signals', label: 'Signals', labelEs: 'Señales', icon: Hand },
  { id: 'glossary', label: 'Glossary', labelEs: 'Glosario', icon: BookOpen },
  { id: 'resources', label: 'Resources', labelEs: 'Recursos', icon: Youtube },
]

function Drum(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="14" rx="10" ry="4"/>
      <path d="M2 14v2c0 2.2 4.5 4 10 4s10-1.8 10-4v-2"/>
    </svg>
  )
}

function Hand(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  )
}

const SECTION_MAP = {
  rhythms: RhythmsSection,
  instruments: InstrumentsSection,
  cortes: CortesSection,
  signals: SignalsSection,
  glossary: GlossarySection,
  resources: ResourcesSection,
}

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState('rhythms')
  const Section = SECTION_MAP[activeTab]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Knowledge Base</h2>
        <p className="text-sm text-gray-400 mt-1">Rhythms, instruments, cortes, signals & more</p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map(({ id, label, labelEs, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0
              ${activeTab === id
                ? 'bg-onubatu-blue text-white shadow-sm'
                : 'bg-white/60 text-gray-500 hover:bg-white hover:text-onubatu-dark border border-gray-100'
              }`}
          >
            <Icon size={13} />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{labelEs}</span>
          </button>
        ))}
      </div>

      {/* Active section */}
      <Section />
    </div>
  )
}
