"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Users, Star, MapPin, Clock3, ChevronDown } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import { packages as staticPackages } from "@/lib/packages";
import { buildDepartures } from "@/lib/departures";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GroupDeparturesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [groupPackages, setGroupPackages] = useState(staticPackages.filter((p) => p.isGroupDeparture));

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setGroupPackages(data.filter((p: any) => p.isGroupDeparture !== false)); })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section
          style={{
            background: "#0A1F44",
            paddingTop: "110px",
            paddingBottom: "64px",
            position: "relative",
            overflow: "hidden",
          }}
          className="px-4 sm:px-6 lg:px-[60px]"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "660px" }}>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-dm"
              style={{
                display: "block",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "14px",
              }}
            >
              Fixed Dates · Fixed Prices
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair"
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "#fff",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "16px",
              }}
            >
              Group Departures
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-dm"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "16px",
                maxWidth: "520px",
                lineHeight: 1.7,
              }}
            >
              Join our curated group tours with fixed departure dates, transparent pricing, and
              30+ fellow travellers. Book a seat or send an enquiry.
            </motion.p>
          </div>
        </section>

        {/* PACKAGES GRID */}
        <section className="bg-[#F3F2F0] px-4 sm:px-6 lg:px-[60px] py-16" style={{ paddingBottom: "80px" }}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {groupPackages.map((pkg, index) => {
              const departures = buildDepartures(pkg.price, 3, 18);
              const isExpanded = expandedId === pkg.id;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="pkg-card"
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f0",
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(10,31,68,0.08) 0%, rgba(10,31,68,0.72) 100%)",
                      }}
                    />
                    {pkg.badge && (
                      <span
                        className="font-dm"
                        style={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          background: "#FF6A00",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        {pkg.badge}
                      </span>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "rgba(10,31,68,0.65)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        padding: "4px 9px",
                        borderRadius: "20px",
                      }}
                    >
                      <Star size={10} fill="#FFD700" stroke="none" />
                      <span className="font-dm" style={{ fontSize: "10px", fontWeight: 700, color: "#fff" }}>
                        4.9
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                      <div className="font-dm" style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                        <MapPin size={10} /> {pkg.destination} · {pkg.duration}
                      </div>
                      <h3 className="font-playfair" style={{ fontSize: "18px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px 0" }}>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pkg.includes.slice(0, 3).map((inc) => (
                        <span key={inc} className="font-dm" style={{ fontSize: "10.5px", padding: "3px 9px", borderRadius: "20px", background: "#F0F2FF", color: "#0A1F44" }}>
                          {inc}
                        </span>
                      ))}
                    </div>

                    {/* Upcoming dates toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pkg.id)}
                      className="font-dm"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid rgba(10,31,68,0.1)",
                        background: "#F7F8FF",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0A1F44",
                        transition: "all 0.2s",
                        marginBottom: "12px",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <CalendarDays size={13} style={{ color: "#FF6A00" }} />
                        View Upcoming Dates
                      </span>
                      <ChevronDown
                        size={14}
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                          color: "#FF6A00",
                        }}
                      />
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden", marginBottom: "12px" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {departures.map((dep) => (
                            <div
                              key={dep.date}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "9px 12px",
                                borderRadius: "9px",
                                border: "1px solid rgba(10,31,68,0.08)",
                                background: dep.slotsLeft < dep.slotsTotal * 0.4 ? "#fff8f3" : "#fff",
                              }}
                            >
                              <div>
                                <p className="font-dm" style={{ fontSize: "12px", fontWeight: 700, color: "#0A1F44" }}>
                                  {formatDate(dep.date)}
                                </p>
                                <p className="font-dm" style={{ fontSize: "10px", color: dep.slotsLeft < 15 ? "#FF6A00" : "#9E9A94" }}>
                                  {dep.slotsLeft} seats left
                                </p>
                              </div>
                              {dep.label && (
                                <span className="font-dm" style={{ fontSize: "9px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px", background: "#FF6A00", color: "#fff" }}>
                                  {dep.label}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Footer */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 20px 18px",
                      borderTop: "1px solid #f0f0f0",
                      marginTop: "4px",
                    }}
                  >
                    <div>
                      <p className="font-dm" style={{ fontSize: "11px", color: "#9E9A94" }}>
                        per person from
                      </p>
                      <p className="font-space" style={{ fontSize: "20px", fontWeight: 700, color: "#0A1F44" }}>
                        {pkg.priceLabel}
                      </p>
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="font-dm"
                      style={{
                        background: "#0A1F44",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                    >
                      View &amp; Book <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* INFO SECTION */}
        <section style={{ background: "#0A1F44", padding: "72px 24px" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="section-label mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                Why Group Departures
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                Travel Together, Save More
              </h2>
              <p className="font-dm mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Our group departure tours offer fixed pricing, guaranteed departures, and the joy of
                exploring with like-minded travellers — with full support from our team.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: <CalendarDays size={22} className="text-[#FF6A00]" />, title: "Fixed Departure Dates", desc: "Plan in advance with confirmed departure dates. No uncertainty, no waiting." },
                { icon: <Users size={22} className="text-[#FF6A00]" />, title: "Group of 20–35 People", desc: "Travel with a curated group of fellow explorers for a richer, safer experience." },
                { icon: <Clock3 size={22} className="text-[#FF6A00]" />, title: "Hassle-Free Planning", desc: "Everything handled — transport, stays, guides, and meals. Just show up." },
              ].map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    padding: "28px 24px",
                  }}
                >
                  <div style={{ marginBottom: 14 }}>{icon}</div>
                  <h4 className="font-playfair" style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                    {title}
                  </h4>
                  <p className="font-dm" style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#fff", padding: "72px 24px", textAlign: "center" }}>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <p className="section-label mb-3">Can&apos;t Decide?</p>
            <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: "#0A1F44" }}>
              Talk to Our Travel Team
            </h2>
            <p className="font-dm text-gray-500 mb-8 leading-relaxed">
              Not sure which departure to choose? Our team will help you pick the best date,
              package, and group size for your travel plans.
            </p>
            <a
              href="https://wa.me/918309218545"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm font-bold px-8 py-3.5 rounded-xl text-white inline-flex items-center gap-2 transition-colors"
              style={{ background: "#25D366", textDecoration: "none" }}
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
