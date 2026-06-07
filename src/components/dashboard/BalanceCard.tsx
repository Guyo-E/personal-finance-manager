'use client'
import { CountUp } from '@/components/ui/CountUp'
import { motion } from 'framer-motion'

export function BalanceCard({ total, income, expense }: {
  total: number
  income: number
  expense: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-8 text-center"
    >
      <p className="text-text-muted text-sm mb-2">מאזן כולל</p>
      <h1 className={`text-5xl font-bold mb-6 ${total >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
        <CountUp value={total} />
      </h1>
      <div className="flex justify-center gap-12">
        <div>
          <p className="text-text-muted text-xs mb-1">הכנסות החודש</p>
          <p className="text-accent-green font-semibold num">
            +₪{income.toLocaleString('he-IL')}
          </p>
        </div>
        <div>
          <p className="text-text-muted text-xs mb-1">הוצאות החודש</p>
          <p className="text-accent-red font-semibold num">
            -₪{expense.toLocaleString('he-IL')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
