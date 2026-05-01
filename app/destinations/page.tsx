"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const filters = ["All", "Beach", "Mountains", "Culture", "Wildlife", "City Break", "Backpacking"];

const destinations = [
  {
    name: "Kashmir",
    region: "North India",
    type: "Mountains",
    price: "₹22,999",
    nights: "6N / 7D",
    badge: "Trending",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=85",
  },
  {
    name: "Bali",
    region: "Indonesia",
    type: "Beach",
    price: "₹38,999",
    nights: "5N / 6D",
    badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=85",
  },
  {
    name: "Maldives",
    region: "South Asia",
    type: "Beach",
    price: "₹62,999",
    nights: "4N / 5D",
    badge: "Luxury",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=85",
  },
  {
    name: "Thailand",
    region: "Southeast Asia",
    type: "Culture",
    price: "₹29,999",
    nights: "7N / 8D",
    badge: "Budget",
    img: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=700&q=85",
  },
  {
    name: "Kerala",
    region: "South India",
    type: "Culture",
    price: "₹12,999",
    nights: "4N / 5D",
    badge: "Cultural",
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=85",
  },
  {
    name: "Dubai",
    region: "UAE",
    type: "City Break",
    price: "₹44,999",
    nights: "5N / 6D",
    badge: "Premium",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=85",
  },
  {
    name: "Rajasthan",
    region: "North India",
    type: "Culture",
    price: "₹18,999",
    nights: "5N / 6D",
    badge: "Heritage",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=700&q=85",
  },
  {
    name: "Coorg",
    region: "South India",
    type: "Mountains",
    price: "₹12,999",
    nights: "3N / 4D",
    badge: "Weekend",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
  },
  {
    name: "Singapore",
    region: "Southeast Asia",
    type: "City Break",
    price: "₹52,999",
    nights: "5N / 6D",
    badge: "Family",
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&q=85",
  },
];

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const filtered =
    activeFilter === "All"
      ? destinations
      : destinations.filter((d) => d.type === activeFilter);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div
        style={{
          background: "#0A0A0A",
          padding: "110px 60px 52px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        <div ref={headerRef} style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
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
              color: "rgba(255,255,255,0.55)",
              marginBottom: "14px",
              fontFamily: "var(--font-body)",
            }}
          >
            Explore the World
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#fff",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            All Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "16px",
              maxWidth: "500px",
              lineHeight: 1.6,
              fontFamily: "var(--font-body)",
              marginBottom: "36px",
            }}
          >
            From misty mountain treks to tropical beach escapes — find your perfect match.
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.26 }}
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
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
                  borderColor: activeFilter === f ? "#F97316" : "rgba(255,255,255,0.2)",
                  background: activeFilter === f ? "#F97316" : "transparent",
                  color: activeFilter === f ? "#fff" : "rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ background: "#F3F2F0", padding: "52px 60px 88px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {filtered.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="pkg-card"
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                cursor: "pointer",
              }}
            >
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  className="pkg-img-inner"
                  style={{ objectFit: "cover" }}
                  sizes="33vw"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "#F97316",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "20px",
                    letterSpacing: "0.8px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {d.badge}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "14px",
                    background: "rgba(10,10,10,0.8)",
                    color: "#fff",
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {d.nights}
                </div>
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#9E9A94",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {d.region} · {d.type}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontFamily: "var(--font-heading)",
                    color: "#1A1A1A",
                    fontWeight: 600,
                    marginBottom: "14px",
                  }}
                >
                  {d.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "11px", color: "#9E9A94", fontFamily: "var(--font-body)" }}>
                      Starting from
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#1A1A1A",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {d.price}
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
                      fontFamily: "var(--font-body)",
                      transition: "background 0.2s",
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
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px", color: "#9E9A94" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
            <p style={{ fontSize: "18px", fontFamily: "var(--font-body)" }}>
              No destinations match this filter. More coming soon!
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section style={{ background: "#0A0A0A", padding: "64px 60px", textAlign: "center" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "36px",
            color: "#fff",
            marginBottom: "12px",
            fontWeight: 600,
          }}
        >
          Can&apos;t Find What You&apos;re Looking For?
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            marginBottom: "28px",
            fontSize: "15px",
            fontFamily: "var(--font-body)",
          }}
        >
          We can plan a custom trip to almost anywhere. Just ask on WhatsApp.
        </p>
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#F97316",
            color: "#fff",
            padding: "13px 32px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#E86C0A";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#F97316";
          }}
        >
          💬 Request a Custom Trip
        </a>
      </section>

      <Footer />
    </>
  );
}
