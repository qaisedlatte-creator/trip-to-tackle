"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroScrollAnimation from "@/components/HeroScrollAnimation";

/* ─── DATA ─────────────────────────────────── */
const stats = [
  { n: "500+", l: "Happy Travellers" },
  { n: "50+", l: "Destinations" },
  { n: "100+", l: "Group Packages" },
  { n: "4.9★", l: "Average Rating" },
];

const packages = [
  {
    id: 1,
    name: "Kashmir Snow Escape",
    region: "North India · Mountains",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=85",
    badge: "Trending",
    seats: "4 seats left",
    seatsLow: true,
    nights: "6N / 7D",
    people: "12 people",
    stay: "3-star hotels",
    departures: ["Jun 14", "Jul 5", "Jul 19"],
    price: "₹22,999",
    category: "Mountains",
  },
  {
    id: 2,
    name: "Bali Soul Journey",
    region: "Indonesia · Beach & Culture",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=85",
    badge: "Bestseller",
    seats: "8 seats left",
    seatsLow: false,
    nights: "5N / 6D",
    people: "10 people",
    stay: "4-star villa",
    departures: ["Jun 20", "Jul 11", "Aug 1"],
    price: "₹38,999",
    category: "International",
  },
  {
    id: 3,
    name: "Kerala Backwaters & Hills",
    region: "South India · Cultural",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=85",
    badge: "Weekend",
    seats: "10 seats left",
    seatsLow: false,
    nights: "3N / 4D",
    people: "15 people",
    stay: "Houseboat",
    departures: ["Jun 7", "Jun 28", "Jul 12"],
    price: "₹12,999",
    category: "Beach",
  },
  {
    id: 4,
    name: "Maldives Honeymoon Escape",
    region: "South Asia · Beach",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=85",
    badge: "Luxury",
    seats: "2 seats left",
    seatsLow: true,
    nights: "4N / 5D",
    people: "6 couples",
    stay: "Water villa",
    departures: ["Jun 10", "Jul 1"],
    price: "₹62,999",
    category: "Beach",
  },
  {
    id: 5,
    name: "Thailand Explorer",
    region: "Southeast Asia · Beach & Culture",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=700&q=85",
    badge: "Budget Pick",
    seats: "12 seats left",
    seatsLow: false,
    nights: "7N / 8D",
    people: "14 people",
    stay: "3-star hotels",
    departures: ["Jun 22", "Jul 20", "Aug 10"],
    price: "₹29,999",
    category: "International",
  },
  {
    id: 6,
    name: "Rajasthan Royal Circuit",
    region: "North India · Culture",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=700&q=85",
    badge: "Heritage",
    seats: "9 seats left",
    seatsLow: false,
    nights: "5N / 6D",
    people: "16 people",
    stay: "Heritage hotel",
    departures: ["Oct 5", "Nov 1", "Nov 22"],
    price: "₹18,999",
    category: "Culture",
  },
];

const filters = ["All", "Beach", "Mountains", "Culture", "International", "Weekend Getaway"];

