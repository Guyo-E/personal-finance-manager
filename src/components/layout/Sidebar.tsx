'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, CreditCard, Repeat, BarChart2, Target, Settings, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'דשבורד', icon: LayoutDashboard },
  { href: '/transactions', label: 'עסקאות', icon: ArrowLeftRight },
  { href: '/accounts', label: 'חשבונות', icon: CreditCard },
  { href: '/recurring', label: 'חיובים קבועים', icon: Repeat },
  { href: '/analytics', label: 'ניתוח וגרפים', icon: BarChart2 },
  { href: '/goals', label: 'יעדים', icon: Target },
  { href: '/export', label: 'ייצוא', icon: Download },
  { href: '/settings', label: 'הגדרות', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="glass-card w-64 min-h-screen p-4 flex flex-col gap-1 shrink-0">
      <div className="p-4 mb-4">
        <h1 className="text-xl font-bold text-aurora-1">ניהול כלכלי</h1>
      </div>
      {NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200',
            pathname === href
              ? 'bg-aurora-1/20 text-aurora-1 font-semibold'
              : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </aside>
  )
}
