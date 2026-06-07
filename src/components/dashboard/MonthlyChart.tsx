'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function MonthlyChart({ data }: { data: { month: string; income: number; expense: number }[] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-4 text-text-muted">הכנסות vs. הוצאות</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
            labelStyle={{ color: '#F8FAFC' }}
          />
          <Legend wrapperStyle={{ color: '#94A3B8', fontSize: 12 }} />
          <Bar dataKey="income" name="הכנסות" fill="#22C55E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="הוצאות" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
