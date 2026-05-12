import mongoose, { Schema } from 'mongoose'

const PackageSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    priceLabel: { type: String, default: '' },
    duration: { type: String, default: '' },
    nights: { type: Number, default: 0 },
    days: { type: Number, default: 0 },
    description: { type: String, default: '' },
    includes: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    images: { type: [String], default: [] },
    badge: { type: String, default: '' },
    itinerary: {
      type: [
        {
          day: Number,
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Itinerary || mongoose.model('Itinerary', PackageSchema)
