import mongoose, { Schema, Document } from 'mongoose'

export interface IDestination extends Document {
  slug: string
  name: string
  region: string
  type: 'domestic' | 'international'
  country: string
  price: number
  priceLabel: string
  image: string
  heroImage: string
  tagline: string
  description: string
  bestTime: string
  duration: string
  type_label: string
  difficulty?: string
  itinerary: { day: number; title: string; description: string }[]
  includes: string[]
  isActive: boolean
}

const DestinationSchema = new Schema<IDestination>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    region: { type: String, default: '' },
    type: { type: String, enum: ['domestic', 'international'], default: 'domestic' },
    country: { type: String, default: 'India' },
    price: { type: Number, default: 0 },
    priceLabel: { type: String, default: '' },
    image: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    bestTime: { type: String, default: '' },
    duration: { type: String, default: '' },
    type_label: { type: String, default: '' },
    difficulty: { type: String },
    itinerary: [{ day: Number, title: String, description: String }],
    includes: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

DestinationSchema.index({ slug: 1 }, { unique: true })
DestinationSchema.index({ type: 1, isActive: 1 })

export default mongoose.models.Destination ||
  mongoose.model<IDestination>('Destination', DestinationSchema)
