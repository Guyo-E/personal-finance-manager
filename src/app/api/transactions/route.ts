import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { detectCategory } from '@/lib/categorize'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const accountId = searchParams.get('accountId')
  const category = searchParams.get('category')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const limit = parseInt(searchParams.get('limit') ?? '50')

  const transactions = await db.transaction.findMany({
    where: {
      ...(accountId ? { accountId } : {}),
      ...(category ? { category } : {}),
      ...(from || to ? {
        date: {
          ...(from ? { gte: new Date(from) } : {}),
          ...(to ? { lte: new Date(to) } : {}),
        }
      } : {}),
    },
    orderBy: { date: 'desc' },
    take: limit,
    include: { account: true },
  })
  return NextResponse.json(transactions)
}

export async function POST(req: Request) {
  const body = await req.json()

  const category = body.category || await detectCategory(body.description ?? '')

  const transaction = await db.transaction.create({
    data: {
      amount: body.amount,
      type: body.type,
      category,
      description: body.description,
      date: new Date(body.date),
      accountId: body.accountId,
      toAccountId: body.toAccountId ?? null,
    },
  })

  // Update account balance
  if (body.type === 'INCOME') {
    await db.account.update({
      where: { id: body.accountId },
      data: { balance: { increment: body.amount } },
    })
  } else if (body.type === 'EXPENSE') {
    await db.account.update({
      where: { id: body.accountId },
      data: { balance: { decrement: body.amount } },
    })
  } else if (body.type === 'TRANSFER' && body.toAccountId) {
    await db.account.update({
      where: { id: body.accountId },
      data: { balance: { decrement: body.amount } },
    })
    await db.account.update({
      where: { id: body.toAccountId },
      data: { balance: { increment: body.amount } },
    })
  }

  return NextResponse.json(transaction, { status: 201 })
}
