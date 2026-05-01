"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const whyUs = [
  {
    icon: "🌍",
    title: "Travel-First Culture",
    desc: "We don't just sell travel — we live it. Team trips, offsite retreats, and destination experiences are part of the job.",
  },
  {
    icon: "📈",
    title: "Real Growth",
    desc: "We're scaling fast across India and the GCC. Join early and grow into a leadership role as the company expands.",
  },
  {
    icon: "💡",
    title: "Make an Impact",
    desc: "Every decision you make shapes real experiences for real people. No bureaucracy, no endless queues — your ideas get acted on.",
  },
];

const perks = [
  { icon: "✈️", title: "Travel Allowance", desc: "Annual travel credit + group team trip every year" },
  { icon: "🏠", title: "Remote-Friendly", desc: "Most roles have flexible work-from-anywhere options" },
  { icon: "📈", title: "Growth Path", desc: "Clear progression with quarterly performance reviews" },
  { icon: "🌴", title: "Generous Leave", desc: "Paid leave including your birthday and festive seasons" },
  { icon: "📚", title: "Learning Budget", desc: "Courses, certifications, and industry events covered" },
  { icon: "💬", title: "Founder Access", desc: "Direct line to leadership from day one — no middlemen" },
];

const roles = [
  {
    role: "Travel Sales Executive",
    dept: "Sales",
    type: "Full-time",
    loc: "Kochi / Remote",
    desc: "Convert warm leads into confirmed bookings. Own the client relationship end-to-end.",
  },
  {
    role: "Social Media & Content Lead",
    dept: "Marketing",
    type: "Full-time",
    loc: "Remote",
    desc: "Build our brand voice across Instagram, YouTube and Reels. Storytelling meets strategy.",
  },
  {
    role: "Tour Coordinator",
    dept: "Operations",
    type: "Full-time",
    loc: "Kochi",
    desc: "Orchestrate seamless group departures. You're the reason every trip runs like clockwork.",
  },
  {
    role: "Customer Experience Associate",
    dept: "Support",
    type: "Part-time",
    loc: "Remote",
    desc: "Be the calm, knowledgeable voice for travellers — before, during, and after every trip.",
  },
];

