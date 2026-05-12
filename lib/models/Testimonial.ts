import mongoose, { Schema, Document } from 'mongoose'

export interface ITestimonial extends Document {
  text: string
  name: string
  location: string
  package: string
  rating: number
  isActive: boolean
  order: number
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    text: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, default: '' },
    package: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

TestimonialSchema.index({ isActive: 1, order: 1 })

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
