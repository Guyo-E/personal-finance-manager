import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.goal.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const goal = await db.goal.update({ where: { id: params.id }, data: body })
  return NextResponse.json(goal)
}
