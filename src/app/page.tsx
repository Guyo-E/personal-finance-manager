import { db } from '@/lib/db'
import { BalanceCard } from '@/components/dashboard/BalanceCard'
import { AccountCard } from '@/components/dashboard/AccountCard'
import { MonthlyChart } from '@/components/dashboard/MonthlyChart'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const [accounts, recentTransactions, monthlyTransactions] = await Promise.all([
    db.account.findMany({ where: { isActive: true }, orderBy: { createdAt: 'asc' } }),
    db.transaction.findMany({
      take: 5,
      orderBy: { date: 'desc' },
      include: { account: true },
    }),
    db.transaction.findMany({
      where: { date: { gte: monthStart, lte: monthEnd } },
    }),
  ])

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)
  const monthIncome = monthlyTransactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0)
  const monthExpense = monthlyTransactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0)

  // Build 6-month chart data
  const chartData = await Promise.all(
    Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i)).map(async (month) => {
      const start = startOfMonth(month)
      const end = endOfMonth(month)
      const txs = await db.transaction.findMany({ where: { date: { gte: start, lte: end } } })
      return {
        month: format(month, 'MMM'),
        income: txs.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0),
        expense: txs.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0),
      }
    })
  )

  return (
    <main className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <BalanceCard total={totalBalance} income={monthIncome} expense={monthExpense} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {accounts.map((account, i) => (
            <AccountCard key={account.id} account={account} index={i} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <MonthlyChart data={chartData} />
          <RecentTransactions transactions={recentTransactions} />
        </div>
      </div>
    </main>
  )
}
