import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Pilgrimage from '@/lib/models/Pilgrimage'
import { pilgrimages as staticPilgrimages } from '@/lib/pilgrimages'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()
    const items = await Pilgrimage.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean()
    if (items.length === 0) {
      // Map static pilgrimages to expected shape
      return NextResponse.json(
        staticPilgrimages.map((p) => ({
          id: p.id,
          title: p.name,
          slug: p.slug,
          destination: p.destination,
          price: p.price,
          priceLabel: p.priceLabel,
          duration: p.duration,
          nights: p.nights,
          days: p.days,
          description: p.description,
          includes: p.includes,
          highlights: p.highlights,
          images: [p.image],
          badge: p.badge ?? '',
          itinerary: p.itinerary ?? [],
        }))
      )
    }
    return NextResponse.json(items)
  } catch {
    return NextResponse.json(staticPilgrimages)
  }
}
