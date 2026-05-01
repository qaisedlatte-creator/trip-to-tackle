"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";

const comingSoonTopics = [
  {
    icon: "🗺️",
    label: "Destination Guides",
    desc: "Deep-dives on the best places to visit — from hidden Kerala gems to Bali on a budget.",
  },
  {
    icon: "💡",
    label: "Travel Tips",
    desc: "Packing guides, visa hacks, group travel advice, and everything in between.",
  },
  {
    icon: "👥",
    label: "Group Trip Stories",
    desc: "Real stories from our travellers — the moments, memories, and mishaps.",
  },
];

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #141414 60%, #0A0A0A 100%)",
          padding: "120px 60px 80px",
          position: "relative",
          overflow: "hidden",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
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
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "14px",
              fontFamily: "var(--font-body)",
            }}
          >
            Insights &amp; Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(34px, 5vw, 54px)",
              color: "#fff",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            The Trip 2 Tackle Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "16px",
              maxWidth: "460px",
              lineHeight: 1.6,
              fontFamily: "var(--font-body)",
            }}
          >
            Travel tips, destination guides, and real stories from the road.
          </motion.p>
        </div>
      </section>

      {/* Coming soon body */}
      <section style={{ background: "#fff", padding: "88px 60px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ maxWidth: "560px", margin: "0 auto" }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>📝</div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#1A1A1A",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            Our Blog is Coming Soon
          </h2>
          <p
            style={{
              color: "#9E9A94",
              fontSize: "16px",
              lineHeight: 1.75,
              marginBottom: "36px",
              fontFamily: "var(--font-body)",
            }}
          >
            We&apos;re crafting travel stories, trip guides, and insider tips. Subscribe below to be the first to know when we go live.
          </p>

          {/* Subscribe form */}
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "#F3F2F0",
                border: "1px solid #E8E4DD",
                borderRadius: "14px",
                padding: "28px 32px",
                color: "#1A1A1A",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎉</div>
              <p style={{ fontWeight: 600, fontSize: "16px", fontFamily: "var(--font-body)" }}>
                You&apos;re on the list! We&apos;ll notify you when we launch.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
                maxWidth: "440px",
                margin: "0 auto",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "13px 16px",
                  border: "1.5px solid #E8E4DD",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "var(--font-body)",
                  color: "#1A1A1A",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#F97316"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E8E4DD"; }}
              />
              <button
                type="submit"
                style={{
                  background: "#F97316",
                  color: "#fff",
                  padding: "13px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#E86C0A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F97316"; }}
              >
                Notify Me
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* What's coming */}
      <section style={{ background: "#F3F2F0", padding: "72px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
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
            Coming Soon
          </span>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 3vw, 32px)",
              color: "#1A1A1A",
              fontWeight: 600,
            }}
          >
            What to Expect
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          {comingSoonTopics.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                border: "1px solid #E8E4DD",
              }}
            >
              <div
                style={{
                  height: "120px",
                  background: "linear-gradient(135deg, #0A0A0A 0%, #141414 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                }}
              >
                {t.icon}
              </div>
              <div style={{ padding: "20px 22px" }}>
                <h4
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "17px",
                    color: "#1A1A1A",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  {t.label}
                </h4>
                <p
                  style={{
                    color: "#9E9A94",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: "#0A0A0A", padding: "60px", textAlign: "center" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "30px",
            color: "#fff",
            marginBottom: "12px",
            fontWeight: 600,
          }}
        >
          Want Travel Tips Now?
        </h3>
        <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontSize: "15px", fontFamily: "var(--font-body)" }}>
          Follow us on Instagram or chat with us on WhatsApp for daily travel inspo.
        </p>
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#F97316",
            color: "#fff",
            padding: "13px 30px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#E86C0A"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F97316"; }}
        >
          💬 WhatsApp Us
        </a>
      </div>

      <Footer />
    </>
  );
}

