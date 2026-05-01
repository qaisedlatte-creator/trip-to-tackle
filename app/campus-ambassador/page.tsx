"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── DATA ─── */
const benefits = [
  {
    icon: "💰",
    title: "Earn Commissions",
    desc: "Get paid for every booking you drive from your campus. The more you hustle, the more you earn — no cap.",
    highlight: "Up to ₹3,000 per booking",
  },
  {
    icon: "✈️",
    title: "Exclusive Travel Perks",
    desc: "Trip discounts, early access to new packages, and invites to special group departures — just for ambassadors.",
    highlight: "Free & discounted trips",
  },
  {
    icon: "📜",
    title: "Official Certificate",
    desc: "Receive a verified certificate of completion that you can add to your LinkedIn and resume.",
    highlight: "Verified credential",
  },
  {
    icon: "🤝",
    title: "Network & Grow",
    desc: "Connect with our team, travel industry professionals, and a growing community of student ambassadors.",
    highlight: "Industry connections",
  },
];

const requirements = [
  { icon: "✈️", label: "Passionate about travel" },
  { icon: "📱", label: "Active on social media (Instagram, WhatsApp, YouTube)" },
  { icon: "🎓", label: "Currently enrolled in a college/university" },
  { icon: "🗣️", label: "Natural networker & communicator" },
  { icon: "🔥", label: "Self-motivated and driven" },
];

const howItWorks = [
  {
    n: "01",
    title: "Apply Online",
    desc: "Fill out the quick application form below. Tell us about yourself and why you want to represent Trip to Tackle.",
    icon: "📝",
  },
  {
    n: "02",
    title: "Get Onboarded",
    desc: "We'll reach out within 48 hours. You'll get your ambassador kit, training materials, and promo codes.",
    icon: "🚀",
  },
  {
    n: "03",
    title: "Start Earning",
    desc: "Share with your campus community. Every booking through your link earns you a commission, instantly.",
    icon: "💸",
  },
];

const currentAmbassadors = [
  {
    name: "Rahul Menon",
    college: "CUSAT, Kochi",
    text: "Being a Trip to Tackle ambassador has been incredible. I've already earned ₹18,000 this semester while planning trips for my friends!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    earned: "₹18,000 earned",
  },
  {
    name: "Nisha Varghese",
    college: "MES College, Thrissur",
    text: "The travel perks alone are worth it. I went on the Wayanad trip at 60% off — and my whole friend group booked through me!",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    earned: "5 trips organized",
  },
  {
    name: "Akhil Krishnan",
    college: "NIT Calicut",
    text: "I love that I get to combine two things I'm obsessed with — travel and entrepreneurship. The team is super supportive.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    earned: "12 bookings closed",
  },
  {
    name: "Sreya Thomas",
    college: "Christ College, Bangalore",
    text: "The certificate was a huge bonus — I added it to my LinkedIn and got 3 interview calls mentioning it. Worth every bit.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    earned: "Certified Ambassador",
  },
];

function FadeSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── APPLY FORM ─── */
function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    college: "",
    city: "",
    email: "",
    instagram: "",
    why: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          textAlign: "center",
          padding: "60px 40px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎉</div>
        <h3
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "28px",
            color: "#fff",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Application Submitted!
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            fontFamily: "var(--font-dm)",
            maxWidth: "400px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          We&apos;ll review your application and reach out within 48 hours on WhatsApp.
          Welcome to the journey! ✈️
        </p>
      </motion.div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "10px",
    border: "1.5px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "var(--font-dm)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "8px",
    fontFamily: "var(--font-dm)",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {[
          { key: "name", label: "Full Name", placeholder: "Your name" },
          { key: "college", label: "College / University", placeholder: "Your institution" },
          { key: "city", label: "City", placeholder: "Your city" },
          { key: "email", label: "Email Address", placeholder: "you@email.com" },
          { key: "instagram", label: "Instagram Handle", placeholder: "@yourhandle" },
        ].map(({ key, label, placeholder }) => (
          <div key={key} style={key === "instagram" ? {} : {}}>
            <label style={labelStyle}>{label}</label>
            <input
              type={key === "email" ? "email" : "text"}
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              style={inputStyle}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "#f5c542";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.2)";
              }}
              required
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "28px" }}>
        <label style={labelStyle}>Why do you want to join?</label>
        <textarea
          placeholder="Tell us about your love for travel, your network, and what you'd bring as an ambassador..."
          value={form.why}
          onChange={(e) => setForm({ ...form, why: e.target.value })}
          rows={4}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: "100px",
          }}
          onFocus={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = "#f5c542";
          }}
          onBlur={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.2)";
          }}
          required
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          padding: "16px",
          background: "#f5c542",
          color: "#0d1b3e",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "var(--font-dm)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        Submit Application
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.button>
    </form>
  );
}

