'use client'
import { useEffect, useState, useCallback } from 'react'
import { CategoryPieChart } from '@/components/analytics/CategoryPieChart'
import { TrendLineChart } from '@/components/analytics/TrendLineChart'

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<any[]>([])

  const load = useCallback(async () => {
    const res = await fetch('/api/transactions?limit=500')
    setTransactions(await res.json())
  }, [])

  useEffect(() => { load() }, [load])

  // Category breakdown (expenses only)
  const categoryMap: Record<string, number> = {}
  for (const t of transactions) {
    if (t.type === 'EXPENSE') {
      categoryMap[t.category] = (categoryMap[t.category] ?? 0) + t.amount
    }
  }
  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)

  // 12-month trend
  const monthMap: Record<string, { income: number; expense: number }> = {}
  for (const t of transactions) {
    const key = new Date(t.date).toLocaleDateString('he-IL', { month: 'short', year: '2-digit' })
    if (!monthMap[key]) monthMap[key] = { income: 0, expense: 0 }
    if (t.type === 'INCOME') monthMap[key].income += t.amount
    if (t.type === 'EXPENSE') monthMap[key].expense += t.amount
  }
  const trendData = Object.entries(monthMap)
    .map(([month, v]) => ({ month, income: Math.round(v.income), expense: Math.round(v.expense) }))
    .slice(-12)

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">ניתוח וגרפים</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4">
            <p className="text-text-muted text-xs mb-1">סה&quot;כ הכנסות</p>
            <p className="text-accent-green font-bold text-xl num">₪{totalIncome.toLocaleString('he-IL')}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-text-muted text-xs mb-1">סה&quot;כ הוצאות</p>
            <p className="text-accent-red font-bold text-xl num">₪{totalExpense.toLocaleString('he-IL')}</p>
          </div>
          <div className="glass-card rounded-xl p-4 col-span-2 md:col-span-1">
            <p className="text-text-muted text-xs mb-1">נטו</p>
            <p className={`font-bold text-xl num ${totalIncome - totalExpense >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
              ₪{(totalIncome - totalExpense).toLocaleString('he-IL')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <CategoryPieChart data={categoryData} />
          <TrendLineChart data={trendData} />
        </div>
      </div>
    </div>
  )
}