const testimonials = [
  {
    text: "Best Wayanad weekend package. The jungle resort was stunning and price was unbeatable.",
    name: "Priya Krishnan",
    role: "Bangalore · Wayanad Weekend",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    text: "Sar Pass trek was the experience of a lifetime. The team was responsive via WhatsApp throughout.",
    name: "Vishnu Raj",
    role: "Thrissur · Sar Pass Trek",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    text: "Alappuzha houseboat was the most peaceful experience I've ever had. Highly recommend.",
    name: "Sreelakshmi T.",
    role: "Bangalore · Alappuzha Backwaters",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
  {
    text: "Maldives for our honeymoon — water villa, snorkeling, sunset dinner. Pure perfection.",
    name: "Anjali & Deepak",
    role: "Kochi · Maldives Luxury Retreat",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
  },
  {
    text: "Bali was a dream. Every detail handled perfectly — from Seminyak villa to Mt. Batur sunrise.",
    name: "Arjun Suresh",
    role: "Kochi · Bali Soul Journey",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    text: "Thailand trip was flawless. Trip to Tackle handled everything — flights, hotels, transfers.",
    name: "Fathima Nair",
    role: "Dubai · Thailand Explorer",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  },
  {
    text: "Kashmir snow escape was magical. The group was amazing and the whole trip was perfectly planned.",
    name: "Mohammed Shafeeq",
    role: "Dubai · Kashmir Snow Escape",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
  },
  {
    text: "Singapore with kids was stress-free. Universal Studios, Gardens by the Bay — sorted perfectly.",
    name: "Rajan Pillai",
    role: "Abu Dhabi · Singapore Family Tour",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  },
  {
    text: "Rajasthan royal circuit was breathtaking. Heritage hotels, desert camps, the works!",
    name: "Meera Nambiar",
    role: "Kochi · Rajasthan Royal Circuit",
    img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80",
  },
];

/* ─── HERO ─── */
function HeroSection() {
  return <HeroScrollAnimation />;
}

/* ─── STATS BAR ─────────────────────────────── */
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        background: "#0A0A0A",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{
            padding: "22px 20px",
            textAlign: "center",
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "30px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {s.n}
          </div>
          <div
            style={{
              fontSize: "11.5px",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 500,
              marginTop: "2px",
              fontFamily: "var(--font-body)",
            }}
          >
            {s.l}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── PACKAGE CARD ───────────────────────────── */
function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="pkg-card"
      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        border: "1px solid #E8E4DD",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="pkg-img-inner"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "#F97316",
            color: "#fff",
            fontSize: "10px",
            fontWeight: 700,
            padding: "4px 11px",
            borderRadius: "20px",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          {pkg.badge}
        </div>
        {/* Seats */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            background: "rgba(10,10,10,0.85)",
            color: "#fff",
            fontSize: "11px",
            padding: "4px 10px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backdropFilter: "blur(4px)",
            fontFamily: "var(--font-body)",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: pkg.seatsLow ? "#F59E0B" : "#4ade80",
              flexShrink: 0,
            }}
          />
          {pkg.seats}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 24px" }}>
        <div
          style={{
            fontSize: "10.5px",
            color: "#9E9A94",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "4px",
            fontFamily: "var(--font-body)",
          }}
        >
          {pkg.region}
        </div>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "21px",
            fontWeight: 600,
            color: "#1A1A1A",
            marginBottom: "10px",
          }}
        >
          {pkg.name}
        </div>
        <div
          style={{ display: "flex", gap: "14px", marginBottom: "16px", flexWrap: "wrap" }}
        >
          {[`📅 ${pkg.nights}`, `👥 ${pkg.people}`, `🏨 ${pkg.stay}`].map((m) => (
            <span
              key={m}
              style={{
                fontSize: "12px",
                color: "#9E9A94",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "var(--font-body)",
              }}
            >
              {m}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {pkg.departures.map((d) => (
            <span
              key={d}
              style={{
                background: "#F3F2F0",
                color: "#5A5652",
                fontSize: "11.5px",
                fontWeight: 500,
                padding: "4px 10px",
                borderRadius: "20px",
                fontFamily: "var(--font-body)",
              }}
            >
              {d}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E8E4DD",
            paddingTop: "16px",
          }}
        >
          <div>
            <div
              style={{ fontSize: "11px", color: "#9E9A94", fontFamily: "var(--font-body)" }}
            >
              per person
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1A1A1A",
                fontFamily: "var(--font-body)",
              }}
            >
              {pkg.price}
            </div>
          </div>
          <Link
            href="#"
            style={{
              background: "#F97316",
              color: "#fff",
              padding: "9px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#E86C0A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#F97316";
            }}
          >
            View Trip
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PACKAGES SECTION ───────────────────────── */
function PackagesSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const filtered =
    activeFilter === "All"
      ? packages
      : packages.filter((p) => p.category === activeFilter);

  return (
    <section id="packages" style={{ background: "#F3F2F0", padding: "88px 60px" }}>
      <div ref={headerRef} style={{ textAlign: "center", marginBottom: "52px" }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "block",
            fontSize: "10.5px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#9E9A94",
            marginBottom: "10px",
            fontFamily: "var(--font-body)",
          }}
        >
          Live Group Departures
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "46px",
            fontWeight: 600,
            color: "#1A1A1A",
          }}
        >
          Upcoming Group Packages
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{
            color: "#9E9A94",
            fontSize: "15.5px",
            marginTop: "10px",
            maxWidth: "480px",
            marginInline: "auto",
            fontFamily: "var(--font-body)",
          }}
        >
          Real departure dates, fixed group sizes — join fellow travellers and go.
        </motion.p>
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "44px",
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: "8px 20px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "1.5px solid",
              borderColor: activeFilter === f ? "#0A0A0A" : "#E8E4DD",
              background: activeFilter === f ? "#0A0A0A" : "#fff",
              color: activeFilter === f ? "#fff" : "#5A5652",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "28px",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ───────────────────────────── */
