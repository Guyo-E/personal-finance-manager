'use client'
import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', targetAmount: '', currentAmount: '0', deadline: '' })
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch('/api/goals')
    setGoals(await res.json())
  }, [])

  useEffect(() => { load() }, [load])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          targetAmount: parseFloat(form.targetAmount),
          currentAmount: parseFloat(form.currentAmount),
          deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        }),
      })
      load()
      setShowForm(false)
      setForm({ name: '', targetAmount: '', currentAmount: '0', deadline: '' })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/goals/${id}`, { method: 'DELETE' })
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  return (
    <div className="aurora-bg min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">יעדים</h1>
          <button
            onClick={() => setShowForm(f => !f)}
            className="flex items-center gap-2 bg-aurora-1 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-aurora-1/90 transition-colors"
          >
            <Plus size={16} />
            יעד חדש
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-5"
          >
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-text-muted block mb-1">שם היעד</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                    placeholder="דירה, חופשה, ..."
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted block mb-1">יעד (₪)</label>
                  <input required type="number" step="0.01" value={form.targetAmount}
                    onChange={e => setForm(f => ({ ...f, targetAmount: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted block mb-1">נוכחי (₪)</label>
                  <input type="number" step="0.01" value={form.currentAmount}
                    onChange={e => setForm(f => ({ ...f, currentAmount: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted block mb-1">תאריך יעד</label>
                  <input type="date" value={form.deadline}
                    onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-aurora-1"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="bg-aurora-1 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-aurora-1/90 disabled:opacity-50"
              >
                {loading ? 'שומר...' : 'הוסף יעד'}
              </button>
            </form>
          </motion.div>
        )}

        <div className="space-y-4">
          {goals.length === 0 && <p className="text-text-muted text-sm text-center py-12">אין יעדים. הוסף את הראשון!</p>}
          {goals.map((goal, i) => {
            const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
            const remaining = goal.targetAmount - goal.currentAmount
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">{goal.name}</p>
                    {goal.deadline && (
                      <p className="text-text-muted text-xs">{new Date(goal.deadline).toLocaleDateString('he-IL')}</p>
                    )}
                  </div>
                  <button onClick={() => handleDelete(goal.id)} className="text-text-muted hover:text-accent-red">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="num text-accent-green">₪{goal.currentAmount.toLocaleString('he-IL')}</span>
                  <span className="text-text-muted num">/ ₪{goal.targetAmount.toLocaleString('he-IL')}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-aurora-1 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-text-muted text-xs mt-1">
                  נותר: <span className="num text-text-primary">₪{remaining.toLocaleString('he-IL')}</span> ({pct.toFixed(1)}%)
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
