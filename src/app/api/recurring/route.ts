import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await db.recurringItem.findMany({
    include: { account: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await db.recurringItem.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
