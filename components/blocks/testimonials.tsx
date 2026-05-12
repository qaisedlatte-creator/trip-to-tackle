"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Testimonial = { text: string; name: string; location: string; package: string; rating: number };

const STATIC_TESTIMONIALS: Testimonial[] = [
  { text: "Trip 2 Tackle made our Kashmir trip absolutely magical. The houseboat on Dal Lake was unforgettable.", name: "Rahul Menon", location: "Dubai, UAE", package: "Kashmir Snow Escape", rating: 5 },
  { text: "Best Wayanad weekend package. The jungle resort was stunning and price was unbeatable from Kochi.", name: "Priya Krishnan", location: "Bangalore", package: "Wayanad Weekend", rating: 5 },
  { text: "Bali was a dream. Every detail handled perfectly — from Seminyak villa to Mt. Batur sunrise trek.", name: "Arjun Suresh", location: "Kochi, Kerala", package: "Bali Soul Journey", rating: 5 },
  { text: "Thailand trip was flawless. Trip 2 Tackle handled everything — flights, hotels, and transfers.", name: "Fathima Nair", location: "Kozhikode", package: "Thailand Adventure", rating: 5 },
  { text: "Sar Pass trek was the experience of a lifetime. The team was responsive via WhatsApp throughout.", name: "Vishnu Raj", location: "Thrissur", package: "Sar Pass Trek", rating: 5 },
  { text: "Maldives for our honeymoon — water villa, snorkeling, sunset dinner. Pure perfection.", name: "Anjali & Deepak", location: "Kochi", package: "Maldives Luxury Retreat", rating: 5 },
  { text: "Vietnam in 8 days — Ha Long Bay, Hoi An, Ho Chi Minh. Trip 2 Tackle nailed every single detail.", name: "Mohammed Shafeeq", location: "Calicut", package: "Vietnam Explorer", rating: 5 },
  { text: "Alappuzha houseboat overnight was the most peaceful experience I've ever had. Highly recommend.", name: "Sreelakshmi T.", location: "Bangalore", package: "Alappuzha Backwaters", rating: 5 },
  { text: "Singapore with family — Universal Studios, Gardens by the Bay, everything sorted perfectly.", name: "Rajan Pillai", location: "Abu Dhabi", package: "Singapore Family Tour", rating: 5 },
  { text: "The Spiti Valley group trip was unlike anything I've done. New friends, incredible landscapes.", name: "Divya Nambiar", location: "Chennai", package: "Spiti Valley Expedition", rating: 5 },
  { text: "Booked Bali two weeks before departure and they handled everything seamlessly. Truly impressive.", name: "Arun Kumar", location: "Hyderabad", package: "Bali Soul Journey", rating: 5 },
  { text: "Kerala backwaters houseboat was a surreal experience. Perfectly curated, zero stress.", name: "Neha Iyer", location: "Mumbai", package: "Alappuzha Backwaters", rating: 5 },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FF6A00">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "20px 22px",
        marginBottom: 14,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <StarRating count={t.rating} />
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13.5,
          color: "#374151",
          lineHeight: 1.65,
          fontWeight: 400,
          margin: 0,
        }}
      >
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#0A1F44", margin: 0 }}>
          {t.name}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "#9ca3af", margin: "3px 0 0" }}>
          {t.location} &middot; {t.package}
        </p>
      </div>
    </div>
  );
}

interface ColumnProps {
  testimonials: Testimonial[];
  duration: number;
  reverse?: boolean;
  desktopOnly?: boolean;
  xlOnly?: boolean;
}

function ScrollingColumn({ testimonials, duration, reverse = false, desktopOnly = false, xlOnly = false }: ColumnProps) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      style={{
        overflow: "hidden",
        flex: 1,
        minWidth: 0,
        maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
      }}
      className={xlOnly ? "hidden xl:block" : desktopOnly ? "hidden md:block" : undefined}
    >
      <motion.div
        animate={{ y: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(STATIC_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setAllTestimonials(data); })
      .catch(() => {});
  }, []);

  /* 4 columns: col1 mobile+, col2/3 md+, col4 xl+ */
  const col1 = allTestimonials.slice(0, 3);
  const col2 = allTestimonials.slice(3, 6);
  const col3 = allTestimonials.slice(6, 9);
  const col4 = allTestimonials.slice(9, 12);

  return (
    <section style={{ background: "#0A1F44", paddingTop: 96, paddingBottom: 96, overflow: "hidden" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p className="section-label mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
            What Travelers Say
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
            Real Stories, Real Journeys
          </h2>
        </motion.div>

        <div style={{ display: "flex", gap: 16, height: 520 }}>
          <ScrollingColumn testimonials={col1} duration={20} />
          <ScrollingColumn testimonials={col2} duration={25} reverse desktopOnly />
          <ScrollingColumn testimonials={col3} duration={18} desktopOnly />
          <ScrollingColumn testimonials={col4} duration={22} reverse xlOnly />
        </div>
      </div>
    </section>
  );
}