function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const steps = [
    {
      icon: "📍",
      n: 1,
      title: "Pick Your Package",
      desc: "Browse live group departures. Filter by budget, destination, or travel style. Check available seats and dates.",
    },
    {
      icon: "⚙️",
      n: 2,
      title: "Customize & Confirm",
      desc: "Choose your dates, add-ons, and room preference. Our team tailors every detail over WhatsApp.",
    },
    {
      icon: "✈️",
      n: 3,
      title: "Pay & Travel",
      desc: "Pay via Razorpay or bank transfer. We handle flights, hotels, and transfers — you just pack.",
    },
  ];

  return (
    <section style={{ background: "#FFFFFF", padding: "88px 60px" }}>
      <div ref={ref} style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "44px" }}
        >
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#9E9A94",
              display: "block",
              marginBottom: "10px",
              fontFamily: "var(--font-body)",
            }}
          >
            HOW IT WORKS
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "38px",
              fontWeight: 600,
              color: "#1A1A1A",
            }}
          >
            Booking Made Easy as 1–2–3
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: "#0A0A0A",
            borderRadius: "20px",
            padding: "44px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            border: "2px solid rgba(249,115,22,0.18)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Orange bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "40px",
              right: "40px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #F97316, transparent)",
              borderRadius: "2px",
            }}
          />

          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "0 28px",
                borderRight:
                  i < steps.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                    margin: "0 auto",
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "22px",
                    height: "22px",
                    background: "#F97316",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {s.n}
                </div>
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "10px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "13.5px",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────── */
function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.055)",
        maxWidth: "320px",
        width: "100%",
        marginBottom: "22px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          color: "#F59E0B",
          fontSize: "13px",
          letterSpacing: "2px",
          marginBottom: "12px",
        }}
      >
        ★★★★★
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.82)",
          fontSize: "14px",
          lineHeight: 1.75,
          marginBottom: "18px",
          fontFamily: "var(--font-body)",
        }}
      >
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Image
            src={t.img}
            alt={t.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="40px"
          />
        </div>
        <div>
          <div
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "var(--font-body)",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "12px",
              marginTop: "2px",
              fontFamily: "var(--font-body)",
            }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsColumn({
  items,
  duration,
  hidden,
}: {
  items: typeof testimonials;
  duration: number;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <div style={{ overflow: "hidden", flexShrink: 0, width: "320px" }}>
      <motion.div
        animate={{ y: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {[0, 1].map((copy) =>
          items.map((t, i) => <TestimonialCard key={`${copy}-${i}`} t={t} />)
        )}
      </motion.div>
    </div>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 9);

  return (
    <section
      style={{ background: "#0A0A0A", padding: "88px 60px", overflow: "hidden" }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "52px" }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            display: "block",
            marginBottom: "12px",
            fontFamily: "var(--font-body)",
          }}
        >
          What Travellers Say
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Real Stories, Real Journeys
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            marginTop: "12px",
            fontSize: "15px",
            fontFamily: "var(--font-body)",
          }}
        >
          Hundreds of happy travellers — here&apos;s what they say.
        </p>
      </motion.div>

      <div
        className="fade-mask"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "22px",
          maxHeight: "740px",
          overflow: "hidden",
        }}
      >
        <TestimonialsColumn items={col1} duration={15} />
        <TestimonialsColumn items={col2} duration={19} hidden={width < 768} />
        <TestimonialsColumn items={col3} duration={17} hidden={width < 1024} />
      </div>
    </section>
  );
}

/* ─── CTA BAND ───────────────────────────────── */
function CTABand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      style={{ background: "#F97316", padding: "68px 60px", textAlign: "center" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "42px",
          color: "#fff",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        Ready to Tackle Your Next Trip?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "17px",
          marginBottom: "34px",
          fontFamily: "var(--font-body)",
        }}
      >
        Chat with us on WhatsApp and get a custom quote in under 2 hours.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
      >
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#0A0A0A",
            color: "#fff",
            padding: "14px 34px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background 0.2s",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#141414";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
          }}
        >
          💬 WhatsApp Us
        </a>
        <Link
          href="/#packages"
          style={{
            border: "2px solid rgba(255,255,255,0.8)",
            color: "#fff",
            padding: "14px 34px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            transition: "background 0.2s",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          Browse Packages
        </Link>
      </motion.div>
    </section>
  );
}

/* ─── HOME PAGE ──────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <PackagesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTABand />
      <Footer />
    </>
  );
}
