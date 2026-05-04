"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Calendar, Users, Star, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
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

const categories = ["All", "Kerala", "Pan India", "Temples", "Dargahs", "Churches", "Char Dham"];

const keralaPilgrimages = [
  {
    id: "sabarimala",
    name: "Sabarimala Yatra",
    destination: "Pathanamthitta, Kerala",
    duration: "3 Days / 2 Nights",
    price: 4500,
    priceLabel: "₹4,500",
    type: "Temple",
    category: "Kerala",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1600100397608-ed0c1a38e3b0?w=700&q=80",
    description: "Sacred journey to Lord Ayyappa's temple atop Sabari Hills. Includes darshan queue booking, accommodation at Pamba, and guided trek support.",
    includes: ["Group Transport", "Pamba Stay", "Darshan Assistance", "Meals", "Trek Guide"],
    highlights: ["Makaravilakku Season", "Pamba River Dip", "18 Steps Darshan", "Group Prayer"],
  },
  {
    id: "guruvayur",
    name: "Guruvayur Temple",
    destination: "Thrissur, Kerala",
    duration: "2 Days / 1 Night",
    price: 3200,
    priceLabel: "₹3,200",
    type: "Temple",
    category: "Kerala",
    badge: "Family Favourite",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=700&q=80",
    description: "Visit the sacred abode of Lord Guruvayurappan, one of the most revered Vishnu temples in Kerala. Pre-booked darshan and temple elephant blessings.",
    includes: ["AC Transport", "Hotel Stay", "Darshan Pass", "Breakfast & Dinner", "Guide"],
    highlights: ["Dwadasi Special Darshan", "Elephant Sanctuary Visit", "Punja (Pooja)", "Temple Circuit"],
  },
  {
    id: "attukal",
    name: "Attukal Bhagavathy",
    destination: "Thiruvananthapuram, Kerala",
    duration: "2 Days / 1 Night",
    price: 2800,
    priceLabel: "₹2,800",
    type: "Temple",
    category: "Kerala",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=700&q=80",
    description: "Pilgrimage to the famous Attukal Bhagavathy Temple, home to the world's largest gathering of women devotees for the Pongala festival.",
    includes: ["AC Transport", "Hotel Stay", "Darshan Support", "Meals"],
    highlights: ["Pongala Festival Option", "Goddess Darshan", "Thiruvananthapuram Sightseeing"],
  },
  {
    id: "beemapalli",
    name: "Beemapalli Dargah",
    destination: "Thiruvananthapuram, Kerala",
    duration: "1 Day",
    price: 1200,
    priceLabel: "₹1,200",
    type: "Dargah",
    category: "Kerala",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=700&q=80",
    description: "Revered dargah of Bibi Marium, visited by devotees of all faiths. Special Urs festival pilgrimages with accommodation for overnight stays.",
    includes: ["AC Transport", "Prayers & Ziyarat", "Meals"],
    highlights: ["Urs Festival Season", "Multi-faith Harmony", "Ziyarat Ceremony"],
  },
  {
    id: "velankanni-kerala",
    name: "Velankanni Church Pilgrimage",
    destination: "Nagapattinam (from Kerala)",
    duration: "2 Days / 1 Night",
    price: 3500,
    priceLabel: "₹3,500",
    type: "Church",
    category: "Kerala",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
    description: "Sacred journey to the Basilica of Our Lady of Good Health — one of India's most celebrated Christian pilgrimage destinations.",
    includes: ["Bus Transport", "Hotel Stay", "Church Visit", "Novena Mass"],
    highlights: ["Basilica Mass", "Miraculous Cross", "Sea Bathing at Nagapattinam"],
  },
];

const panIndiaPilgrimages = [
  {
    id: "char-dham",
    name: "Char Dham Yatra",
    destination: "Uttarakhand",
    duration: "12 Days / 11 Nights",
    price: 22000,
    priceLabel: "₹22,000",
    type: "Temple",
    category: "Char Dham",
    badge: "Most Sacred",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    description: "Complete Char Dham circuit — Yamunotri, Gangotri, Kedarnath, and Badrinath — with helicopter options, comfortable stays, and pujari guidance.",
    includes: ["Flights from Kochi", "AC Hotels", "All Meals", "Helicopter (Optional)", "Pujari Guide", "Medical Kit"],
    highlights: ["Kedarnath Darshan", "Badrinath Puja", "Ganga Aarti at Haridwar", "Himalayan Views"],
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi Darshan",
    destination: "Katra, Jammu",
    duration: "5 Days / 4 Nights",
    price: 9500,
    priceLabel: "₹9,500",
    type: "Temple",
    category: "Pan India",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80",
    description: "Pilgrimage to the cave shrine of Mata Vaishno Devi in the Trikuta Mountains, with RFID darshan passes and helicopter options.",
    includes: ["Flights", "Hotel in Katra", "RFID Darshan Pass", "Pony/Palki Booking", "All Meals"],
    highlights: ["Ardhkuwari Cave", "Bhavan Darshan", "Katra Bazaar", "Shiv Khori Temple"],
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji Darshan",
    destination: "Tirupati, Andhra Pradesh",
    duration: "3 Days / 2 Nights",
    price: 6500,
    priceLabel: "₹6,500",
    type: "Temple",
    category: "Pan India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80",
    description: "Managed darshan at one of the world's richest and most visited temples. Includes SSD/priority darshan, head tonsuring support, and prasadam.",
    includes: ["AC Bus/Train", "Hotel", "SSD Darshan Pass", "Prasadam", "Meals"],
    highlights: ["Special Darshan", "Tonsuring Support", "Govinda Raja Swamy Temple", "Chandragiri Fort"],
  },
  {
    id: "shirdi-nashik",
    name: "Shirdi–Nashik Circuit",
    destination: "Maharashtra",
    duration: "4 Days / 3 Nights",
    price: 7800,
    priceLabel: "₹7,800",
    type: "Temple",
    category: "Pan India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=80",
    description: "Covers Shirdi Sai Baba shrine, Trimbakeshwar, and the Kumbh Mela kshetra of Nashik — three sacred sites in one efficient circuit.",
    includes: ["Flights/Train", "Hotels", "All Darshans", "VIP Puja Booking", "Meals"],
    highlights: ["Sai Baba Darshan", "Trimbakeshwar Jyotirlinga", "Godavari Ghat Puja", "Nashik Vineyards"],
  },
];

