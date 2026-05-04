"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Heart, MapPin, Calendar, Users, Star,
  MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Moon
} from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import BookingForm from "@/components/blocks/booking-form";
import DepartureDates, { type DepartureDate } from "@/components/blocks/departure-dates";
import { pilgrimages } from "@/lib/pilgrimages";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

const services = [
  {
    icon: "🛕",
    title: "Temple Darshans",
    desc: "Pre-booked VIP darshan passes at Tirupati, Kashi, Vrindavan, and all major shrines across India.",
  },
  {
    icon: "🕌",
    title: "Dargah Visits",
    desc: "Respectful group ziyarat arrangements at renowned dargahs including Ajmer Sharif and Haji Ali.",
  },
  {
    icon: "⛪",
    title: "Church Pilgrimages",
    desc: "Organized visits to Velankanni Basilica, St. Thomas Mount, and other revered Christian sites.",
  },
  {
    icon: "🏔️",
    title: "Char Dham Yatra",
    desc: "Full Himalayan circuit — Yamunotri, Gangotri, Kedarnath & Badrinath — with helicopter options.",
  },
  {
    icon: "🚌",
    title: "Group Departures",
    desc: "Fixed departure dates from Vijayawada and Hyderabad for families, associations, and community groups.",
  },
  {
    icon: "👴",
    title: "Senior-Friendly Travel",
    desc: "Paced itineraries with wheelchair assistance, pony/palki options, and medical support on all trips.",
  },
];

const testimonials = [
  {
    name: "Lakshmi Devi",
    title: "Family Pilgrimage, Vijayawada",
    quote: "Trip 2 Tackle organised our Char Dham Yatra seamlessly. From Hyderabad flights to Kedarnath helicopter — everything was handled. Our family of 12 had the most blessed journey.",
    rating: 5,
    initials: "LD",
  },
  {
    name: "Ravi Shankar Rao",
    title: "Community Group, Guntur",
    quote: "We took 40 people from our association to Vaishno Devi. The logistics were flawless — RFID passes, hotel coordination, everything pre-planned. Highly recommend Trip 2 Tackle.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Father Thomas",
    title: "Velankanni Pilgrimage, Vijayawada",
    quote: "Organized a parish pilgrimage to Velankanni Basilica. The team was respectful, punctual, and caring. Special mention for how they handled elderly parishioners throughout.",
    rating: 5,
    initials: "FT",
  },
  {
    name: "Hajra Begum",
    title: "Ajmer Sharif Ziyarat, Hyderabad",
    quote: "A spiritually enriching journey to Ajmer Sharif — perfectly organized with comfortable stays, timely darbar visits, and group prayers. We felt truly taken care of.",
    rating: 5,
    initials: "HB",
  },
];

const defaultDepartures: DepartureDate[] = [
  { date: "2026-06-20", slotsTotal: 40, slotsLeft: 14, price: 0, label: "Filling Fast" },
  { date: "2026-07-05", slotsTotal: 40, slotsLeft: 28, price: 0 },
  { date: "2026-07-25", slotsTotal: 40, slotsLeft: 40, price: 0, label: "New" },
  { date: "2026-08-15", slotsTotal: 30, slotsLeft: 30, price: 0, label: "New" },
];

