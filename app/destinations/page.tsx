"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import { destinations } from "@/lib/destinations";

const INDIA_DESTINATIONS = destinations.filter((d) => d.type === "domestic");
const INTL_DESTINATIONS  = destinations.filter((d) => d.type === "international");

const INDIA_FILTERS = INDIA_DESTINATIONS.map((d) => d.name);
const INTL_FILTERS  = INTL_DESTINATIONS.map((d) => d.name);

const BADGE_MAP: Record<string, string> = {
  kashmir: "Trending",
  bali: "Bestseller",
  maldives: "Luxury",
  thailand: "Budget",
  vietnam: "Budget",
  singapore: "Family",
  manali: "Adventure",
  "sar-pass": "Trek",
  munnar: "Scenic",
  wayanad: "Wildlife",
  kodaikanal: "Getaway",
  ooty: "Heritage",
  alappuzha: "Backwaters",
  malaysia: "Popular",
};

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerInView = useInView(headerRef, { once: true });

  const filteredDestinations =
    activeFilter === "All"       ? destinations
    : activeFilter === "India"   ? INDIA_DESTINATIONS
    : activeFilter === "International" ? INTL_DESTINATIONS
    : destinations.filter((d) => d.name === activeFilter);

  return (
    <>
      <Navbar />

      <div
        className="px-4 sm:px-6 lg:px-[60px]"
        style={{
          background: "#0A1F44",
          paddingTop: "110px",
          paddingBottom: "52px",
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
            className="font-dm"
            style={{
              display: "block",
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "14px",
            }}
          >
            Explore the World
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair"
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#fff",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            All Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="font-dm"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "16px",
              maxWidth: "500px",
              lineHeight: 1.6,
              marginBottom: "36px",
            }}
          >
            From misty mountain treks to tropical beach escapes, find the trip that matches your pace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.26 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* All filter */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              {["All"].map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="font-dm"
                    style={{
                      padding: "8px 20px",
                      borderRadius: "100px",
                      fontSize: "12.5px",
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: isActive ? "#FF6A00" : "rgba(255,255,255,0.18)",
                      background: isActive ? "#FF6A00" : "transparent",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.68)",
                      transition: "all 0.2s",
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* India destinations */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span className="font-dm" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginRight: "2px", whiteSpace: "nowrap" }}>
                🇮🇳 India
              </span>
              {["India", ...INDIA_FILTERS].map((filter) => {
                const isActive = activeFilter === filter;
                const isSection = filter === "India";
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="font-dm"
                    style={{
                      padding: "7px 15px",
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: isActive ? 700 : isSection ? 600 : 500,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: isActive ? "#FF6A00" : isSection ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
                      background: isActive ? "#FF6A00" : "transparent",
                      color: isActive ? "#fff" : isSection ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                      transition: "all 0.2s",
                    }}
                  >
                    {filter === "India" ? "All India" : filter}
                  </button>
                );
              })}
            </div>

            {/* International destinations */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span className="font-dm" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginRight: "2px", whiteSpace: "nowrap" }}>
                🌍 International
              </span>
              {["International", ...INTL_FILTERS].map((filter) => {
                const isActive = activeFilter === filter;
                const isSection = filter === "International";
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="font-dm"
                    style={{
                      padding: "7px 15px",
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: isActive ? 700 : isSection ? 600 : 500,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: isActive ? "#FF6A00" : isSection ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
                      background: isActive ? "#FF6A00" : "transparent",
                      color: isActive ? "#fff" : isSection ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                      transition: "all 0.2s",
                    }}
                  >
                    {filter === "International" ? "All International" : filter}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-[#F3F2F0] px-4 sm:px-6 lg:px-[60px] py-14" style={{ paddingBottom: "88px" }}>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination, index) => {
            const badge = BADGE_MAP[destination.slug];

            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="pkg-card"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                }}
              >
                <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="pkg-img-inner"
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(10,31,68,0.1) 0%, rgba(10,31,68,0.72) 100%)",
                    }}
                  />
                  {badge && (
                    <div
                      className="font-dm"
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        background: "#FF6A00",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "20px",
                        letterSpacing: "0.8px",
                      }}
                    >
                      {badge}
                    </div>
                  )}
                  <div
                    className="font-dm"
                    style={{
                      position: "absolute",
                      bottom: "14px",
                      left: "14px",
                      background: "rgba(10,31,68,0.82)",
                      color: "#fff",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {destination.duration}
                  </div>
                </div>

                <div style={{ padding: "18px 20px 22px" }}>
                  <div
                    className="font-dm"
                    style={{
                      fontSize: "11px",
                      color: "#9E9A94",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {destination.region} · {destination.type_label}
                  </div>
                  <h3
                    className="font-playfair"
                    style={{
                      fontSize: "20px",
                      color: "#1A1A1A",
                      fontWeight: 700,
                      marginBottom: "14px",
                    }}
                  >
                    {destination.name}
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                    <div>
                      <div className="font-dm" style={{ fontSize: "11px", color: "#9E9A94" }}>
                        Starting from
                      </div>
                      <div
                        className="font-space"
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#1A1A1A",
                        }}
                      >
                        {destination.priceLabel}
                      </div>
                    </div>
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="font-dm"
                      style={{
                        background: "#0A1F44",
                        color: "#fff",
                        padding: "9px 18px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "background 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.background = "#FF6A00";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.background = "#0A1F44";
                      }}
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredDestinations.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px", color: "#9E9A94" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
            <p className="font-dm" style={{ fontSize: "18px" }}>
              No destinations match this filter. More trips are on the way.
            </p>
          </div>
        )}
      </div>

      <section style={{ background: "#0A1F44", padding: "64px 24px", textAlign: "center" }}>
        <h3
          className="font-playfair"
          style={{
            fontSize: "36px",
            color: "#fff",
            marginBottom: "12px",
            fontWeight: 700,
          }}
        >
          Can&apos;t Find What You&apos;re Looking For?
        </h3>
        <p
          className="font-dm"
          style={{
            color: "rgba(255,255,255,0.45)",
            marginBottom: "28px",
            fontSize: "15px",
          }}
        >
          We can plan a custom trip to almost anywhere. Just ask on WhatsApp.
        </p>
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="font-dm"
          style={{
            background: "#FF6A00",
            color: "#fff",
            padding: "13px 32px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            transition: "background 0.2s",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "46px",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "#d95f00";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "#FF6A00";
          }}
        >
          Request a Custom Trip
        </a>
      </section>

      <Footer />
    </>
  );
}
