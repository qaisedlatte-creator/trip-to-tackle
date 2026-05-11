"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Users, Baby, Calendar, CheckCircle, Send } from "lucide-react";

type Room = {
  adults: number;
  children: number;
};

type OccupancyType = "Single" | "Double" | "Triple";

interface BookingFormProps {
  tourName: string;
  price?: string;
  onClose?: () => void;
  className?: string;
  initialDate?: string;
}

export default function BookingForm({ tourName, price, onClose, className = "", initialDate = "" }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState(initialDate);
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);
  const [occupancy, setOccupancy] = useState<OccupancyType>("Double");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalAdults = rooms.reduce((s, r) => s + r.adults, 0);
  const totalChildren = rooms.reduce((s, r) => s + r.children, 0);
  const totalTravellers = totalAdults + totalChildren;

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
        const next = { ...r, [field]: Math.max(0, r[field] + delta) };
        if (field === "adults") next.adults = Math.max(1, Math.min(3, r.adults + delta));
        if (field === "children") next.children = Math.max(0, Math.min(4, r.children + delta));
        return next;
      })
    );
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center py-10 text-center ${className}`}>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle size={30} className="text-green-500" />
        </div>
        <h3 className="font-playfair text-xl font-bold text-[#0A1F44]">Enquiry Sent!</h3>
        <p className="mt-2 font-dm text-sm text-[#0A1F44]/60 leading-6">
          We&apos;ve received your booking request for <strong>{tourName}</strong>.
          <br />Our team will contact you at <strong>{email}</strong> within 24 hours.
        </p>
        <div className="mt-5 rounded-xl bg-[#F7F7F7] px-5 py-4 text-left w-full max-w-xs">
          <p className="font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45 mb-2">Summary</p>
          <div className="space-y-1 font-dm text-sm text-[#0A1F44]">
            <p>📅 Travel Date: <strong>{travelDate}</strong></p>
            <p>🏨 Rooms: <strong>{rooms.length}</strong></p>
            <p>👥 Travellers: <strong>{totalAdults} adults{totalChildren > 0 ? ` · ${totalChildren} children` : ""}</strong></p>
            <p>🛏️ Occupancy: <strong>{occupancy}</strong></p>
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setName(""); setEmail(""); setPhone(""); setTravelDate(""); setRooms([{ adults: 2, children: 0 }]); }}
          className="mt-5 rounded-lg bg-[#0A1F44] px-5 py-2.5 font-dm text-sm font-bold text-white hover:bg-[#FF6A00] transition-colors"
        >
          New Enquiry
        </button>
        {onClose && (
          <button onClick={onClose} className="mt-2 font-dm text-sm text-[#0A1F44]/45 hover:text-[#0A1F44]">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      {/* Traveller details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
            Your Name *
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
          />
        </div>
        <div>
          <label className="mb-1 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
            Email *
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
            Phone *
          </label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
          />
        </div>

        {initialDate ? (
          /* Group departure — date is fixed, not editable */
          <div>
            <label className="mb-1 flex items-center gap-1.5 font-dm text-xs font-semibold uppercase tracking-wider text-[#16a34a]/70">
              <Calendar size={12} /> Group Departure
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-[#22c55e]/30 bg-[#f0fdf4] px-4 py-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white text-[9px] font-bold">✓</span>
              <span className="font-dm text-sm font-semibold text-[#0A1F44]">
                {new Date(initialDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
          </div>
        ) : (
          /* Custom booking — user selects date */
          <div>
            <label className="mb-1 flex items-center gap-1.5 font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">
              <Calendar size={12} /> Travel Date *
            </label>
            <input
              required
              type="date"
              min={today}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
            />
          </div>
        )}
      </div>

      {/* Occupancy type */}
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

      {/* Rooms */}
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
                  {/* Adults */}
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
                  {/* Children */}
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

      {/* Summary + Price */}
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
          {price && (
            <div className="text-right">
              <p className="font-dm text-xs text-[#0A1F44]/45">Est. from</p>
              <p className="font-space text-lg font-bold text-[#0A1F44]">{price}</p>
              <p className="font-dm text-xs text-[#0A1F44]/40">per person</p>
            </div>
          )}
        </div>
        <p className="mt-2 font-dm text-xs text-[#0A1F44]/45">
          Total travellers: <strong className="text-[#0A1F44]">{totalTravellers}</strong>
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-4 font-dm text-base font-bold text-white transition-colors hover:bg-[#e55f00] disabled:opacity-60"
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending Enquiry…
          </>
        ) : (
          <>
            <Send size={17} /> Enquire Now
          </>
        )}
      </button>
    </form>
  );
}