const teamPhotos = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=85",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85",
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CareersPage() {
  const rolesRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #141414 60%, #0A0A0A 100%)",
          padding: "120px 60px 80px",
          position: "relative",
          overflow: "hidden",
          minHeight: "520px",
        }}
      >
        {/* Decorative grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "-60px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            border: "1px solid rgba(249,115,22,0.1)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "40px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            border: "1px solid rgba(249,115,22,0.07)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "60px",
            alignItems: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "18px",
                fontFamily: "var(--font-body)",
              }}
            >
              Careers at Trip 2 Tackle
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Shape Your Career
              <br />
              <span style={{ color: "#FFFFFF", fontStyle: "italic" }}>in Travel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "17px",
                lineHeight: 1.7,
                marginBottom: "36px",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                maxWidth: "520px",
              }}
            >
              Join a team that turns wanderlust into a profession. We build journeys, not just itineraries — and we need people who care deeply about both.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
            >
              <button
                onClick={() => rolesRef.current?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "#F97316",
                  color: "#fff",
                  padding: "13px 30px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "15px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E86C0A";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#F97316";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                View Open Roles →
              </button>
              <Link
                href="/campus-ambassador"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                  padding: "13px 28px",
                  borderRadius: "8px",
                  fontWeight: 500,
                  fontSize: "15px",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }}
              >
                Campus Ambassador
              </Link>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(249,115,22,0.3)",
              boxShadow: "0 0 60px rgba(249,115,22,0.15)",
              flexShrink: 0,
              position: "relative",
            }}
            className="hidden lg:block"
          >
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=85"
              alt="Team"
              fill
              style={{ objectFit: "cover" }}
              sizes="260px"
            />
          </motion.div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: "220px", overflow: "hidden" }}>
        {teamPhotos.map((src, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden" }}>
            <Image
              src={src}
              alt={`Team ${i + 1}`}
              fill
              style={{ objectFit: "cover", filter: "brightness(0.7)" }}
              sizes="33vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 60%)",
              }}
            />
            {i === 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                }}
              >
                Life at Trip 2 Tackle
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── WHY US ── */}
      <section style={{ background: "#fff", padding: "88px 60px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#9E9A94",
                marginBottom: "10px",
                fontFamily: "var(--font-body)",
              }}
            >
              Why Join Us
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 4vw, 44px)",
                color: "#1A1A1A",
                fontWeight: 600,
              }}
            >
              Built Different. For People Who Think Different.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {whyUs.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "#F3F2F0",
                borderRadius: "16px",
                padding: "32px 28px",
                borderTop: "4px solid #F97316",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.08)" }}
            >
              <div style={{ fontSize: "32px", marginBottom: "14px" }}>{w.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "19px",
                  color: "#1A1A1A",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                {w.title}
              </h3>
              <p
                style={{
                  color: "#9E9A94",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-body)",
                }}
              >
                {w.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PERKS ── */}
      <section style={{ background: "#F3F2F0", padding: "80px 60px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#9E9A94",
                marginBottom: "10px",
                fontFamily: "var(--font-body)",
              }}
            >
              Perks & Benefits
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(30px, 4vw, 40px)",
                color: "#1A1A1A",
                fontWeight: 600,
              }}
            >
              We Take Care of Our People
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {perks.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "24px 22px",
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                border: "1px solid #E8E4DD",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              whileHover={{ borderColor: "#F97316", boxShadow: "0 6px 24px rgba(0,0,0,0.07)" }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(249,115,22,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1A1A1A",
                    marginBottom: "4px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#9E9A94",
                    lineHeight: 1.55,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {p.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section ref={rolesRef} style={{ background: "#fff", padding: "88px 60px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#9E9A94",
                marginBottom: "10px",
                fontFamily: "var(--font-body)",
              }}
            >
              Current Openings
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(30px, 4vw, 42px)",
                color: "#1A1A1A",
                fontWeight: 600,
              }}
            >
              Open Positions
            </h2>
            <p
              style={{
                color: "#9E9A94",
                marginTop: "10px",
                fontSize: "15px",
                fontFamily: "var(--font-body)",
              }}
            >
              Don&apos;t see your role? Send your CV — we&apos;re always looking for great people.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {roles.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="role-card"
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "22px 26px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #E8E4DD",
                borderLeft: "4px solid transparent",
                cursor: "pointer",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    marginBottom: "5px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {r.role}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9E9A94",
                    marginBottom: "10px",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {r.desc}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[r.dept, r.type, r.loc].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        color: "#5A5652",
                        background: "#F3F2F0",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                style={{
                  background: "#F97316",
                  color: "#fff",
                  padding: "10px 22px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                  marginLeft: "24px",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E86C0A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#F97316";
                }}
              >
                Apply Now
              </button>
            </motion.div>
          ))}

          {/* Send CV card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35 }}
            style={{
              marginTop: "6px",
              background: "#0A0A0A",
              borderRadius: "14px",
              padding: "32px 36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h4
                style={{
                  color: "#fff",
                  fontSize: "17px",
                  fontWeight: 600,
                  marginBottom: "5px",
                  fontFamily: "var(--font-body)",
                }}
              >
                Don&apos;t see your perfect role?
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "13px",
                  fontFamily: "var(--font-body)",
                }}
              >
                Send us your CV and a note on what excites you. We&apos;ll reach out.
              </p>
            </div>
            <a
              href="mailto:careers@trip2tackle.com"
              style={{
                background: "#F97316",
                color: "#fff",
                padding: "12px 26px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#E86C0A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#F97316";
              }}
            >
              Send Your CV →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          background: "#F97316",
          padding: "64px 60px",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 4vw, 38px)",
              color: "#fff",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Ready to Build Something Great?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "16px",
              marginBottom: "28px",
              fontFamily: "var(--font-body)",
            }}
          >
            Also check our{" "}
            <Link
              href="/campus-ambassador"
              style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}
            >
              Campus Ambassador Program
            </Link>{" "}
            if you&apos;re a college student.
          </p>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0A0A0A",
              color: "#fff",
              padding: "14px 34px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#141414";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
            }}
          >
            💬 Talk to Us on WhatsApp
          </a>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
