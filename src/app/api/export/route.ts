import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { unparse } from 'papaparse'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      },
    },
    include: { account: true },
    orderBy: { date: 'desc' },
  })

  const rows = transactions.map((t) => ({
    תאריך: t.date.toLocaleDateString('he-IL'),
    סוג: t.type === 'INCOME' ? 'הכנסה' : t.type === 'EXPENSE' ? 'הוצאה' : 'העברה',
    קטגוריה: t.category,
    תיאור: t.description ?? '',
    סכום: t.amount,
    חשבון: t.account.name,
  }))

  const csv = unparse(rows)
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="transactions.csv"',
    },
  })
}
