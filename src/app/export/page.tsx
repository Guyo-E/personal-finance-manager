'use client'
import { useState } from 'react'
import { Download } from 'lucide-react'

export default function ExportPage() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  function handleExport() {
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    window.open(`/api/export?${params.toString()}`, '_blank')
  }

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">ייצוא נתונים</h1>

        <div className="glass-card rounded-xl p-6 space-y-4">
          <p className="text-text-muted text-sm">ייצוא עסקאות לקובץ CSV (ניתן לפתיחה ב-Excel)</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-text-muted block mb-1">מתאריך</label>
              <input
                type="date"
                value={from}
                onChange={e => setFrom(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted block mb-1">עד תאריך</label>
              <input
                type="date"
                value={to}
                onChange={e => setTo(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
              />
            </div>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-aurora-1 text-white px-6 py-3 rounded-xl font-semibold hover:bg-aurora-1/90 transition-colors"
          >
            <Download size={18} />
            הורד CSV
          </button>
        </div>
      </div>
    </div>
  )
}
