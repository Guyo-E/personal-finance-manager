import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.transaction.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const transaction = await db.transaction.update({
    where: { id },
    data: body,
  })
  return NextResponse.json(transaction)
}
