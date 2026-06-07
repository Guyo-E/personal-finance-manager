'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function TrendLineChart({ data }: { data: { month: string; income: number; expense: number }[] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-4 text-text-muted">מגמה שנתית</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
            labelStyle={{ color: '#F8FAFC' }}
          />
          <Legend wrapperStyle={{ color: '#94A3B8', fontSize: 12 }} />
          <Line type="monotone" dataKey="income" name="הכנסות" stroke="#22C55E" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="expense" name="הוצאות" stroke="#EF4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
