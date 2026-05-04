"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, IndianRupee, ChevronRight } from "lucide-react";

export interface DepartureDate {
  date: string;
  slotsTotal: number;
  slotsLeft: number;
  price: number;
  label?: string;
}

interface DepartureDatesProps {
  departures: DepartureDate[];
  onSelect?: (d: DepartureDate) => void;
  priceLabel?: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function getSlotColor(left: number, total: number) {
  const pct = left / total;
  if (left === 0) return { bg: "#fee2e2", text: "#ef4444", label: "Sold Out" };
  if (pct <= 0.25) return { bg: "#fff7ed", text: "#f97316", label: `${left} slots left` };
  if (pct <= 0.5) return { bg: "#fefce8", text: "#ca8a04", label: `${left} slots left` };
  return { bg: "#f0fdf4", text: "#16a34a", label: `${left} slots left` };
}

export default function DepartureDates({ departures, onSelect, priceLabel }: DepartureDatesProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (d: DepartureDate) => {
    if (d.slotsLeft === 0) return;
    setSelected(d.date);
    onSelect?.(d);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6A00]/12">
          <CalendarDays size={18} color="#FF6A00" />
        </div>
        <div>
          <p className="section-label text-[11px]">Group Departures</p>
          <h3 className="font-playfair text-xl font-bold text-[#0A1F44]">Upcoming Dates</h3>
        </div>
      </div>

      {departures.length === 0 ? (
        <p className="font-dm text-sm text-[#0A1F44]/55 italic">
          No upcoming departures scheduled. Contact us to plan a custom date.
        </p>
      ) : (
        <div className="space-y-3">
          {departures.map((d, i) => {
            const slot = getSlotColor(d.slotsLeft, d.slotsTotal);
            const isSelected = selected === d.date;
            const isSoldOut = d.slotsLeft === 0;

            return (
              <motion.button
                key={d.date}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                onClick={() => handleSelect(d)}
                disabled={isSoldOut}
                className="w-full rounded-xl border text-left transition-all"
                style={{
                  background: isSelected ? "#0A1F44" : "#fff",
                  borderColor: isSelected ? "#0A1F44" : "rgba(10,31,68,0.1)",
                  opacity: isSoldOut ? 0.55 : 1,
                  cursor: isSoldOut ? "not-allowed" : "pointer",
                  boxShadow: isSelected ? "0 8px 24px rgba(10,31,68,0.18)" : "0 2px 8px rgba(10,31,68,0.05)",
                }}
              >
                <div className="flex items-center justify-between px-4 py-3.5 gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg text-center"
                      style={{ background: isSelected ? "rgba(255,255,255,0.12)" : "rgba(10,31,68,0.06)" }}
                    >
                      <span
                        className="font-space text-base font-bold leading-none"
                        style={{ color: isSelected ? "#fff" : "#0A1F44" }}
                      >
                        {new Date(d.date).getDate()}
                      </span>
                      <span
                        className="font-dm text-[9px] uppercase font-semibold"
                        style={{ color: isSelected ? "rgba(255,255,255,0.65)" : "rgba(10,31,68,0.45)" }}
                      >
                        {new Date(d.date).toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                    </div>
                    <div>
                      <p
                        className="font-dm text-sm font-semibold"
                        style={{ color: isSelected ? "#fff" : "#0A1F44" }}
                      >
                        {formatDate(d.date)}
                        {d.label && (
                          <span
                            className="ml-2 rounded-full px-2 py-0.5 font-dm text-[10px] font-bold"
                            style={{
                              background: isSelected ? "rgba(255,106,0,0.8)" : "#FF6A00",
                              color: "#fff",
                            }}
                          >
                            {d.label}
                          </span>
                        )}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3">
                        <span className="flex items-center gap-1 font-dm text-xs" style={{ color: isSelected ? "rgba(255,255,255,0.55)" : "rgba(10,31,68,0.45)" }}>
                          <Users size={10} />
                          {d.slotsTotal} total seats
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 font-dm text-[10px] font-bold"
                          style={{ background: slot.bg, color: slot.text }}
                        >
                          {slot.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <p className="font-dm text-[10px]" style={{ color: isSelected ? "rgba(255,255,255,0.45)" : "rgba(10,31,68,0.4)" }}>
                        from
                      </p>
                      <p
                        className="font-space text-sm font-bold"
                        style={{ color: isSelected ? "#fff" : "#0A1F44" }}
                      >
                        ₹{d.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      style={{ color: isSelected ? "#FF6A00" : "rgba(10,31,68,0.3)" }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {selected && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-1.5 font-dm text-xs text-[#16a34a]"
        >
          <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
          Date selected: <strong>{formatDate(selected)}</strong>
        </motion.p>
      )}

      {priceLabel && (
        <p className="mt-3 flex items-center gap-1 font-dm text-xs text-[#0A1F44]/40">
          <IndianRupee size={11} /> Prices shown are per person. Final cost varies by group size.
        </p>
      )}
    </div>
  );
}