const allPilgrimages = [...keralaPilgrimages, ...panIndiaPilgrimages];

const defaultDepartures: DepartureDate[] = [
  { date: "2026-06-15", slotsTotal: 40, slotsLeft: 12, price: 0, label: "Upcoming" },
  { date: "2026-07-01", slotsTotal: 40, slotsLeft: 28, price: 0 },
  { date: "2026-07-20", slotsTotal: 40, slotsLeft: 40, price: 0, label: "New" },
  { date: "2026-08-10", slotsTotal: 30, slotsLeft: 30, price: 0, label: "New" },
];

type ModalPkg = { name: string; priceLabel?: string };

export default function PilgrimagesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [modalPkg, setModalPkg] = useState<ModalPkg | null>(null);

  const filtered = activeCategory === "All"
    ? allPilgrimages
    : allPilgrimages.filter((p) => {
        if (activeCategory === "Temples") return p.type === "Temple";
        if (activeCategory === "Dargahs") return p.type === "Dargah";
        if (activeCategory === "Churches") return p.type === "Church";
        return p.category === activeCategory;
      });


  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #5c2800 100%)" }}>
          <div className="absolute inset-0" style={{ background: "url(https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&q=60) center/cover no-repeat", opacity: 0.15 }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,165,0,0.18),transparent_55%)]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto max-w-4xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2">
              <Heart size={14} className="text-amber-400" />
              <span className="font-dm text-xs font-semibold uppercase tracking-widest text-amber-300/80">
                Faith-led Journeys
              </span>
            </div>
            <h1
              className="font-playfair font-bold leading-[0.95]"
              style={{
                fontSize: "clamp(42px,7vw,76px)",
                background: "linear-gradient(135deg, #fcd34d 0%, #f97316 40%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sacred Pilgrimages
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-dm text-lg leading-8 text-amber-100/60">
              Carefully planned journeys to India&apos;s most revered temples, dargahs, and churches —
              for families, elders, and community groups from Kerala and beyond.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {[
                { icon: "🛕", label: "Temples" },
                { icon: "🕌", label: "Dargahs" },
                { icon: "⛪", label: "Churches" },
                { icon: "🏔️", label: "Char Dham" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 font-dm text-sm text-amber-200/60">
                  <span>{item.icon}</span> {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CATEGORY FILTER */}
        <section className="sticky top-0 z-30 border-b border-[#0A1F44]/08 bg-white py-4 shadow-sm">
          <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 py-2 font-dm text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    background: activeCategory === cat ? "#0A1F44" : "#F7F7F7",
                    color: activeCategory === cat ? "#fff" : "#0A1F44",
                    border: "1.5px solid",
                    borderColor: activeCategory === cat ? "#0A1F44" : "rgba(10,31,68,0.1)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PILGRIMAGES GRID */}
        <section className="bg-[#FFF9F0] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((pkg, index) => {
                const isExpanded = expandedId === pkg.id;
                const isBooking = bookingId === pkg.id;

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                    className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(10,31,68,0.06)]"
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
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(80,30,0,0.88)_100%)]" />
                      {pkg.badge && (
                        <span
                          className="absolute left-4 top-4 rounded-full px-3 py-1 font-dm text-xs font-bold"
                          style={{ background: "rgba(217,119,6,0.9)", color: "#fff" }}
                        >
                          {pkg.badge}
                        </span>
                      )}
                      <div className="absolute left-4 top-4 right-4 flex justify-end">
                        <span
                          className="rounded-full px-2.5 py-0.5 font-dm text-[10px] font-bold backdrop-blur-sm"
                          style={{ background: "rgba(255,255,255,0.15)", color: "#fcd34d", border: "1px solid rgba(252,211,77,0.3)" }}
                        >
                          {pkg.type === "Temple" ? "🛕" : pkg.type === "Dargah" ? "🕌" : "⛪"} {pkg.type}
                        </span>
                      </div>
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
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={10} fill="#d97706" className="text-amber-600" />
                          ))}
                        </div>
                      </div>

                      <p className="font-dm text-sm leading-6 text-[#0A1F44]/65 line-clamp-2">{pkg.description}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {pkg.includes.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="rounded-full px-2.5 py-1 font-dm text-[10px] font-medium"
                            style={{ background: "rgba(217,119,6,0.08)", color: "#92400e" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Departure Dates (collapsed) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden"
                          >
                            <DepartureDates
                              departures={defaultDepartures.map((d) => ({ ...d, price: pkg.price }))}
                              priceLabel={pkg.priceLabel}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: "rgba(217,119,6,0.15)" }}>
                        <div>
                          <p className="font-dm text-xs text-[#0A1F44]/40">Starting from</p>
                          <p className="font-space text-xl font-bold" style={{ color: "#92400e" }}>
                            {pkg.priceLabel}
                          </p>
                          <p className="font-dm text-[10px] text-[#0A1F44]/35">per person</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                            className="flex items-center gap-1 rounded-xl border px-3 py-2.5 font-dm text-xs font-semibold transition-colors"
                            style={{ borderColor: "rgba(217,119,6,0.3)", color: "#92400e", background: "rgba(217,119,6,0.06)" }}
                          >
                            Dates {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </button>
                          <button
                            onClick={() => setBookingId(isBooking ? null : pkg.id)}
                            className="rounded-xl px-4 py-2.5 font-dm text-sm font-bold text-white transition-colors"
                            style={{ background: isBooking ? "#92400e" : "#0A1F44" }}
                          >
                            {isBooking ? "Hide Form" : "Book Now"}
                          </button>
                        </div>
                      </div>

                      {/* Inline booking form */}
                      <AnimatePresence>
                        {isBooking && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(217,119,6,0.15)" }}>
                              <p className="font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45 mb-3">
                                Enquire for {pkg.name}
                              </p>
                              <BookingForm
                                tourName={pkg.name}
                                price={pkg.priceLabel}
                                onClose={() => setBookingId(null)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-4xl mb-4">🕌</p>
                <p className="font-dm text-[#0A1F44]/55">No pilgrimages found for this filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* ALSO FROM LIB */}
        {pilgrimages.length > 0 && (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div {...fadeUp} className="mb-10">
                <p className="section-label mb-2">Featured Packages</p>
                <h2 className="font-playfair text-2xl font-bold text-[#0A1F44]">More Sacred Journeys</h2>
              </motion.div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pilgrimages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                    className="overflow-hidden rounded-[20px] border bg-white shadow-sm"
                    style={{ borderColor: "rgba(217,119,6,0.12)" }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image src={pkg.image} alt={pkg.name} fill sizes="33vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4a1900]/80 to-transparent" />
                      <p className="absolute bottom-3 left-4 font-playfair text-lg font-bold text-white">{pkg.name}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-dm text-xs text-[#0A1F44]/45">{pkg.duration}</p>
                        <p className="font-space text-sm font-bold" style={{ color: "#92400e" }}>{pkg.priceLabel}</p>
                      </div>
                      <p className="mt-2 font-dm text-xs leading-5 text-[#0A1F44]/55 line-clamp-2">{pkg.description}</p>
                      <button
                        onClick={() => setModalPkg({ name: pkg.name, priceLabel: pkg.priceLabel })}
                        className="mt-3 w-full rounded-lg py-2.5 font-dm text-sm font-bold text-white transition-colors"
                        style={{ background: "#0A1F44" }}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #1a0a00, #3d1a00)" }}>
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-3 text-amber-400/50">Plan With Us</p>
            <h2
              className="font-playfair text-3xl font-bold md:text-4xl"
              style={{ color: "#fcd34d" }}
            >
              Planning a Group Pilgrimage?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-dm text-base leading-7 text-amber-100/50">
              We organize temple circuits for families, associations, and community groups with departure
              support from Kerala and across India.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalPkg({ name: "Pilgrimage" })}
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-dm text-sm font-bold text-white transition-colors"
                style={{ background: "#d97706" }}
              >
                <Calendar size={16} /> Book a Pilgrimage
              </button>
              <a
                href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20planning%20a%20group%20pilgrimage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-400/25 px-7 py-3.5 font-dm text-sm font-semibold text-amber-200/80 hover:bg-white/05 transition"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Modal for lib-package + CTA enquiries */}
      {modalPkg && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/55 p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg rounded-[28px] bg-white p-7 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="section-label mb-1">Pilgrimage Enquiry</p>
                <h3 className="font-playfair text-xl font-bold text-[#0A1F44]">Book Your Sacred Journey</h3>
              </div>
              <button onClick={() => setModalPkg(null)} className="rounded-lg p-2 text-[#0A1F44]/40 hover:bg-[#0A1F44]/08 transition">✕</button>
            </div>
            <BookingForm
              tourName={modalPkg.name}
              price={modalPkg.priceLabel}
              onClose={() => setModalPkg(null)}
            />
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}
