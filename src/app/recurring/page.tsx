'use client'
import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { RecurringForm } from '@/components/recurring/RecurringForm'

const PAYMENT_LABELS: Record<string, string> = {
  'bank-order': 'הוראת קבע',
  'credit-card': 'כרטיס אשראי',
  'other': 'אחר',
}

const FREQ_LABELS: Record<string, string> = {
  MONTHLY: 'חודשי',
  WEEKLY: 'שבועי',
  YEARLY: 'שנתי',
}

export default function RecurringPage() {
  const [items, setItems] = useState<any[]>([])
  const [accounts, setAccounts] = useState<any[]>([])
  const [formOpen, setFormOpen] = useState(false)

  const loadData = useCallback(async () => {
    const [recRes, accRes] = await Promise.all([
      fetch('/api/recurring'),
      fetch('/api/accounts'),
    ])
    setItems(await recRes.json())
    setAccounts(await accRes.json())
  }, [])

  useEffect(() => { loadData() }, [loadData])

  async function handleDelete(id: string) {
    await fetch(`/api/recurring/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(i => i.id !== id))
  }

  async function handleToggle(item: any) {
    await fetch(`/api/recurring/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !item.isActive }),
    })
    loadData()
  }

  const totalMonthly = items
    .filter(i => i.isActive && i.frequency === 'MONTHLY')
    .reduce((s, i) => s + i.amount, 0)

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">חיובים קבועים</h1>
            <p className="text-text-muted text-sm mt-1">
              סה&quot;כ חודשי: <span className="text-accent-red num font-semibold">₪{totalMonthly.toLocaleString('he-IL')}</span>
            </p>
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className="flex items-center gap-2 bg-aurora-1 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-aurora-1/90 transition-colors"
          >
            <Plus size={16} />
            חיוב חדש
          </button>
        </div>

        <div className="glass-card rounded-xl divide-y divide-white/5">
          {items.length === 0 && (
            <p className="text-text-muted text-sm text-center py-12">אין חיובים קבועים</p>
          )}
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex justify-between items-center p-4 ${!item.isActive ? 'opacity-50' : ''}`}
            >
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-text-muted text-xs">
                  {PAYMENT_LABELS[item.paymentType]} • {FREQ_LABELS[item.frequency]} • יום {item.dayOfMonth} • {item.account?.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="num font-semibold text-sm text-accent-red">₪{item.amount.toLocaleString('he-IL')}</span>
                <button onClick={() => handleToggle(item)} className="text-text-muted hover:text-text-primary">
                  {item.isActive ? <ToggleRight size={20} className="text-accent-green" /> : <ToggleLeft size={20} />}
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-text-muted hover:text-accent-red">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <RecurringForm open={formOpen} onClose={() => setFormOpen(false)} onSuccess={loadData} accounts={accounts} />
    </div>
  )
}
