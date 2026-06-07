import type { Metadata } from 'next'
import { heebo, inter } from '@/lib/fonts'
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
        {children}
      </body>
    </html>
  )
}
