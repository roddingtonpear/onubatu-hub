import { HAND_SIGNALS } from '../../data/knowledge'

const SIGNAL_COLORS = ['#E8453C', '#3B82C4', '#4DB861', '#F5943B', '#8B5EA6', '#45B5AA', '#D64A8C']

export default function SignalsSection() {
  return (
    <div className="space-y-4">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
        <p className="text-sm text-gray-600">
          The mestre (director — Sergio or Charly) uses hand signals to communicate with the group during performances and rehearsals. 
          These signals tell the ensemble when to start, stop, change rhythm, play a corte, or adjust dynamics.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Nuria noted: "Sergio's signals, what each one means" — Marta has been documenting these in her videos.
        </p>
      </div>

      <div className="grid gap-3">
        {HAND_SIGNALS.map((signal, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 animate-fade-in"
            style={{
              animationDelay: `${i * 50}ms`,
              borderLeft: `3px solid ${SIGNAL_COLORS[i % SIGNAL_COLORS.length]}`
            }}
          >
            <div className="flex items-start gap-4">
              {/* Signal visual */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ backgroundColor: `${SIGNAL_COLORS[i % SIGNAL_COLORS.length]}12` }}
              >
                {getSignalEmoji(signal.signal)}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-display font-semibold text-onubatu-dark">{signal.signal}</h4>
                  {signal.context !== 'Any rhythm' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-onubatu-blue/10 text-onubatu-blue">
                      {signal.context}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: SIGNAL_COLORS[i % SIGNAL_COLORS.length] }}>
                  → {signal.meaning}
                </p>
                <p className="text-xs text-gray-500">{signal.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note about incomplete signals */}
      <div className="bg-onubatu-orange/10 rounded-2xl p-4 border border-onubatu-orange/20">
        <p className="text-sm text-onubatu-orange font-medium mb-1">Work in progress</p>
        <p className="text-xs text-gray-600">
          This is not a complete list. Sergio uses many signals and they evolve as the group adds new cortes and rhythms. 
          If you spot a signal we haven't documented, add it to the group chat and it'll get picked up here.
        </p>
      </div>
    </div>
  )
}

function getSignalEmoji(signal) {
  if (signal.includes('O shape')) return '🫳'
  if (signal.includes('3 fingers')) return '🤟'
  if (signal.includes('Fist')) return '✊'
  if (signal.includes('down, lower')) return '🫲'
  if (signal.includes('up, rais')) return '🫱'
  if (signal.includes('Circular')) return '🔄'
  if (signal.includes('Point')) return '👉'
  return '✋'
}
