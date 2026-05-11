"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Minus, Plus, CheckCircle, X, Lock, Users, Baby, Calendar,
} from "lucide-react";
import { loadRazorpay, formatINR, generateBookingRef } from "@/lib/razorpay";
import { toast } from "sonner";
import type { Package } from "@/lib/packages";
import { useAuth } from "@/context/auth-context";

type Room = { adults: number; children: number };
type OccupancyType = "Single" | "Double" | "Triple";

interface Props {
  pkg: Package | null;
  open: boolean;
  onClose: () => void;
  initialDate?: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function PaymentModal({ pkg, open, onClose, initialDate = "" }: Props) {
  const { user, openAuth, addBooking } = useAuth();

  /* contact */
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* rooms */
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);
  const [occupancy, setOccupancy] = useState<OccupancyType>("Double");

  /* payment */
  const [loading, setLoading]     = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const totalAdults   = rooms.reduce((s, r) => s + r.adults, 0);
  const totalChildren = rooms.reduce((s, r) => s + r.children, 0);
  const total         = pkg ? pkg.price * totalAdults : 0;

  /* pre-fill from logged-in user */
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user, open]);

  /* ── room helpers ── */
  const addRoom = () => {
    if (rooms.length < 3) setRooms([...rooms, { adults: 2, children: 0 }]);
  };

  const removeRoom = (i: number) => {
    if (rooms.length > 1) setRooms(rooms.filter((_, idx) => idx !== i));
  };

  const updateRoom = (i: number, field: keyof Room, delta: number) => {
    setRooms(
      rooms.map((r, idx) => {
        if (idx !== i) return r;
        const next = { ...r, [field]: r[field] + delta };
        if (field === "adults")   next.adults   = Math.max(1, Math.min(3, next.adults));
        if (field === "children") next.children = Math.max(0, Math.min(4, next.children));
        return next;
      })
    );
  };

  if (!pkg) return null;

  /* ── booking ── */
  const confirmBooking = (ref: string) => {
    setBookingRef(ref);
    setConfirmed(true);
    setLoading(false);
    if (user) {
      addBooking({
        bookingRef: ref,
        packageId:   pkg.id,
        packageName: pkg.name,
        destination: pkg.destination,
        travelers:   totalAdults + totalChildren,
        travelDate:  initialDate,
        totalPaid:   total,
        bookedAt:    new Date().toISOString(),
      });
    }
  };

  const handleBook = async () => {
    if (!name || !email || !phone) {
      toast.error("Please fill in all contact fields");
      return;
    }
    if (!initialDate) {
      toast.error("No departure date selected");
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
      const res  = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, packageName: pkg.name }),
      });
      const data = await res.json();
      const rzpKey      = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
      const isMockOrder = data._mock || !rzpKey || rzpKey.includes("YOUR_KEY");

      if (isMockOrder) {
        await new Promise(r => setTimeout(r, 900));
        confirmBooking(generateBookingRef());
        return;
      }

      const options = {
        key: rzpKey,
        amount: total * 100,
        currency: "INR",
        name: "Trip 2 Tackle",
        description: `${pkg.name} — ${totalAdults} Adult${totalAdults > 1 ? "s" : ""}`,
        order_id: data.id,
        handler: () => confirmBooking(generateBookingRef()),
        prefill: { name, email, contact: phone },
        theme: { color: "#0A1F44" },
        modal: { ondismiss: () => setLoading(false) },
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
    setRooms([{ adults: 2, children: 0 }]);
    setOccupancy("Double");
    if (!user) { setName(""); setEmail(""); setPhone(""); }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-xl sm:max-w-xl bg-white rounded-2xl p-0 overflow-hidden border-0 shadow-2xl"
        showCloseButton={false}
      >

        {/* ── CONFIRMED ── */}
        {confirmed ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold text-[#0A1F44] mb-2">Booking Confirmed!</h3>
              <p className="font-dm text-gray-500 text-sm">Your adventure awaits. View details in your account.</p>
            </div>
            <div className="bg-[#0A1F44]/5 rounded-xl p-4 space-y-1">
              <p className="font-dm text-sm text-gray-500">Booking Reference</p>
              <p className="font-space text-2xl font-bold text-[#0A1F44] tracking-widest">{bookingRef}</p>
            </div>
            <div className="text-sm font-dm text-gray-400 space-y-0.5">
              <p><strong className="text-gray-600">{pkg.name}</strong></p>
              <p>
                {totalAdults} adult{totalAdults > 1 ? "s" : ""}
                {totalChildren > 0 ? ` · ${totalChildren} child${totalChildren > 1 ? "ren" : ""}` : ""}
                {" · "}{formatDate(initialDate)}
              </p>
              <p>
                {rooms.length} room{rooms.length > 1 ? "s" : ""} · {occupancy}
              </p>
              <p className="font-space font-bold text-[#0A1F44]">{formatINR(total)} paid</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => { handleClose(); window.location.href = "/account"; }}
                className="flex-1 bg-[#0A1F44] hover:bg-[#002050] text-white text-sm"
              >
                View Bookings
              </Button>
              <Button onClick={handleClose} variant="outline" className="flex-1 text-sm">Done</Button>
            </div>
          </div>

        ) : !user ? (
          /* ── AUTH GATE ── */
          <>
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
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 bg-[#0A1F44]/10 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-[#0A1F44]" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-[#0A1F44] mb-2">Login Required</h3>
                <p className="font-dm text-sm text-gray-500 max-w-xs mx-auto">
                  Please log in or create an account to book this package.
                  Your bookings are saved to your account.
                </p>
              </div>
              <div className="pt-1 space-y-3">
                <Button
                  onClick={() => { handleClose(); openAuth(); }}
                  className="w-full bg-[#FF6A00] hover:bg-[#d95f00] text-white font-bold h-12"
                >
                  Log In / Register
                </Button>
                <p className="font-dm text-xs text-gray-400">
                  Free account · Takes 30 seconds · No spam
                </p>
              </div>
            </div>
          </>

        ) : (
          /* ── FULL BOOKING FORM ── */
          <>
            {/* sticky header */}
            <div className="bg-[#0A1F44] px-6 py-5 flex items-start justify-between shrink-0">
              <div>
                <p className="font-dm text-xs text-white/60 uppercase tracking-wider mb-1">Direct Booking</p>
                <h3 className="font-playfair text-xl font-bold text-white">{pkg.name}</h3>
                <p className="font-dm text-sm text-[#BECAE6] mt-0.5">{pkg.duration}</p>
              </div>
              <button onClick={handleClose} className="text-white/60 hover:text-white mt-0.5">
                <X size={20} />
              </button>
            </div>

            {/* scrollable body */}
            <div className="overflow-y-auto" style={{ maxHeight: "76vh" }}>
              <div className="p-6 space-y-5">

                {/* fixed departure date */}
                {initialDate && (
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 font-dm text-xs font-semibold uppercase tracking-wider text-[#16a34a]/75">
                      <Calendar size={12} /> Group Departure
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-[#22c55e]/30 bg-[#f0fdf4] px-4 py-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white text-[9px] font-bold">✓</span>
                      <span className="font-dm text-sm font-semibold text-[#0A1F44]">{formatDate(initialDate)}</span>
                    </div>
                  </div>
                )}

                {/* contact fields */}
                <div>
                  <label className="mb-1 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
                      Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
                    />
                  </div>
                </div>

                {/* occupancy type */}
                <div>
                  <label className="mb-2 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
                    Occupancy Type
                  </label>
                  <div className="flex gap-2">
                    {(["Single", "Double", "Triple"] as OccupancyType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOccupancy(type)}
                        className="flex-1 rounded-xl border py-2.5 font-dm text-sm font-semibold transition-all"
                        style={{
                          background: occupancy === type ? "#0A1F44" : "#F7F7F7",
                          color: occupancy === type ? "#fff" : "#0A1F44",
                          borderColor: occupancy === type ? "#0A1F44" : "rgba(10,31,68,0.12)",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* rooms */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
                      Rooms ({rooms.length}/3)
                    </label>
                    {rooms.length < 3 && (
                      <button
                        type="button"
                        onClick={addRoom}
                        className="flex items-center gap-1.5 rounded-lg bg-[#0A1F44]/08 px-3 py-1.5 font-dm text-xs font-bold text-[#0A1F44] hover:bg-[#0A1F44]/15 transition"
                      >
                        <Plus size={12} /> Add Room
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {rooms.map((room, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-[#0A1F44]/10 bg-[#F7F7F7] p-4"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <span className="font-dm text-xs font-bold uppercase tracking-wider text-[#0A1F44]/60">
                              Room {i + 1}
                            </span>
                            {rooms.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRoom(i)}
                                className="font-dm text-xs text-red-400 hover:text-red-600 transition"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-5">
                            {/* adults */}
                            <div className="flex items-center gap-3">
                              <Users size={14} className="text-[#0A1F44]/50" />
                              <span className="font-dm text-xs text-[#0A1F44]/60">Adults</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateRoom(i, "adults", -1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#0A1F44]/15 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-dm w-5 text-center text-sm font-bold text-[#0A1F44]">
                                  {room.adults}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateRoom(i, "adults", 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#0A1F44]/15 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                            {/* children */}
                            <div className="flex items-center gap-3">
                              <Baby size={14} className="text-[#0A1F44]/50" />
                              <span className="font-dm text-xs text-[#0A1F44]/60">Children</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateRoom(i, "children", -1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#0A1F44]/15 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-dm w-5 text-center text-sm font-bold text-[#0A1F44]">
                                  {room.children}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateRoom(i, "children", 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#0A1F44]/15 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* traveller summary + pricing */}
                <div className="rounded-xl border border-[#0A1F44]/10 bg-[#0A1F44]/04 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-4 font-dm text-sm text-[#0A1F44]">
                      <span>
                        👥 <strong>{totalAdults}</strong> {totalAdults === 1 ? "Adult" : "Adults"}
                      </span>
                      {totalChildren > 0 && (
                        <span>
                          👶 <strong>{totalChildren}</strong> {totalChildren === 1 ? "Child" : "Children"}
                        </span>
                      )}
                      <span>
                        🏨 <strong>{rooms.length}</strong> {rooms.length === 1 ? "Room" : "Rooms"} · {occupancy}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-dm text-xs text-[#0A1F44]/45">
                        {pkg.priceLabel} × {totalAdults} adult{totalAdults > 1 ? "s" : ""}
                      </p>
                      <p className="font-space text-xl font-bold text-[#0A1F44]">{formatINR(total)}</p>
                      <p className="font-dm text-xs text-[#0A1F44]/40">total</p>
                    </div>
                  </div>
                  <p className="mt-2 font-dm text-xs text-[#0A1F44]/45">
                    Children pricing handled at check-in · Prices are per adult
                  </p>
                </div>

                {/* pay button */}
                <button
                  onClick={handleBook}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-4 font-dm text-base font-bold text-white transition-colors hover:bg-[#e55f00] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing…
                    </>
                  ) : (
                    `Pay ${formatINR(total)} →`
                  )}
                </button>
                <p className="font-dm text-xs text-center text-[#0A1F44]/40 pb-2">
                  Secured by Razorpay ·{" "}
                  {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.includes("YOUR_KEY")
                    ? "Demo Mode"
                    : "Test Mode"}
                </p>

              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
