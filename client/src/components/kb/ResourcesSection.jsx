import { YOUTUBE_RESOURCES, EXTERNAL_RESOURCES } from '../../data/knowledge'

export default function ResourcesSection() {
  return (
    <div className="space-y-6">
      {/* YouTube videos */}
      <div>
        <h3 className="font-display font-semibold text-onubatu-dark mb-3">Vídeos de YouTube compartidos en el grupo</h3>
        <div className="space-y-2">
          {YOUTUBE_RESOURCES.map((res, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-500 text-sm">▶</span>
                    <span className="text-sm font-medium text-onubatu-dark">{res.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Compartido por {res.who}</span>
                    <span>·</span>
                    <span>{new Date(res.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: '2-digit' })}</span>
                  </div>
                  {res.tags.length > 0 && (
                    <div className="flex gap-1 mt-1.5">
                      {res.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-onubatu-blue/10 text-onubatu-blue">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {res.urls.map((url, j) => (
                    <a
                      key={j}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap"
                    >
                      {res.urls.length > 1 ? `Vídeo ${j + 1}` : 'Ver'}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🎵</span>
          <div>
            <h3 className="font-display font-semibold text-onubatu-dark">{EXTERNAL_RESOURCES.spotify.name}</h3>
            <p className="text-xs text-gray-400">Created by {EXTERNAL_RESOURCES.spotify.createdBy}</p>
          </div>
        </div>
        <a
          href={EXTERNAL_RESOURCES.spotify.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
        >
          Abrir en Spotify
        </a>
      </div>

      {/* Sergio's YouTube */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🎬</span>
          <div>
            <h3 className="font-display font-semibold text-onubatu-dark">{EXTERNAL_RESOURCES.sergioYoutube.name}</h3>
            <p className="text-xs text-gray-400">Canal del director musical</p>
          </div>
        </div>
        <a
          href={EXTERNAL_RESOURCES.sergioYoutube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
        >
          Ver canal
        </a>
      </div>

      {/* Shops */}
      <div>
        <h3 className="font-display font-semibold text-onubatu-dark mb-3">Tiendas de instrumentos</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {EXTERNAL_RESOURCES.shops.map((shop, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-gray-100"
            >
              <p className="text-sm font-medium text-onubatu-dark">{shop.name}</p>
              <p className="text-xs text-gray-400">{shop.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
