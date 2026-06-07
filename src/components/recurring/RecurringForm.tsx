'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = [
  'מזון וסופר', 'דלק ותחבורה', 'בריאות וכושר', 'מנויים',
  'ביטוח', 'חשבונות', 'מסעדות ובילוי', 'הלבשה', 'חינוך', 'הכנסה', 'אחר'
]

export function RecurringForm({
  open,
  onClose,
  onSuccess,
  accounts,
}: {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  accounts: any[]
}) {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    accountId: accounts[0]?.id ?? '',
    paymentType: 'bank-order',
    frequency: 'MONTHLY',
    dayOfMonth: '1',
    category: 'מנויים',
    isActive: true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/recurring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount), dayOfMonth: parseInt(form.dayOfMonth) }),
      })
      onSuccess()
      onClose()
      setForm(f => ({ ...f, name: '', amount: '' }))
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
              <h2 className="text-lg font-bold">חיוב קבוע חדש</h2>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-text-muted block mb-1">שם החיוב</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  placeholder="נטפליקס, ביטוח, ..."
                />
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">סכום (₪)</label>
                <input required type="number" step="0.01" value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">חשבון חיוב</label>
                <select value={form.accountId} onChange={e => setForm(f => ({ ...f, accountId: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                >
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">אמצעי תשלום</label>
                <select value={form.paymentType} onChange={e => setForm(f => ({ ...f, paymentType: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                >
                  <option value="bank-order">הוראת קבע</option>
                  <option value="credit-card">כרטיס אשראי</option>
                  <option value="other">אחר</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">תדירות</label>
                <select value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                >
                  <option value="MONTHLY">חודשי</option>
                  <option value="WEEKLY">שבועי</option>
                  <option value="YEARLY">שנתי</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">יום בחודש</label>
                <input type="number" min="1" max="31" value={form.dayOfMonth}
                  onChange={e => setForm(f => ({ ...f, dayOfMonth: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">קטגוריה</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-aurora-1 text-white py-3 rounded-xl font-semibold hover:bg-aurora-1/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'שומר...' : 'הוסף חיוב קבוע'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
