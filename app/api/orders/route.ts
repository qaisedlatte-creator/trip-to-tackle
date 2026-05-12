import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Order from '@/lib/models/Order'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.name?.trim() || !data.phone?.trim()) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    await dbConnect()

    const order = await Order.create({
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() ?? '',
      destination: data.destination?.trim() ?? 'General Inquiry',
      packageId: data.packageId ?? '',
      packageName: data.packageName ?? '',
      amount: data.amount ?? 0,
      notes: data.message?.trim() ?? '',
      status: 'Pending',
    })

    return NextResponse.json({ success: true, id: order._id.toString() }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/orders]', err)
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
  }
}
