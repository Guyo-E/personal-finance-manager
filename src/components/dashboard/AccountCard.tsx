'use client'
import { motion } from 'framer-motion'
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

export function AccountCard({ account, index }: { account: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ translateY: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-xl p-5 cursor-pointer hover:border-white/20 transition-all"
      style={{ borderColor: account.color + '40' }}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="text-text-muted text-xs">{ACCOUNT_TYPE_LABELS[account.type]}</p>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: account.color }} />
      </div>
      <p className="font-semibold text-sm mb-2 truncate">{account.name}</p>
      <p className={`text-xl font-bold num ${account.balance >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
        <CountUp value={account.balance} />
      </p>
    </motion.div>
  )
}
