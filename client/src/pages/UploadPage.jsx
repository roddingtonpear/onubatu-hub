import { useState, useRef, useEffect } from 'react'
import { Upload, FileText, Trash2, CheckCircle, AlertTriangle } from 'lucide-react'
import { uploadChat, getExports, deleteExport } from '../utils/api'

export default function UploadPage() {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [exports, setExports] = useState([])
  const inputRef = useRef()

  useEffect(() => {
    getExports().then(setExports).catch(console.error)
  }, [])

  const handleFile = async (file) => {
    if (!file) return
    setUploading(true)
    setError(null)
    setResult(null)

    try {
      const data = await uploadChat(file)
      setResult(data)
      const updated = await getExports()
      setExports(updated)
    } catch (err) {
      setError(err.message)
    }
    setUploading(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this export and all its messages?')) return
    try {
      await deleteExport(id)
      setExports(prev => prev.filter(e => e.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="font-display text-2xl font-bold text-onubatu-dark">Upload</h2>
        <p className="text-sm text-gray-400 mt-1">Import a WhatsApp chat export</p>
      </div>

      {/* Drop zone */}
      <div
        className={`upload-zone rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt,.zip"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {uploading ? (
          <div>
            <div className="w-10 h-10 border-2 border-onubatu-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Processing chat export...</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 bg-onubatu-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-onubatu-blue" />
            </div>
            <p className="text-sm font-medium text-onubatu-dark mb-1">
              Drop your WhatsApp export here
            </p>
            <p className="text-xs text-gray-400">
              .txt file from WhatsApp → Settings → Chat → Export Chat
            </p>
          </>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="bg-onubatu-green/10 rounded-2xl p-5 border border-onubatu-green/20 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={16} className="text-onubatu-green" />
            <span className="font-semibold text-sm text-onubatu-green">Upload successful!</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Messages:</div>
            <div className="font-medium text-onubatu-dark">{result.stats.totalMessages.toLocaleString()}</div>
            <div className="text-gray-500">Text:</div>
            <div className="font-medium text-onubatu-dark">{result.stats.textMessages.toLocaleString()}</div>
            <div className="text-gray-500">Media refs:</div>
            <div className="font-medium text-onubatu-dark">{result.stats.mediaMessages.toLocaleString()}</div>
            <div className="text-gray-500">Members:</div>
            <div className="font-medium text-onubatu-dark">{result.senders.length}</div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-onubatu-red/10 rounded-2xl p-5 border border-onubatu-red/20 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-onubatu-red" />
            <span className="text-sm text-onubatu-red">{error}</span>
          </div>
        </div>
      )}

      {/* Previous exports */}
      {exports.length > 0 && (
        <div>
          <h3 className="font-display font-semibold text-onubatu-dark mb-3">Previous Uploads</h3>
          <div className="space-y-2">
            {exports.map(exp => (
              <div key={exp.id} className="bg-white/70 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-onubatu-blue" />
                  <div>
                    <p className="text-sm font-medium text-onubatu-dark">{exp.filename}</p>
                    <p className="text-xs text-gray-400">
                      {exp.message_count} messages · {new Date(exp.uploaded_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-onubatu-red hover:bg-onubatu-red/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How to export */}
      <div className="bg-white/70 rounded-2xl p-5 border border-gray-100">
        <h3 className="font-display font-semibold text-onubatu-dark mb-2">How to export from WhatsApp</h3>
        <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
          <li>Open the OnuBatú group chat</li>
          <li>Tap the group name at the top</li>
          <li>Scroll down → <strong>Export Chat</strong></li>
          <li>Choose <strong>"Without Media"</strong> (for now)</li>
          <li>Save or share the .txt file</li>
          <li>Upload it here</li>
        </ol>
      </div>
    </div>
  )
}
