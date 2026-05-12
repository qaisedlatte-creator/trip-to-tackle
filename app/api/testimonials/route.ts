import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Testimonial from '@/lib/models/Testimonial'

export const dynamic = 'force-dynamic'

const STATIC_TESTIMONIALS = [
  { text: "Trip 2 Tackle made our Kashmir trip absolutely magical. The houseboat on Dal Lake was unforgettable.", name: "Rahul Menon", location: "Dubai, UAE", package: "Kashmir Snow Escape", rating: 5 },
  { text: "Best Wayanad weekend package. The jungle resort was stunning and price was unbeatable from Kochi.", name: "Priya Krishnan", location: "Bangalore", package: "Wayanad Weekend", rating: 5 },
  { text: "Bali was a dream. Every detail handled perfectly — from Seminyak villa to Mt. Batur sunrise trek.", name: "Arjun Suresh", location: "Kochi, Kerala", package: "Bali Soul Journey", rating: 5 },
  { text: "Thailand trip was flawless. Trip 2 Tackle handled everything — flights, hotels, and transfers.", name: "Fathima Nair", location: "Kozhikode", package: "Thailand Adventure", rating: 5 },
  { text: "Sar Pass trek was the experience of a lifetime. The team was responsive via WhatsApp throughout.", name: "Vishnu Raj", location: "Thrissur", package: "Sar Pass Trek", rating: 5 },
  { text: "Maldives for our honeymoon — water villa, snorkeling, sunset dinner. Pure perfection.", name: "Anjali & Deepak", location: "Kochi", package: "Maldives Luxury Retreat", rating: 5 },
  { text: "Vietnam in 8 days — Ha Long Bay, Hoi An, Ho Chi Minh. Trip 2 Tackle nailed every single detail.", name: "Mohammed Shafeeq", location: "Calicut", package: "Vietnam Explorer", rating: 5 },
  { text: "Alappuzha houseboat overnight was the most peaceful experience I've ever had. Highly recommend.", name: "Sreelakshmi T.", location: "Bangalore", package: "Alappuzha Backwaters", rating: 5 },
  { text: "Singapore with family — Universal Studios, Gardens by the Bay, everything sorted perfectly.", name: "Rajan Pillai", location: "Abu Dhabi", package: "Singapore Family Tour", rating: 5 },
  { text: "The Spiti Valley group trip was unlike anything I've done. New friends, incredible landscapes.", name: "Divya Nambiar", location: "Chennai", package: "Spiti Valley Expedition", rating: 5 },
  { text: "Booked Bali two weeks before departure and they handled everything seamlessly. Truly impressive.", name: "Arun Kumar", location: "Hyderabad", package: "Bali Soul Journey", rating: 5 },
  { text: "Kerala backwaters houseboat was a surreal experience. Perfectly curated, zero stress.", name: "Neha Iyer", location: "Mumbai", package: "Alappuzha Backwaters", rating: 5 },
]

export async function GET() {
  try {
    await dbConnect()
    const items = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean()
    if (items.length === 0) return NextResponse.json(STATIC_TESTIMONIALS)
    return NextResponse.json(items)
  } catch {
    return NextResponse.json(STATIC_TESTIMONIALS)
  }
}
