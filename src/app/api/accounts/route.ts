import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const accounts = await db.account.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(accounts)
}

export async function POST(req: Request) {
  const body = await req.json()
  const account = await db.account.create({
    data: {
      name: body.name,
      type: body.type,
      balance: body.balance ?? 0,
      color: body.color ?? '#6366F1',
      icon: body.icon ?? 'wallet',
      currency: body.currency ?? 'ILS',
    },
  })
  return NextResponse.json(account, { status: 201 })
}
