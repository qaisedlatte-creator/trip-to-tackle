import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Destination from '@/lib/models/Destination'
import { destinations as staticDestinations } from '@/lib/destinations'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()
    const items = await Destination.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean()
    if (items.length === 0) return NextResponse.json(staticDestinations)
    return NextResponse.json(items)
  } catch {
    return NextResponse.json(staticDestinations)
  }
}
