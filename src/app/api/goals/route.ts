import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const goals = await db.goal.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(goals)
}

export async function POST(req: Request) {
  const body = await req.json()
  const goal = await db.goal.create({ data: body })
  return NextResponse.json(goal, { status: 201 })
}
