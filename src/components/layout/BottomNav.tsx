'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, CreditCard, BarChart2, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOBILE_NAV = [
  { href: '/', label: 'דשבורד', icon: LayoutDashboard },
  { href: '/transactions', label: 'עסקאות', icon: ArrowLeftRight },
  { href: '/accounts', label: 'חשבונות', icon: CreditCard },
  { href: '/analytics', label: 'ניתוח', icon: BarChart2 },
  { href: '/settings', label: 'הגדרות', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/8 flex md:hidden">
      {MOBILE_NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors',
            pathname === href ? 'text-aurora-1' : 'text-text-muted'
          )}
        >
          <Icon size={20} />
          {label}
        </Link>
      ))}
    </nav>
  )
}
