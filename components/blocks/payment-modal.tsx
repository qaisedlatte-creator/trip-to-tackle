"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, CheckCircle, X } from "lucide-react";
import { loadRazorpay, formatINR, generateBookingRef } from "@/lib/razorpay";
import { toast } from "sonner";
import type { Package } from "@/lib/packages";

interface Props {
  pkg: Package | null;
  open: boolean;
  onClose: () => void;
}

export default function PaymentModal({ pkg, open, onClose }: Props) {
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!pkg) return null;

  const total = pkg.price * travelers;

  const handleBook = async () => {
    if (!name || !email || !phone || !travelDate) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Payment gateway failed to load. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, packageName: pkg.name }),
      });
      const data = await res.json();

      const options = {
        key: "rzp_test_XXXX", // REPLACE WITH LIVE KEY
        amount: total * 100,
        currency: "INR",
        name: "Trip 2 Tackle",
        description: `${pkg.name} — ${travelers} Traveler(s)`,
        order_id: data.id,
        handler: () => {
          const ref = generateBookingRef();
          setBookingRef(ref);
          setConfirmed(true);
          setLoading(false);
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#0A1F44" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    setBookingRef("");
    setTravelers(2);
    setTravelDate("");
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        {confirmed ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-[#0A1F44] mb-2">Booking Confirmed!</h3>
              <p className="font-dm text-gray-500 text-sm">Your adventure awaits. Check your email for details.</p>
            </div>
            <div className="bg-[#0A1F44]/5 rounded-xl p-4 space-y-1">
              <p className="font-dm text-sm text-gray-500">Booking Reference</p>
              <p className="font-space text-2xl font-bold text-[#0A1F44] tracking-widest">{bookingRef}</p>
            </div>
            <div className="text-sm font-dm text-gray-400 space-y-0.5">
              <p><strong className="text-gray-600">{pkg.name}</strong></p>
              <p>{travelers} traveler{travelers > 1 ? "s" : ""} · {travelDate}</p>
              <p className="font-space font-bold text-[#0A1F44]">{formatINR(total)} paid</p>
            </div>
            <Button onClick={handleClose} className="w-full bg-[#0A1F44] hover:bg-[#002050] text-white">
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-[#0A1F44] px-6 py-5 flex items-start justify-between">
              <div>
                <p className="font-dm text-xs text-white/60 uppercase tracking-wider mb-1">Book Package</p>
                <h3 className="font-playfair text-xl font-bold text-white">{pkg.name}</h3>
                <p className="font-dm text-sm text-[#BECAE6] mt-0.5">{pkg.duration}</p>
              </div>
              <button onClick={handleClose} className="text-white/60 hover:text-white mt-0.5">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Traveler count */}
              <div>
                <label className="font-dm text-sm font-medium text-gray-700 block mb-2">Number of Travelers</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-space text-xl font-bold text-[#0A1F44] w-8 text-center">{travelers}</span>
                  <button
                    onClick={() => setTravelers(Math.min(20, travelers + 1))}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                  <span className="font-dm text-sm text-gray-400">max 20 people</span>
                </div>
              </div>

              {/* Travel date */}
              <div>
                <label className="font-dm text-sm font-medium text-gray-700 block mb-2">Travel Date</label>
                <Input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="font-dm border-gray-200 focus:ring-[#2571BC] focus:border-[#2571BC]"
                />
              </div>

              {/* Name */}
              <div>
                <label className="font-dm text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-dm border-gray-200"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-dm text-sm font-medium text-gray-700 block mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-dm border-gray-200"
                  />
                </div>
                <div>
                  <label className="font-dm text-sm font-medium text-gray-700 block mb-2">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+91 8592803525"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="font-dm border-gray-200"
                  />
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-[#0A1F44]/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-dm text-xs text-gray-500">
                    {pkg.priceLabel} × {travelers} traveler{travelers > 1 ? "s" : ""}
                  </p>
                  <p className="font-space text-2xl font-bold text-[#0A1F44] mt-0.5">{formatINR(total)}</p>
                </div>
                <div className="text-right">
                  <p className="font-dm text-xs text-gray-400">Total</p>
                  <p className="font-dm text-xs text-gray-400 mt-0.5">*from Kerala</p>
                </div>
              </div>

              <Button
                onClick={handleBook}
                disabled={loading}
                className="w-full bg-[#FF6A00] hover:bg-[#e89c2a] text-[#0A1F44] font-bold text-base h-12 transition-all duration-200"
              >
                {loading ? "Processing..." : `Pay ${formatINR(total)}`}
              </Button>
              <p className="font-dm text-xs text-center text-gray-400">
                Secured by Razorpay · Test Mode
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

