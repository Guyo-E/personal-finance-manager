import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const item = await db.recurringItem.update({ where: { id: params.id }, data: body })
  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.recurringItem.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
