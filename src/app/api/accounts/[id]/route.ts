import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const account = await db.account.update({
    where: { id },
    data: body,
  })
  return NextResponse.json(account)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await db.account.update({
    where: { id },
    data: { isActive: false },
  })
  return NextResponse.json({ success: true })
}
