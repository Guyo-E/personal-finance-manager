'use client'
import { useEffect, useState, useCallback } from 'react'
import { Save } from 'lucide-react'

const CURRENCIES = [
  { value: 'ILS', label: '₪ שקל (ILS)' },
  { value: 'USD', label: '$ דולר (USD)' },
  { value: 'EUR', label: '€ יורו (EUR)' },
  { value: 'GBP', label: '£ פאונד (GBP)' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState({ currency: 'ILS', locale: 'he-IL', theme: 'dark' })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/settings')
    const data = await res.json()
    if (data) setSettings(data)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">הגדרות</h1>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-sm text-text-muted uppercase tracking-wide">כללי</h2>

            <div>
              <label className="text-xs text-text-muted block mb-1">מטבע</label>
              <select
                value={settings.currency}
                onChange={e => setSettings(s => ({ ...s, currency: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
              >
                {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-sm text-text-muted uppercase tracking-wide">גיבוי נתונים</h2>
            <p className="text-text-muted text-sm">ייצוא כל הנתונים לקובץ CSV דרך דף הייצוא.</p>
            <a
              href="/export"
              className="inline-flex items-center gap-2 text-aurora-1 text-sm hover:underline"
            >
              עבור לדף ייצוא ←
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-aurora-1 text-white px-6 py-3 rounded-xl font-semibold hover:bg-aurora-1/90 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saved ? 'נשמר!' : loading ? 'שומר...' : 'שמור הגדרות'}
          </button>
        </form>
      </div>
    </div>
  )
}
