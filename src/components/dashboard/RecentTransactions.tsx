'use client'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

export function RecentTransactions({ transactions }: { transactions: any[] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-4 text-text-muted">עסקאות אחרונות</h3>
      <div className="space-y-3">
        {transactions.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
          >
            <div>
              <p className="text-sm font-medium">{t.description || t.category}</p>
              <p className="text-text-muted text-xs">{format(new Date(t.date), 'dd/MM/yyyy')} • {t.account?.name}</p>
            </div>
            <span className={`num font-semibold text-sm ${t.type === 'INCOME' ? 'text-accent-green' : 'text-accent-red'}`}>
              {t.type === 'INCOME' ? '+' : '-'}₪{t.amount.toLocaleString('he-IL')}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