/* ─── MAIN PAGE ─── */
export default function CampusAmbassadorPage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: "#0d1b3e",
          padding: "130px 60px 90px",
          position: "relative",
          overflow: "hidden",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Animated particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -120],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${5 + i * 5}%`,
                width: 4 + Math.random() * 5,
                height: 4 + Math.random() * 5,
                borderRadius: "50%",
                background: "#f5c542",
              }}
            />
          ))}

          {/* Radial glows */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,197,66,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(245,197,66,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,66,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="gold-shimmer-text"
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "22px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Travel. Earn. Lead.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(38px, 5vw, 68px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.08,
              marginBottom: "22px",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            Become a{" "}
            <span style={{ color: "#f5c542" }}>Campus Ambassador</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: "40px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Represent Trip to Tackle on your campus. Organize group trips, earn real commissions,
            and unlock exclusive travel perks — all while building real-world experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32 }}
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#apply"
              style={{
                background: "#f5c542",
                color: "#0d1b3e",
                padding: "14px 32px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#d4a820";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#f5c542";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Apply Now — It&apos;s Free
            </a>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
              }}
            >
              Ask Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div
        style={{
          background: "#f5c542",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {[
          { n: "200+", l: "Active Ambassadors" },
          { n: "35+", l: "Colleges Covered" },
          { n: "₹2.4L+", l: "Commissions Paid" },
          { n: "4.8★", l: "Ambassador Rating" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: "22px 20px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(0,0,0,0.1)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "28px",
                fontWeight: 700,
                color: "#0d1b3e",
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "rgba(13,27,62,0.65)",
                fontWeight: 500,
                marginTop: "2px",
                fontFamily: "var(--font-dm)",
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* ── BENEFITS ── */}
      <section style={{ background: "#f7f6f2", padding: "88px 60px" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span
              style={{
                display: "block",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#0d1b3e",
                marginBottom: "10px",
                fontFamily: "var(--font-dm)",
              }}
            >
              What You Get
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "44px",
                color: "#0d1b3e",
                fontWeight: 700,
              }}
            >
              Built to Reward You
            </h2>
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="benefit-card"
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "32px 26px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Highlight tag */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(245,197,66,0.15)",
                  color: "#d4a820",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontFamily: "var(--font-dm)",
                  letterSpacing: "0.5px",
                }}
              >
                {b.highlight}
              </div>
              <div style={{ fontSize: "36px", marginBottom: "18px" }}>{b.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "19px",
                  color: "#0d1b3e",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  color: "#777",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-dm)",
                }}
              >
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#fff", padding: "88px 60px" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span
              style={{
                display: "block",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#f5c542",
                marginBottom: "10px",
                fontFamily: "var(--font-dm)",
              }}
            >
              The Process
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "44px",
                color: "#0d1b3e",
                fontWeight: 700,
              }}
            >
              How It Works
            </h2>
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {howItWorks.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "18px",
                  background: "#0d1b3e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  margin: "0 auto 18px",
                  position: "relative",
                }}
              >
                {s.icon}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "26px",
                    height: "26px",
                    background: "#f5c542",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#0d1b3e",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {s.n}
                </div>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "20px",
                  color: "#0d1b3e",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  color: "#777",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-dm)",
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHO WE LOOK FOR ── */}
      <section style={{ background: "#0d1b3e", padding: "80px 60px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#f5c542",
                  marginBottom: "10px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                The Right Fit
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "44px",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Who We&apos;re Looking For
              </h2>
              <p
                style={{
                  color: "#8fa0c0",
                  fontSize: "16px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                No experience needed. Just passion, hustle, and a love for travel.
              </p>
            </div>
          </FadeSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {requirements.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                }}
              >
                <div style={{ fontSize: "24px", flexShrink: 0 }}>{r.icon}</div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "14px",
                    fontFamily: "var(--font-dm)",
                    fontWeight: 500,
                  }}
                >
                  {r.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT AMBASSADORS ── */}
      <section style={{ background: "#f7f6f2", padding: "88px 60px" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <span
              style={{
                display: "block",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#0d1b3e",
                marginBottom: "10px",
                fontFamily: "var(--font-dm)",
              }}
            >
              Hear from Our Ambassadors
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "44px",
                color: "#0d1b3e",
                fontWeight: 700,
              }}
            >
              Real People, Real Results
            </h2>
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {currentAmbassadors.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="benefit-card"
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "26px 22px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ color: "#f5c542", fontSize: "13px", letterSpacing: "2px", marginBottom: "12px" }}>
                ★★★★★
              </div>
              <p
                style={{
                  color: "#555",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                  fontFamily: "var(--font-dm)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{a.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <img
                    src={a.img}
                    alt={a.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      color: "#0d1b3e",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {a.name}
                  </div>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "12px",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {a.college}
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "14px",
                  background: "rgba(245,197,66,0.12)",
                  color: "#d4a820",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  display: "inline-block",
                  fontFamily: "var(--font-dm)",
                }}
              >
                🏆 {a.earned}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── APPLY FORM ── */}
      <section
        id="apply"
        style={{
          background: "linear-gradient(135deg, #0d1b3e 0%, #162040 50%, #060e20 100%)",
          padding: "88px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(245,197,66,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#f5c542",
                  marginBottom: "10px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Ready to Start?
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "42px",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Apply to Become an Ambassador
              </h2>
              <p
                style={{
                  color: "#8fa0c0",
                  fontSize: "15px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Takes 2 minutes. We&apos;ll respond within 48 hours.
              </p>
            </div>
          </FadeSection>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <ApplyForm />
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section
        style={{
          background: "#f5c542",
          padding: "64px 60px",
          textAlign: "center",
        }}
      >
        <FadeSection>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "38px",
              color: "#0d1b3e",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Ready to Lead Your Campus?
          </h2>
          <p
            style={{
              color: "rgba(13,27,62,0.7)",
              fontSize: "16px",
              marginBottom: "28px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Questions? We&apos;re always available on WhatsApp.
          </p>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0d1b3e",
              color: "#fff",
              padding: "14px 34px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-dm)",
            }}
          >
            💬 Chat on WhatsApp
          </a>
        </FadeSection>
      </section>

      <Footer />
    </>
  );
}
