"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  {
    icon: "💰",
    title: "Earn Real Commissions",
    tag: "Up to ₹3,000 per booking",
    desc: "Every trip booked through your referral earns you a commission — no cap, no ceiling. The more you hustle, the more you earn.",
  },
  {
    icon: "✈️",
    title: "Exclusive Travel Perks",
    tag: "Discounted & free trips",
    desc: "Get deep discounts on Trip 2 Tackle packages and early invites to special group departures — just for ambassadors.",
  },
  {
    icon: "📜",
    title: "Official Certificate",
    tag: "LinkedIn-ready credential",
    desc: "Complete the program and receive a verified certificate you can add to your LinkedIn profile and resume.",
  },
  {
    icon: "🤝",
    title: "Network & Mentorship",
    tag: "Industry connections",
    desc: "Connect with our founders, travel professionals, and a growing community of student ambassadors across India.",
  },
];

const steps = [
  { n: "01", icon: "📝", title: "Apply Online", desc: "Fill out the quick application below. Tell us who you are and why you want to represent Trip 2 Tackle on your campus." },
  { n: "02", icon: "🚀", title: "Get Onboarded", desc: "We'll respond within 48 hours. You'll get your ambassador kit, referral link, promo materials and a quick onboarding call." },
  { n: "03", icon: "💸", title: "Earn & Travel", desc: "Start sharing with your campus. Every booking through your link earns you a commission — paid monthly, no fuss." },
];

const eligibility = [
  { icon: "🎓", text: "Enrolled in a college or university (any year)" },
  { icon: "📱", text: "Active presence on Instagram, WhatsApp or YouTube" },
  { icon: "✈️", text: "Genuine passion for travel and exploration" },
  { icon: "🗣️", text: "Strong communication skills in your campus community" },
  { icon: "🔥", text: "Self-motivated, proactive, and results-driven" },
];

const ambassadors = [
  {
    name: "Rahul Menon",
    college: "CUSAT, Kochi",
    text: "I've already earned ₹18,000 this semester just by sharing Trip 2 Tackle packages with my hostel group. Best side hustle ever!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    stat: "₹18,000 earned",
  },
  {
    name: "Nisha Varghese",
    college: "MES College, Thrissur",
    text: "The travel discounts alone are worth it. I went on the Wayanad trip at 60% off — organized by a package I promoted!",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    stat: "5 trips organized",
  },
  {
    name: "Akhil Krishnan",
    college: "NIT Calicut",
    text: "I love combining travel and entrepreneurship. The founders are genuinely accessible and support you every step of the way.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    stat: "12 bookings closed",
  },
  {
    name: "Sreya Thomas",
    college: "Christ College, Bangalore",
    text: "The certificate opened doors — I got 3 internship interview calls that specifically mentioned my CAP experience on LinkedIn.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    stat: "Certified Ambassador",
  },
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

function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", college: "", city: "", email: "", instagram: "", why: "",
  });

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1.5px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.07)",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#F97316";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.2)";
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          textAlign: "center",
          padding: "60px 40px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ fontSize: "52px", marginBottom: "18px" }}>🎉</div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "26px", color: "#fff", fontWeight: 600, marginBottom: "12px" }}>
          Application Submitted!
        </h3>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontFamily: "var(--font-body)", maxWidth: "380px", margin: "0 auto", lineHeight: 1.6 }}>
          We&apos;ll review your application and reach out within 48 hours on WhatsApp. Get ready to tackle your campus! ✈️
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        {[
          { key: "name", label: "Full Name", placeholder: "Your full name" },
          { key: "college", label: "College / University", placeholder: "Your institution" },
          { key: "city", label: "City", placeholder: "Your city" },
          { key: "email", label: "Email Address", placeholder: "you@email.com" },
          { key: "instagram", label: "Instagram Handle", placeholder: "@yourhandle" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "7px", fontFamily: "var(--font-body)" }}>
              {label}
            </label>
            <input
              type={key === "email" ? "email" : "text"}
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              required
            />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "7px", fontFamily: "var(--font-body)" }}>
          Why do you want to join?
        </label>
        <textarea
          placeholder="Tell us about your love for travel, your campus network, and what you'd bring as an ambassador..."
          value={form.why}
          onChange={(e) => setForm({ ...form, why: e.target.value })}
          rows={4}
          style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
          onFocus={focus}
          onBlur={blur}
          required
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          padding: "15px",
          background: "#F97316",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        Submit Application →
      </motion.button>
    </form>
  );
}

