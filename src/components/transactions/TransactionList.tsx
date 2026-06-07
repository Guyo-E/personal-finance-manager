'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'

export function TransactionList({
  transactions,
  onDelete,
}: {
  transactions: any[]
  onDelete: (id: string) => void
}) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<string>('')

  const filtered = transactions.filter(t => {
    const matchSearch = !search ||
      t.description?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase())
    const matchType = !filterType || t.type === filterType
    return matchSearch && matchType
  })

  return (
    <div className="glass-card rounded-xl p-5">
      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="חיפוש..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-32 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
        />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
        >
          <option value="">הכל</option>
          <option value="INCOME">הכנסות</option>
          <option value="EXPENSE">הוצאות</option>
          <option value="TRANSFER">העברות</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-1">
        {filtered.length === 0 && (
          <p className="text-text-muted text-sm text-center py-8">אין עסקאות</p>
        )}
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.description || t.category}</p>
              <p className="text-text-muted text-xs">
                {format(new Date(t.date), 'dd/MM/yyyy')} • {t.category} • {t.account?.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`num font-semibold text-sm ${t.type === 'INCOME' ? 'text-accent-green' : t.type === 'TRANSFER' ? 'text-aurora-1' : 'text-accent-red'}`}>
                {t.type === 'INCOME' ? '+' : t.type === 'TRANSFER' ? '↔' : '-'}₪{t.amount.toLocaleString('he-IL')}
              </span>
              <button
                onClick={() => onDelete(t.id)}
                className="text-text-muted hover:text-accent-red opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
