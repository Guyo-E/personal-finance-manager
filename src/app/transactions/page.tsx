'use client'
import { useEffect, useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { AddTransactionSheet } from '@/components/transactions/AddTransactionSheet'
import { TransactionList } from '@/components/transactions/TransactionList'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [accounts, setAccounts] = useState<any[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  const loadData = useCallback(async () => {
    const [txRes, accRes] = await Promise.all([
      fetch('/api/transactions?limit=100'),
      fetch('/api/accounts'),
    ])
    setTransactions(await txRes.json())
    setAccounts(await accRes.json())
  }, [])

  useEffect(() => { loadData() }, [loadData])

  async function handleDelete(id: string) {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">עסקאות</h1>
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 bg-aurora-1 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-aurora-1/90 transition-colors"
          >
            <Plus size={16} />
            עסקה חדשה
          </button>
        </div>

        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>

      <AddTransactionSheet
        accounts={accounts}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSuccess={loadData}
      />
    </div>
  )
}
