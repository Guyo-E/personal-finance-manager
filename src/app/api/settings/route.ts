import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const settings = await db.settings.findUnique({ where: { id: 'default' } })
  return NextResponse.json(settings)
}

export async function PATCH(req: Request) {
  const body = await req.json()
  const settings = await db.settings.update({ where: { id: 'default' }, data: body })
  return NextResponse.json(settings)
}
