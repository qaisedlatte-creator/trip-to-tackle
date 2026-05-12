import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    destination: { type: String, required: true, trim: true },
    packageId: { type: String, default: '' },
    packageName: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    travelDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
