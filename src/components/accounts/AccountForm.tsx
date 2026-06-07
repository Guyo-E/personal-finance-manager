'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCOUNT_TYPES = [
  { value: 'CHECKING', label: 'עו"ש' },
  { value: 'CREDIT', label: 'אשראי' },
  { value: 'SAVINGS', label: 'חיסכון' },
  { value: 'INVESTMENT', label: 'השקעות' },
  { value: 'LOAN', label: 'הלוואה' },
  { value: 'PENSION', label: 'פנסיה' },
  { value: 'STUDY_FUND', label: 'קרן השתלמות' },
  { value: 'OTHER', label: 'אחר' },
]

const PRESET_COLORS = ['#6366F1', '#22C55E', '#EF4444', '#F97316', '#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B']

export function AccountForm({
  open,
  onClose,
  onSuccess,
  initial,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  initial?: any
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    type: initial?.type ?? 'CHECKING',
    balance: initial?.balance?.toString() ?? '0',
    color: initial?.color ?? '#6366F1',
    currency: initial?.currency ?? 'ILS',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const url = initial ? `/api/accounts/${initial.id}` : '/api/accounts'
      const method = initial ? 'PATCH' : 'POST'
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, balance: parseFloat(form.balance) }),
      })
      onSuccess()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">{initial ? 'עריכת חשבון' : 'חשבון חדש'}</h2>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-text-muted block mb-1">שם החשבון</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  placeholder='למשל: פועלים 5558'
                />
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">סוג חשבון</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                >
                  {ACCOUNT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">יתרה נוכחית (₪)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.balance}
                  onChange={e => setForm(f => ({ ...f, balance: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">צבע</label>
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, color: c }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === c ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-aurora-1 text-white py-3 rounded-xl font-semibold hover:bg-aurora-1/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'שומר...' : initial ? 'שמור שינויים' : 'הוסף חשבון'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
