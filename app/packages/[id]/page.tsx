"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Download,
  Mail,
  MapPin,
  Wallet,
  X,
  Send,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import BookingForm from "@/components/blocks/booking-form";
import DepartureDates, { type DepartureDate } from "@/components/blocks/departure-dates";
import { packages, type Package } from "@/lib/packages";

const fadeInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

function buildDepartures(price: number): DepartureDate[] {
  const base = new Date();
  return [
    { date: new Date(base.getFullYear(), base.getMonth(), base.getDate() + 18).toISOString().split("T")[0], slotsTotal: 30, slotsLeft: 8, price, label: "Filling Fast" },
    { date: new Date(base.getFullYear(), base.getMonth(), base.getDate() + 32).toISOString().split("T")[0], slotsTotal: 30, slotsLeft: 22, price },
    { date: new Date(base.getFullYear(), base.getMonth(), base.getDate() + 46).toISOString().split("T")[0], slotsTotal: 30, slotsLeft: 30, price, label: "New" },
    { date: new Date(base.getFullYear(), base.getMonth(), base.getDate() + 65).toISOString().split("T")[0], slotsTotal: 30, slotsLeft: 30, price, label: "New" },
  ];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function EmailModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md rounded-[24px] bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="section-label mb-1">Itinerary PDF</p>
            <h3 className="font-playfair text-xl font-bold text-[#0A1F44]">Email Your Itinerary</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[#0A1F44]/40 hover:bg-[#0A1F44]/08 transition">
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="py-6 text-center">
            <div className="mb-3 text-4xl">✉️</div>
            <h4 className="font-playfair text-lg font-bold text-[#0A1F44]">Itinerary Sent!</h4>
            <p className="mt-2 font-dm text-sm text-[#0A1F44]/60">
              The {pkg.name} itinerary PDF has been sent to <strong>{email}</strong>.
              <br />Check your inbox (and spam folder) within a few minutes.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-xl bg-[#0A1F44] px-5 py-2.5 font-dm text-sm font-bold text-white hover:bg-[#FF6A00] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="mb-5 font-dm text-sm leading-6 text-[#0A1F44]/60">
              Enter your email address and we&apos;ll send you the complete{" "}
              <strong>{pkg.name}</strong> itinerary PDF — including day-by-day schedule,
              inclusions, and pricing.
            </p>
            <form onSubmit={send} className="space-y-4">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15 transition"
              />
              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A1F44] px-5 py-3.5 font-dm text-sm font-bold text-white transition-colors hover:bg-[#FF6A00] disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Itinerary PDF
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function PackageDetailPage() {
  const params = useParams<{ id: string }>();
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const pkg = packages.find((item) => item.id === id);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedDeparture, setSelectedDeparture] = useState<DepartureDate | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (d: DepartureDate) => {
    setSelectedDeparture(d);
    setShowBookingForm(false); // reset form when date changes
    // Smooth scroll to sidebar on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  const handleProceed = () => {
    if (!selectedDeparture) return;
    setShowBookingForm(true);
    setTimeout(() => {
      sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const downloadItinerary = () => {
    if (!pkg) return;
    const content = `
TRIP 2 TACKLE — ITINERARY

Tour: ${pkg.name}
Destination: ${pkg.destination}
Duration: ${pkg.duration}
Price: ${pkg.priceLabel} per person

DESCRIPTION
${pkg.description}

INCLUSIONS
${pkg.includes.map((i) => `• ${i}`).join("\n")}

HIGHLIGHTS
${pkg.highlights.map((h) => `• ${h}`).join("\n")}

DAY-BY-DAY ITINERARY
${pkg.itinerary?.map((d) => `Day ${d.day}: ${d.title}\n${d.description}`).join("\n\n") ?? "Itinerary available on request."}

---
TERMS & CONDITIONS
• Prices are per person on twin/triple sharing basis.
• Booking confirmation requires 30% advance payment.
• Balance payment due 15 days before departure.
• Cancellation: 30+ days — 10% deduction; 15–29 days — 30% deduction; under 15 days — 50% deduction.
• Trip 2 Tackle reserves the right to modify itinerary due to weather, flight changes, or force majeure.

For enquiries: hello@trip2tackle.com | +91 83092 18545
© 2026 Trip 2 Tackle — Kochi, Kerala, India
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pkg.slug}-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!pkg) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F7F7F7] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              {...fadeInView}
              className="rounded-[28px] bg-white px-8 py-12 text-center shadow-[0_18px_50px_rgba(10,31,68,0.08)]"
            >
              <p className="section-label mb-4">Package Missing</p>
              <h1 className="font-playfair text-4xl font-bold text-[#0A1F44]">
                This package isn&apos;t available
              </h1>
              <p className="mx-auto mt-4 max-w-xl font-dm text-base leading-7 text-[#0A1F44]/65">
                The itinerary may have changed or the link may be outdated.
              </p>
              <Link
                href="/#packages"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-3 font-dm text-sm font-semibold text-white"
              >
                <ArrowLeft size={16} />
                Back to Packages
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const departures = buildDepartures(pkg.price);

  return (
    <>
      {emailModalOpen && <EmailModal pkg={pkg} onClose={() => setEmailModalOpen(false)} />}
      <Navbar />

      <main className="bg-[#F7F7F7]">
        {/* HERO */}
        <section className="relative min-h-[88vh] overflow-hidden bg-[#0A1F44]">
          <Image src={pkg.image} alt={pkg.name} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.18)_0%,rgba(10,31,68,0.54)_42%,rgba(10,31,68,0.96)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <div>
              <Link
                href="/#packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-dm text-sm font-medium text-white/85 backdrop-blur-md"
              >
                <ArrowLeft size={15} />
                All Packages
              </Link>
            </div>

            <motion.div {...fadeInView} className="max-w-3xl">
              <p className="mb-4 font-dm text-xs font-bold uppercase tracking-[0.28em] text-white/70">
                {pkg.destination}
              </p>
              <h1 className="font-playfair text-[clamp(48px,8vw,88px)] font-bold leading-[0.95] text-white">
                {pkg.name}
              </h1>
              <p className="mt-5 max-w-2xl font-dm text-lg leading-8 text-white/65">{pkg.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={downloadItinerary}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
                >
                  <Download size={15} /> Download Itinerary PDF
                </button>
                <button
                  onClick={() => setEmailModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-dm text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  <Mail size={15} /> Email Itinerary
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* META PILLS */}
        <section className="border-b border-[#0A1F44]/8 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-4 py-5 sm:px-6 lg:px-8">
            {[
              { icon: MapPin, label: "Destination", value: pkg.destination },
              { icon: Clock3, label: "Duration", value: pkg.duration },
              { icon: CalendarDays, label: "Trip Length", value: `${pkg.days} Days / ${pkg.nights} Nights` },
              { icon: Wallet, label: "Price", value: pkg.priceLabel },
            ].map((item) => (
              <div
                key={item.label}
                className="flex min-w-[220px] items-center gap-3 rounded-full border border-[#0A1F44]/8 bg-[#F7F7F7] px-4 py-3 font-dm text-[#0A1F44]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6A00]/12 text-[#FF6A00]">
                  <item.icon size={18} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#0A1F44]/50">{item.label}</span>
                  <span className="block text-sm font-bold">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* LEFT — Itinerary + Highlights + Departure Dates */}
            <div>
              <motion.div {...fadeInView} className="mb-14">
                <p className="section-label mb-3">Day by Day</p>
                <h2 className="font-playfair text-4xl font-bold text-[#0A1F44]">Your Itinerary</h2>
                <p className="mt-4 max-w-2xl font-dm text-base leading-8 text-[#0A1F44]/65">
                  Every departure is paced for comfort while keeping the best experiences front and center.
                </p>
              </motion.div>

              <div className="mb-16">
                {pkg.itinerary?.map((item, index) => {
                  const isLast = index === pkg.itinerary!.length - 1;
                  return (
                    <motion.div
                      key={item.day}
                      {...fadeInView}
                      className="relative pl-20"
                      style={{ paddingBottom: isLast ? 0 : 28 }}
                    >
                      {!isLast && (
                        <div className="absolute left-[21px] top-12 bottom-0 w-[2px] bg-[linear-gradient(180deg,rgba(255,106,0,0.45)_0%,rgba(10,31,68,0.08)_100%)]" />
                      )}
                      <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6A00] font-dm text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,106,0,0.22)]">
                        {item.day}
                      </div>
                      <div className="rounded-[22px] border border-[#0A1F44]/6 bg-white px-6 py-6 shadow-[0_14px_40px_rgba(10,31,68,0.06)]">
                        <h3 className="font-dm text-lg font-bold text-[#0A1F44]">{item.title}</h3>
                        <p className="mt-3 font-dm text-[15px] leading-7 text-[#0A1F44]/65">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <motion.div {...fadeInView}>
                  <p className="section-label mb-3">Highlights</p>
                  <h2 className="font-playfair text-3xl font-bold text-[#0A1F44]">Why this trip stands out</h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {pkg.highlights.map((item) => (
                      <span key={item} className="rounded-full bg-[#0A1F44] px-4 py-2 font-dm text-sm font-semibold text-white">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeInView}>
                  <p className="section-label mb-3">Included</p>
                  <h2 className="font-playfair text-3xl font-bold text-[#0A1F44]">What you get</h2>
                  <div className="mt-6 grid gap-3">
                    {pkg.includes.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#0A1F44]/6 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(10,31,68,0.04)]">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6A00]/12 text-[#FF6A00]">
                          <Check size={16} />
                        </span>
                        <span className="font-dm text-sm font-semibold text-[#0A1F44]">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* DEPARTURE DATES — Step 1 of group booking flow */}
              <motion.div
                {...fadeInView}
                className="mt-14 rounded-[24px] border border-[#0A1F44]/08 bg-white p-6 shadow-[0_14px_40px_rgba(10,31,68,0.06)]"
              >
                <DepartureDates
                  departures={departures}
                  priceLabel={pkg.priceLabel}
                  onSelect={handleDateSelect}
                />

                {/* Prompt after selecting a date */}
                {selectedDeparture && !showBookingForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-5 flex items-center justify-between rounded-xl border border-[#FF6A00]/25 bg-[#fff8f3] px-4 py-3"
                  >
                    <div className="flex items-center gap-2 font-dm text-sm text-[#0A1F44]">
                      <CalendarDays size={15} className="text-[#FF6A00]" />
                      <span>Date selected: <strong>{formatDate(selectedDeparture.date)}</strong></span>
                    </div>
                    <button
                      onClick={handleProceed}
                      className="flex items-center gap-1.5 rounded-lg bg-[#FF6A00] px-4 py-2 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
                    >
                      Proceed <ChevronDown size={14} className="rotate-[-90deg]" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* RIGHT — Sticky booking sidebar */}
            <div>
              <motion.div
                {...fadeInView}
                ref={sidebarRef}
                className="sticky top-24 space-y-4"
              >
                {/* Price card */}
                <div className="overflow-hidden rounded-[28px] border border-[#0A1F44]/6 bg-white p-6 shadow-[0_22px_60px_rgba(10,31,68,0.1)]">
                  <div className="mb-5 overflow-hidden rounded-[22px]">
                    <div className="relative h-52">
                      <Image src={pkg.image} alt={pkg.name} fill sizes="380px" className="object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.1)_0%,rgba(10,31,68,0.8)_100%)]" />
                      {pkg.badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#FF6A00] px-3 py-1 font-dm text-xs font-bold text-white">
                          {pkg.badge}
                        </span>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-dm text-[11px] uppercase tracking-[0.14em] text-white/70">{pkg.duration}</p>
                        <h3 className="font-playfair text-2xl font-bold text-white">{pkg.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-[#0A1F44]/6 bg-[#F7F7F7] p-5">
                    <p className="font-dm text-[11px] uppercase tracking-[0.14em] text-[#0A1F44]/50">Starting from</p>
                    <p className="mt-2 font-space text-4xl font-bold text-[#0A1F44]">{pkg.priceLabel}</p>
                    <p className="mt-1 font-dm text-sm text-[#0A1F44]/58">per person · group departure</p>
                  </div>

                  {/* Itinerary actions */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={downloadItinerary}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-3 py-2.5 font-dm text-xs font-bold text-[#0A1F44] transition hover:bg-[#0A1F44] hover:text-white"
                    >
                      <Download size={13} /> Download PDF
                    </button>
                    <button
                      onClick={() => setEmailModalOpen(true)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-3 py-2.5 font-dm text-xs font-bold text-[#0A1F44] transition hover:bg-[#0A1F44] hover:text-white"
                    >
                      <Mail size={13} /> Email PDF
                    </button>
                  </div>
                </div>

                {/* GROUP BOOKING — Step 2: date gate + inquiry form */}
                <div className="overflow-hidden rounded-[24px] border border-[#0A1F44]/08 bg-white">
                  <div className="border-b border-[#0A1F44]/06 px-6 py-5">
                    <p className="section-label mb-1">Group Booking</p>
                    <h3 className="font-playfair text-xl font-bold text-[#0A1F44]">Enquire / Custom Booking</h3>
                  </div>

                  <div className="px-6 py-5">
                    {!selectedDeparture ? (
                      /* No date selected yet */
                      <div className="rounded-xl border border-dashed border-[#0A1F44]/15 bg-[#F7F8FF] px-5 py-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6A00]/10">
                          <CalendarDays size={22} className="text-[#FF6A00]" />
                        </div>
                        <p className="font-playfair text-base font-bold text-[#0A1F44]">Select a Departure Date</p>
                        <p className="mt-1.5 font-dm text-xs leading-5 text-[#0A1F44]/55">
                          Choose an upcoming date from the itinerary section below to unlock the booking form.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-1.5 font-dm text-xs font-semibold text-[#FF6A00]">
                          <ChevronDown size={14} />
                          Scroll down to select a date
                        </div>
                      </div>
                    ) : !showBookingForm ? (
                      /* Date selected, show proceed */
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="mb-4 rounded-xl border border-[#22c55e]/20 bg-[#f0fdf4] px-4 py-3">
                          <p className="font-dm text-xs text-[#16a34a]/70 uppercase tracking-wide font-semibold mb-1">Date Confirmed</p>
                          <p className="font-dm text-sm font-bold text-[#0A1F44]">
                            {formatDate(selectedDeparture.date)}
                          </p>
                          <p className="font-dm text-xs text-[#0A1F44]/50 mt-0.5">
                            {selectedDeparture.slotsLeft} of {selectedDeparture.slotsTotal} seats available
                          </p>
                        </div>
                        <button
                          onClick={handleProceed}
                          className="w-full rounded-2xl bg-[#FF6A00] px-5 py-4 font-dm text-base font-bold text-white transition-colors hover:bg-[#e55f00]"
                        >
                          Continue to Enquiry Form →
                        </button>
                        <button
                          onClick={() => setSelectedDeparture(null)}
                          className="mt-2 w-full rounded-xl py-2 font-dm text-xs text-[#0A1F44]/40 hover:text-[#0A1F44] transition-colors"
                        >
                          Change date
                        </button>
                      </motion.div>
                    ) : (
                      /* Booking form unlocked with pre-filled date */
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="mb-4 rounded-xl border border-[#22c55e]/20 bg-[#f0fdf4] px-4 py-3">
                          <p className="font-dm text-xs text-[#16a34a]/70 uppercase tracking-wide font-semibold mb-1">Selected Date</p>
                          <p className="font-dm text-sm font-bold text-[#0A1F44]">{formatDate(selectedDeparture.date)}</p>
                        </div>
                        <BookingForm
                          tourName={pkg.name}
                          price={pkg.priceLabel}
                          initialDate={selectedDeparture.date}
                        />
                        <button
                          onClick={() => { setShowBookingForm(false); setSelectedDeparture(null); }}
                          className="mt-3 w-full rounded-xl py-2 font-dm text-xs text-[#0A1F44]/40 hover:text-[#0A1F44] transition-colors"
                        >
                          ← Change departure date
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A1F44] px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeInView} className="mx-auto max-w-4xl text-center">
            <p className="section-label mb-4 text-white/45">Trip Support</p>
            <h2 className="font-playfair text-[clamp(34px,5vw,52px)] font-bold text-white">
              Need help choosing dates for {pkg.destination}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-dm text-base leading-8 text-white/62">
              We can help you compare departure windows, group sizes, and seasonal conditions before you book.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
