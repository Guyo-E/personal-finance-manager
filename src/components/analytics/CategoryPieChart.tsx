'use client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#22C55E', '#EF4444', '#6366F1', '#F97316', '#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B', '#0EA5E9', '#64748B']

export function CategoryPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-4 text-text-muted">הוצאות לפי קטגוריה</h3>
      {data.length === 0 ? (
        <p className="text-text-muted text-sm text-center py-8">אין נתונים</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
              formatter={(val) => [`₪${Number(val).toLocaleString('he-IL')}`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
