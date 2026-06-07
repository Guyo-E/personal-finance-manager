import type { Metadata } from 'next'
import { heebo, inter } from '@/lib/fonts'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'ניהול כלכלי אישי',
  description: 'מעקב הוצאות, הכנסות ומאזן כלכלי',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <body className={`${heebo.variable} ${inter.variable} font-heebo bg-[#020617] text-[#F8FAFC] antialiased`}>
        <div className="flex min-h-screen">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-auto pb-16 md:pb-0">
            {children}
          </main>
        </div>
        <BottomNav />
      </body>
    </html>
  )
}
