import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const account = await db.account.update({
    where: { id: params.id },
    data: body,
  })
  return NextResponse.json(account)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.account.update({
    where: { id: params.id },
    data: { isActive: false },
  })
  return NextResponse.json({ success: true })
}
