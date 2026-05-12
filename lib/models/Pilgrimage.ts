import mongoose, { Schema, Document } from 'mongoose'

export interface IPilgrimage extends Document {
  title: string
  slug: string
  destination: string
  price: number
  priceLabel: string
  duration: string
  nights: number
  days: number
  description: string
  includes: string[]
  highlights: string[]
  images: string[]
  badge: string
  itinerary: { day: number; title: string; description: string }[]
  isActive: boolean
}

const PilgrimageSchema = new Schema<IPilgrimage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    destination: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    priceLabel: { type: String, default: '' },
    duration: { type: String, default: '' },
    nights: { type: Number, default: 0 },
    days: { type: Number, default: 0 },
    description: { type: String, default: '' },
    includes: [String],
    highlights: [String],
    images: [String],
    badge: { type: String, default: '' },
    itinerary: [{ day: Number, title: String, description: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

PilgrimageSchema.index({ slug: 1 }, { unique: true })
PilgrimageSchema.index({ isActive: 1, createdAt: -1 })

export default mongoose.models.Pilgrimage ||
  mongoose.model<IPilgrimage>('Pilgrimage', PilgrimageSchema)