export default function CampusAmbassadorPage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #0A0A0A 100%)",
          padding: "130px 60px 90px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Animated particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {Array.from({ length: 16 }, (_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -100], opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
              transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 10, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${6 + i * 6}%`,
                width: 4 + Math.random() * 4,
                height: 4 + Math.random() * 4,
                borderRadius: "50%",
                background: "#F97316",
              }}
            />
          ))}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-block",
              background: "rgba(249,115,22,0.15)",
              border: "1px solid rgba(249,115,22,0.3)",
              color: "#F97316",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "20px",
              marginBottom: "24px",
              fontFamily: "var(--font-body)",
            }}
          >
            Campus Ambassador Program
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(36px, 5.5vw, 66px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.08,
              marginBottom: "22px",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            Turn Your Campus
            <br />
            <span style={{ color: "#FFFFFF", fontStyle: "italic" }}>Into a Launchpad</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: "40px",
              fontFamily: "var(--font-body)",
            }}
          >
            Represent Trip 2 Tackle at your college, earn commissions on every booking, unlock exclusive travel perks — and build real-world experience while you study.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32 }}
            style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="#apply"
              style={{
                background: "#F97316",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                boxShadow: "0 4px 24px rgba(249,115,22,0.45)",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#E86C0A";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#F97316";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Apply Now — It&apos;s Free
            </a>
            <a
              href="#what-is-cap"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "14px 26px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                backdropFilter: "blur(8px)",
              }}
            >
              Learn More ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: "#0A0A0A", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[
          { n: "200+", l: "Active Ambassadors" },
          { n: "35+", l: "Colleges Covered" },
          { n: "₹2.4L+", l: "Commissions Paid" },
          { n: "4.8★", l: "Ambassador Rating" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "22px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}>{s.n}</div>
            <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.45)", fontWeight: 500, marginTop: "2px", fontFamily: "var(--font-body)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── WHAT IS CAP ── */}
      <section id="what-is-cap" style={{ background: "#fff", padding: "88px 60px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "#9E9A94", marginBottom: "12px", fontFamily: "var(--font-body)" }}>
              New to This?
            </span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "#1A1A1A", fontWeight: 600, marginBottom: "22px" }}>
              What is a Campus Ambassador Program?
            </h2>
            <p style={{ color: "#5A5652", fontSize: "16px", lineHeight: 1.8, fontFamily: "var(--font-body)", marginBottom: "16px" }}>
              A <strong>Campus Ambassador Program (CAP)</strong> is a structured initiative where selected students officially represent a brand at their college or university.
            </p>
            <p style={{ color: "#9E9A94", fontSize: "15px", lineHeight: 1.8, fontFamily: "var(--font-body)", marginBottom: "36px" }}>
              As a <strong style={{ color: "#1A1A1A" }}>Trip 2 Tackle Campus Ambassador</strong>, you become the official travel representative of your campus — organizing trips, promoting packages to your peers, and earning a commission for every booking you drive. Think of it as running your own micro travel agency, backed by an established brand.
            </p>
          </FadeIn>

          {/* 3 pillars */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {[
              { icon: "🤝", label: "Represent", desc: "Be the official face of Trip 2 Tackle at your college" },
              { icon: "📣", label: "Promote", desc: "Share packages with your network and campus groups" },
              { icon: "💰", label: "Earn", desc: "Get paid for every booking you refer — real commissions" },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{
                  background: "#F3F2F0",
                  borderRadius: "14px",
                  padding: "24px 18px",
                  border: "1px solid #E8E4DD",
                  borderBottom: "3px solid #F97316",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "#1A1A1A", marginBottom: "6px", fontFamily: "var(--font-body)" }}>{p.label}</div>
                <div style={{ fontSize: "13px", color: "#9E9A94", lineHeight: 1.55, fontFamily: "var(--font-body)" }}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ background: "#F3F2F0", padding: "88px 60px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "#9E9A94", marginBottom: "10px", fontFamily: "var(--font-body)" }}>What You Get</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "#1A1A1A", fontWeight: 600 }}>Built to Reward You</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "22px", maxWidth: "1100px", margin: "0 auto" }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="benefit-card"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px 22px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid #E8E4DD",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(249,115,22,0.1)", color: "#F97316", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", fontFamily: "var(--font-body)" }}>
                {b.tag}
              </div>
              <div style={{ fontSize: "32px", marginBottom: "14px" }}>{b.icon}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "17px", color: "#1A1A1A", fontWeight: 600, marginBottom: "8px" }}>{b.title}</h3>
              <p style={{ color: "#9E9A94", fontSize: "13px", lineHeight: 1.65, fontFamily: "var(--font-body)" }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#fff", padding: "88px 60px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "#9E9A94", marginBottom: "10px", fontFamily: "var(--font-body)" }}>The Process</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "#1A1A1A", fontWeight: 600 }}>How It Works</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px", maxWidth: "860px", margin: "0 auto" }}>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "18px", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto" }}>{s.icon}</div>
                <div style={{ position: "absolute", top: "-10px", right: "-10px", width: "26px", height: "26px", background: "#F97316", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)" }}>{s.n}</div>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "19px", color: "#1A1A1A", fontWeight: 600, marginBottom: "8px" }}>{s.title}</h3>
              <p style={{ color: "#9E9A94", fontSize: "14px", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHO CAN APPLY ── */}
      <section style={{ background: "#0A0A0A", padding: "80px 60px" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "10px", fontFamily: "var(--font-body)" }}>The Right Fit</span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", fontWeight: 600, marginBottom: "10px" }}>Who Can Apply?</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", fontFamily: "var(--font-body)" }}>No experience needed. Just passion, drive, and a love for travel.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {eligibility.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px 18px",
                }}
              >
                <span style={{ fontSize: "22px", flexShrink: 0 }}>{e.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", fontFamily: "var(--font-body)", fontWeight: 500 }}>{e.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#F3F2F0", padding: "88px 60px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "#9E9A94", marginBottom: "10px", fontFamily: "var(--font-body)" }}>Real Ambassadors</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "#1A1A1A", fontWeight: 600 }}>Hear From Our Community</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
          {ambassadors.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="benefit-card"
              style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", border: "1px solid #E8E4DD", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div style={{ color: "#F59E0B", fontSize: "13px", letterSpacing: "2px", marginBottom: "12px" }}>★★★★★</div>
              <p style={{ color: "#5A5652", fontSize: "13.5px", lineHeight: 1.7, marginBottom: "18px", fontFamily: "var(--font-body)", fontStyle: "italic" }}>&ldquo;{a.text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={a.img} alt={a.name} style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ color: "#1A1A1A", fontWeight: 600, fontSize: "13px", fontFamily: "var(--font-body)" }}>{a.name}</div>
                  <div style={{ color: "#9E9A94", fontSize: "11px", fontFamily: "var(--font-body)" }}>{a.college}</div>
                </div>
              </div>
              <div style={{ marginTop: "12px", background: "rgba(249,115,22,0.08)", color: "#F97316", fontSize: "11px", fontWeight: 700, padding: "5px 12px", borderRadius: "20px", display: "inline-block", fontFamily: "var(--font-body)" }}>
                🏆 {a.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── APPLY FORM ── */}
      <section
        id="apply"
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #141414 60%, #0A0A0A 100%)",
          padding: "88px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "400px", height: "180px", background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "10px", fontFamily: "var(--font-body)" }}>Ready to Start?</span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", fontWeight: 600, marginBottom: "10px" }}>Apply to Become an Ambassador</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", fontFamily: "var(--font-body)" }}>Takes 2 minutes. We respond within 48 hours.</p>
            </div>
          </FadeIn>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <ApplyForm />
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ background: "#F97316", padding: "60px 60px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 36px)", color: "#fff", fontWeight: 600, marginBottom: "12px" }}>
            Ready to Lead Your Campus?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", marginBottom: "26px", fontFamily: "var(--font-body)" }}>
            Questions? We&apos;re on WhatsApp.
          </p>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0A0A0A",
              color: "#fff",
              padding: "13px 32px",
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#141414"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A0A0A"; }}
          >
            💬 Chat on WhatsApp
          </a>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