export default function PilgrimagesPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const prev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveTestimonial((p) => (p + 1) % testimonials.length);
  };

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative min-h-[90vh] overflow-hidden" style={{ background: "#1a0800" }}>
          <Image
            src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1600&q=85"
            alt="Sacred Pilgrimage"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,8,0,0.97)_0%,rgba(80,30,0,0.85)_50%,rgba(26,8,0,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.14),transparent_55%)]" />

          <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-32 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 backdrop-blur-sm">
                <Moon size={14} className="text-amber-400" />
                <span className="font-dm text-xs font-semibold uppercase tracking-widest text-amber-300/80">
                  Sacred Journeys
                </span>
              </div>
              <h1 className="font-playfair text-[clamp(42px,7vw,80px)] font-bold leading-[0.95]"
                style={{ color: "#fcd34d" }}>
                Pilgrimages,{" "}
                <span className="italic" style={{ color: "#f97316" }}>Thoughtfully Planned.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-dm text-lg leading-8" style={{ color: "rgba(252,211,77,0.6)" }}>
                From Tirupati to Char Dham, Vaishno Devi to Velankanni — Trip 2 Tackle organises
                sacred journeys for families, community groups, and senior travellers from Andhra
                Pradesh with complete on-ground support.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => setShowBooking(true)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-dm text-sm font-bold text-white transition-colors hover:opacity-90"
                  style={{ background: "#d97706" }}
                >
                  Plan Your Pilgrimage <ArrowRight size={16} />
                </button>
                <a
                  href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20planning%20a%20pilgrimage"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-400/25 px-7 py-3.5 font-dm text-sm font-semibold hover:bg-white/05 transition"
                  style={{ color: "rgba(252,211,77,0.8)" }}
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              {[
                { value: "500+", label: "Pilgrims Served" },
                { value: "25+", label: "Sacred Destinations" },
                { value: "All Faiths", label: "Temples · Dargahs · Churches" },
                { value: "AP Departures", label: "From Vijayawada & Hyderabad" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-playfair text-2xl font-bold" style={{ color: "#fcd34d" }}>{s.value}</p>
                  <p className="mt-0.5 font-dm text-xs uppercase tracking-wider" style={{ color: "rgba(252,211,77,0.45)" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="py-24" style={{ background: "#FFF8EE" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-14">
              <p className="section-label mb-3">What We Offer</p>
              <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                Complete Pilgrimage Services
              </h2>
              <p className="mt-3 max-w-2xl font-dm text-[#0A1F44]/60 leading-7">
                We handle every aspect of your sacred journey — from darshan pass bookings to
                group transport, senior assistance to spiritual guidance — so you can focus on faith.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(217,119,6,0.15)]"
                  style={{ borderColor: "rgba(217,119,6,0.15)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #92400e 0%, #b45309 100%)" }}
                  />
                  <div className="relative z-10">
                    <div className="mb-4 text-3xl">{icon}</div>
                    <h3 className="font-playfair text-lg font-bold text-[#0A1F44] group-hover:text-white transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2 font-dm text-sm leading-6 text-[#0A1F44]/60 group-hover:text-white/75 transition-colors">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-12">
              <p className="section-label mb-3">Pilgrimage Packages</p>
              <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                Ready-to-Book Sacred Journeys
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {pilgrimages.map((pkg, index) => {
                const isExpanded = expandedId === pkg.id;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                    className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(10,31,68,0.07)]"
                    style={{ border: "1px solid rgba(217,119,6,0.15)" }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(80,30,0,0.9)_100%)]" />
                      {pkg.badge && (
                        <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-dm text-xs font-bold text-white"
                          style={{ background: "rgba(217,119,6,0.9)" }}>
                          {pkg.badge}
                        </span>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin size={10} style={{ color: "rgba(252,211,77,0.8)" }} />
                          <p className="font-dm text-[10px] uppercase tracking-wider" style={{ color: "rgba(252,211,77,0.8)" }}>
                            {pkg.destination}
                          </p>
                        </div>
                        <h2 className="font-playfair text-xl font-bold text-white">{pkg.name}</h2>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-dm text-xs uppercase tracking-wider text-[#0A1F44]/40">{pkg.duration}</p>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={10} fill="#d97706" className="text-amber-600" />
                          ))}
                        </div>
                      </div>
                      <p className="font-dm text-sm leading-6 text-[#0A1F44]/65 line-clamp-2">{pkg.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {pkg.includes.slice(0, 3).map((item) => (
                          <span key={item} className="rounded-full px-2.5 py-1 font-dm text-[10px] font-medium"
                            style={{ background: "rgba(217,119,6,0.08)", color: "#92400e" }}>
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Departure dates toggle */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(217,119,6,0.15)" }}>
                          <DepartureDates
                            departures={defaultDepartures.map((d) => ({ ...d, price: pkg.price }))}
                            priceLabel={pkg.priceLabel}
                          />
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: "rgba(217,119,6,0.15)" }}>
                        <div>
                          <p className="font-dm text-xs text-[#0A1F44]/40">Starting from</p>
                          <p className="font-space text-xl font-bold" style={{ color: "#92400e" }}>{pkg.priceLabel}</p>
                          <p className="font-dm text-[10px] text-[#0A1F44]/35">per person</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                            className="flex items-center gap-1 rounded-xl border px-3 py-2.5 font-dm text-xs font-semibold transition-colors"
                            style={{ borderColor: "rgba(217,119,6,0.3)", color: "#92400e", background: "rgba(217,119,6,0.06)" }}
                          >
                            <Calendar size={12} /> Dates
                          </button>
                          <button
                            onClick={() => setShowBooking(true)}
                            className="rounded-xl px-4 py-2.5 font-dm text-sm font-bold text-white transition-colors hover:opacity-90"
                            style={{ background: "#0A1F44" }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="py-24" style={{ background: "#1a0800" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <p className="section-label mb-3" style={{ color: "rgba(252,211,77,0.45)" }}>Pilgrim Stories</p>
              <h2 className="font-playfair text-3xl font-bold md:text-4xl" style={{ color: "#fcd34d" }}>
                What Our Pilgrims Say
              </h2>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden rounded-[28px] border p-8 sm:p-10"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(252,211,77,0.15)" }}>
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex gap-0.5 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#d97706" className="text-amber-600" />
                    ))}
                  </div>
                  <p className="font-playfair text-xl font-medium italic leading-8 sm:text-2xl"
                    style={{ color: "#fcd34d" }}>
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full font-playfair text-lg font-bold text-white"
                      style={{ background: "#d97706" }}>
                      {testimonials[activeTestimonial].initials}
                    </div>
                    <div>
                      <p className="font-dm font-bold" style={{ color: "#fcd34d" }}>
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="font-dm text-sm" style={{ color: "rgba(252,211,77,0.5)" }}>
                        {testimonials[activeTestimonial].title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition"
                  style={{ borderColor: "rgba(252,211,77,0.2)", color: "rgba(252,211,77,0.6)" }}>
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setActiveTestimonial(i); }}
                      className="h-2 rounded-full transition-all"
                      style={{ width: i === activeTestimonial ? 24 : 8, background: i === activeTestimonial ? "#d97706" : "rgba(252,211,77,0.25)" }} />
                  ))}
                </div>
                <button onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition"
                  style={{ borderColor: "rgba(252,211,77,0.2)", color: "rgba(252,211,77,0.6)" }}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <motion.div {...fadeUp}>
                <p className="section-label mb-3">Why Trip 2 Tackle</p>
                <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                  The Pilgrimage Advantage
                </h2>
                <p className="mt-4 font-dm text-[#0A1F44]/60 leading-7">
                  Sacred travel needs more than logistics — it needs empathy, preparation, and a team
                  that treats every journey as meaningful.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Fixed group departures from Vijayawada & Hyderabad",
                    "Pre-booked darshan passes — no waiting in long queues",
                    "Senior-friendly pacing with pony/palki/wheelchair options",
                    "Multilingual guides who understand local customs",
                    "Medical support and first-aid kits on all trips",
                    "Post-trip rituals and prasadam coordination included",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={17} className="mt-0.5 shrink-0" style={{ color: "#d97706" }} />
                      <span className="font-dm text-sm text-[#0A1F44]/75">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="relative h-[420px] overflow-hidden rounded-[24px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80"
                  alt="Sacred pilgrimage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #1a0800, #3d1a00)" }}>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-3" style={{ color: "rgba(252,211,77,0.45)" }}>Plan With Us</p>
            <h2 className="font-playfair text-3xl font-bold md:text-4xl" style={{ color: "#fcd34d" }}>
              Plan Your Group Pilgrimage
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-dm text-base leading-7" style={{ color: "rgba(252,211,77,0.5)" }}>
              Share your group size, preferred destination, and dates — we&apos;ll send a complete
              pilgrimage proposal within 24 hours.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowBooking(true)}
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-dm text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ background: "#d97706" }}
              >
                <Calendar size={16} /> Book a Pilgrimage
              </button>
              <a
                href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20planning%20a%20group%20pilgrimage"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-400/25 px-7 py-3.5 font-dm text-sm font-semibold hover:bg-white/05 transition"
                style={{ color: "rgba(252,211,77,0.8)" }}
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg rounded-[28px] bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-y-auto"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="section-label mb-1">Pilgrimage Enquiry</p>
                <h3 className="font-playfair text-2xl font-bold text-[#0A1F44]">Book Your Sacred Journey</h3>
              </div>
              <button onClick={() => setShowBooking(false)}
                className="rounded-lg p-2 text-[#0A1F44]/40 hover:bg-[#0A1F44]/08 hover:text-[#0A1F44] transition">
                ✕
              </button>
            </div>
            <BookingForm tourName="Pilgrimage" onClose={() => setShowBooking(false)} />
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}
