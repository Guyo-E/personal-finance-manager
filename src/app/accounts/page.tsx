'use client'
import { useEffect, useState, useCallback } from 'react'
import { Plus, Edit2, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { AccountForm } from '@/components/accounts/AccountForm'
import { CountUp } from '@/components/ui/CountUp'

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  CHECKING: 'עו"ש',
  CREDIT: 'אשראי',
  SAVINGS: 'חיסכון',
  INVESTMENT: 'השקעות',
  LOAN: 'הלוואה',
  PENSION: 'פנסיה',
  STUDY_FUND: 'קרן השתלמות',
  OTHER: 'אחר',
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editAccount, setEditAccount] = useState<any>(null)

  const loadAccounts = useCallback(async () => {
    const res = await fetch('/api/accounts')
    setAccounts(await res.json())
  }, [])

  useEffect(() => { loadAccounts() }, [loadAccounts])

  async function handleHide(id: string) {
    await fetch(`/api/accounts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false }),
    })
    loadAccounts()
  }

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">חשבונות</h1>
          <button
            onClick={() => { setEditAccount(null); setFormOpen(true) }}
            className="flex items-center gap-2 bg-aurora-1 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-aurora-1/90 transition-colors"
          >
            <Plus size={16} />
            חשבון חדש
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accounts.map((account, i) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5"
              style={{ borderColor: account.color + '40' }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: account.color }} />
                  <span className="text-text-muted text-xs">{ACCOUNT_TYPE_LABELS[account.type]}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditAccount(account); setFormOpen(true) }}
                    className="text-text-muted hover:text-text-primary"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleHide(account.id)}
                    className="text-text-muted hover:text-accent-red"
                  >
                    <EyeOff size={14} />
                  </button>
                </div>
              </div>
              <p className="font-semibold text-sm mb-2">{account.name}</p>
              <p className={`text-2xl font-bold num ${account.balance >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                <CountUp value={account.balance} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <AccountForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={loadAccounts}
        initial={editAccount}
      />
    </div>
  )
}
