import { NextRequest, NextResponse } from "next/server";

/* ── Razorpay order creation ───────────────────────────────────────────
   Replace RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local
   with your live / test keys from https://dashboard.razorpay.com/
   ─────────────────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  const { amount, packageName } = await req.json();

  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  /* If keys aren't configured yet, return a mock order for demo mode */
  if (!keyId || !keySecret || keyId.includes("YOUR_KEY")) {
    return NextResponse.json({
      id: `mock_order_${Date.now()}`,
      amount: amount * 100,
      currency: "INR",
      status: "created",
      _mock: true,
    });
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res  = await fetch("https://api.razorpay.com/v1/orders", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount:   amount * 100,   // paise
        currency: "INR",
        receipt:  `t2t_${Date.now()}`,
        notes:    { package: packageName },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Razorpay error:", err);
      return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }

    const order = await res.json();
    return NextResponse.json(order);
  } catch (err) {
    console.error("Razorpay API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
