'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const CATEGORIES = [
  'מזון וסופר', 'דלק ותחבורה', 'בריאות וכושר', 'מנויים',
  'ביטוח', 'חשבונות', 'מסעדות ובילוי', 'הלבשה', 'חינוך', 'הכנסה', 'אחר'
]

export function AddTransactionSheet({
  accounts,
  open,
  onClose,
  onSuccess,
}: {
  accounts: any[]
  open: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [form, setForm] = useState({
    amount: '',
    type: 'EXPENSE',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    accountId: accounts[0]?.id ?? '',
    toAccountId: '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          toAccountId: form.type === 'TRANSFER' ? form.toAccountId : undefined,
        }),
      })
      onSuccess()
      onClose()
      setForm(f => ({ ...f, amount: '', description: '', category: '' }))
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
              <h2 className="text-lg font-bold">עסקה חדשה</h2>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type selector */}
              <div className="flex gap-2">
                {(['EXPENSE', 'INCOME', 'TRANSFER'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      form.type === t
                        ? t === 'INCOME' ? 'bg-accent-green text-white' : t === 'EXPENSE' ? 'bg-accent-red text-white' : 'bg-aurora-1 text-white'
                        : 'bg-white/5 text-text-muted hover:bg-white/10'
                    }`}
                  >
                    {t === 'EXPENSE' ? 'הוצאה' : t === 'INCOME' ? 'הכנסה' : 'העברה'}
                  </button>
                ))}
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs text-text-muted block mb-1">סכום (₪)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  placeholder="0.00"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-text-muted block mb-1">תיאור (אופציונלי)</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  placeholder="שם בית העסק"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs text-text-muted block mb-1">קטגוריה</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                >
                  <option value="">זיהוי אוטומטי</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs text-text-muted block mb-1">תאריך</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                />
              </div>

              {/* Account */}
              <div>
                <label className="text-xs text-text-muted block mb-1">חשבון</label>
                <select
                  value={form.accountId}
                  onChange={e => setForm(f => ({ ...f, accountId: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  required
                >
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              {/* To Account (transfer only) */}
              {form.type === 'TRANSFER' && (
                <div>
                  <label className="text-xs text-text-muted block mb-1">חשבון יעד</label>
                  <select
                    value={form.toAccountId}
                    onChange={e => setForm(f => ({ ...f, toAccountId: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                    required
                  >
                    <option value="">בחר חשבון</option>
                    {accounts.filter(a => a.id !== form.accountId).map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-aurora-1 text-white py-3 rounded-xl font-semibold hover:bg-aurora-1/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'שומר...' : 'הוסף עסקה'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
