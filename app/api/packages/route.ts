import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Package from '@/lib/models/Package'
import { packages as staticPackages } from '@/lib/packages'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()
    const dbPackages = await Package.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean()

    if (dbPackages.length === 0) {
      return NextResponse.json(staticPackages)
    }

    const mapped = dbPackages.map((p: any) => ({
      id: p.slug || p._id.toString(),
      name: p.title,
      slug: p.slug,
      destination: p.destination,
      destinationSlug: (p.destination ?? '').toLowerCase().replace(/\s+/g, '-'),
      duration: p.duration,
      nights: p.nights,
      days: p.days,
      price: p.price,
      priceLabel: p.priceLabel || `₹${p.price?.toLocaleString('en-IN')}`,
      image: p.images?.[0] ?? '',
      includes: p.includes ?? [],
      highlights: p.highlights ?? [],
      description: p.description ?? '',
      badge: p.badge || undefined,
      itinerary: p.itinerary ?? [],
      isGroupDeparture: true,
    }))

    return NextResponse.json(mapped)
  } catch (err) {
    console.error('[GET /api/packages]', err)
    return NextResponse.json(staticPackages)
  }
}
