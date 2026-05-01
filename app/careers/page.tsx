"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    icon: "🌍",
    title: "Adventure-First Culture",
    desc: "We live what we sell. Team trips, offsite retreats, and travel perks are baked into our DNA.",
  },
  {
    icon: "🤝",
    title: "People Over Metrics",
    desc: "We build real relationships — with travellers and with each other. No burnout culture here.",
  },
  {
    icon: "⚡",
    title: "Move Fast, Stay Human",
    desc: "We're a lean team that ships quickly. Big ideas are welcome and acted on, not put in a queue.",
  },
  {
    icon: "🌱",
    title: "Grow With Us",
    desc: "We're scaling fast. Join early and grow into leadership as we expand across India and the GCC.",
  },
];

const perks = [
  "✈️ Annual travel allowance + team trip",
  "🏠 Flexible remote-first work model",
  "📈 Performance bonuses & clear growth path",
  "🌴 Generous paid leave (including your birthday!)",
  "📚 Learning budget for courses & events",
  "💬 Direct access to founders from day one",
];

const roles = [
  {
    role: "Travel Sales Executive",
    dept: "Sales",
    type: "Full-time",
    loc: "Kochi / Remote",
    desc: "Convert warm leads into confirmed bookings. Own the client relationship from first call to departure.",
  },
  {
    role: "Social Media & Content Lead",
    dept: "Marketing",
    type: "Full-time",
    loc: "Remote",
    desc: "Build our voice across Instagram, YouTube, and more. Storytelling + strategy in equal parts.",
  },
  {
    role: "Tour Coordinator",
    dept: "Operations",
    type: "Full-time",
    loc: "Kochi",
    desc: "Orchestrate seamless group departures. You're the reason every trip runs like clockwork.",
  },
  {
    role: "Customer Experience Executive",
    dept: "Support",
    type: "Part-time",
    loc: "Remote",
    desc: "Be the calm, knowledgeable voice when travellers have questions — before, during, and after.",
  },
];

const teamPhotos = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=85",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=85",
];

/* ─── SECTION WRAPPER ─── */
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

export default function CareersPage() {
  const rolesRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: "#0d1b3e",
          padding: "120px 60px 80px",
          position: "relative",
          overflow: "hidden",
          minHeight: "480px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "rgba(245,197,66,0.04)",
            border: "1px solid rgba(245,197,66,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "20px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(245,197,66,0.06)",
          }}
        />
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,197,66,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,66,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "640px" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#f5c542",
              marginBottom: "20px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Join Our Team
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(40px, 5vw, 62px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "22px",
            }}
          >
            Work Where{" "}
            <span style={{ color: "#f5c542" }}>Travel is the Job</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: "#8fa0c0",
              fontSize: "17px",
              lineHeight: 1.7,
              marginBottom: "38px",
              fontFamily: "var(--font-dm)",
              fontWeight: 300,
            }}
          >
            We&apos;re a small but mighty travel company building something special. If
            you&apos;re obsessed with travel, people, and great experiences — let&apos;s talk.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={() => rolesRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#f5c542",
              color: "#0d1b3e",
              padding: "14px 32px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "15px",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-dm)",
              transition: "background 0.2s, transform 0.2s",
            }}
            whileHover={{ scale: 1.03, backgroundColor: "#d4a820" }}
            whileTap={{ scale: 0.98 }}
          >
            See Open Roles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          height: "240px",
          overflow: "hidden",
        }}
      >
        {teamPhotos.map((src, i) => (
          <div
            key={i}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Image
              src={src}
              alt={`Team photo ${i + 1}`}
              fill
              style={{ objectFit: "cover", filter: "brightness(0.75)" }}
              sizes="33vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(13,27,62,0.6) 0%, transparent 60%)",
              }}
            />
            {i === 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "20px",
                  color: "#f5c542",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Life at Trip to Tackle
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── VALUES ── */}
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
              Our Culture
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "44px",
                color: "#0d1b3e",
                fontWeight: 700,
              }}
            >
              Why People Love Working Here
            </h2>
          </div>
        </FadeSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "28px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="benefit-card"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "32px 28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{v.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "19px",
                  color: "#0d1b3e",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  color: "#777",
                  fontSize: "13.5px",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-dm)",
                }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PERKS ── */}
      <section style={{ background: "#0d1b3e", padding: "80px 60px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <FadeSection>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#f5c542",
                marginBottom: "16px",
                fontFamily: "var(--font-dm)",
              }}
            >
              Perks &amp; Benefits
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "40px",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "32px",
                lineHeight: 1.2,
              }}
            >
              Built for People Who Love to Travel
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "15px",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#f5c542",
                      flexShrink: 0,
                    }}
                  />
                  {p}
                </motion.div>
              ))}
            </div>
          </FadeSection>

          <FadeSection delay={0.15}>
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                height: "400px",
                position: "relative",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85"
                alt="Team culture"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(13,27,62,0.5) 0%, transparent 60%)",
                }}
              />
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section
        ref={rolesRef}
        style={{ background: "#fff", padding: "80px 60px" }}
      >
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
              Come Aboard
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "44px",
                color: "#0d1b3e",
                fontWeight: 700,
              }}
            >
              Open Positions
            </h2>
            <p
              style={{
                color: "#888",
                marginTop: "10px",
                fontSize: "15px",
                fontFamily: "var(--font-dm)",
              }}
            >
              Don&apos;t see a role? Send your CV anyway — we&apos;re always looking for great people.
            </p>
          </div>
        </FadeSection>

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {roles.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="role-card"
              style={{
                background: i % 2 === 0 ? "#f7f6f2" : "#fff",
                borderRadius: "14px",
                padding: "24px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #e8e8e8",
                cursor: "pointer",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#0d1b3e",
                    marginBottom: "6px",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {r.role}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    marginBottom: "10px",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {r.desc}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[r.dept, r.type, r.loc].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "12px",
                        color: "#777",
                        background: "rgba(13,27,62,0.07)",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontFamily: "var(--font-dm)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#0d1b3e",
                  color: "#fff",
                  padding: "10px 22px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm)",
                  whiteSpace: "nowrap",
                  marginLeft: "24px",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                Apply Now
              </motion.button>
            </motion.div>
          ))}

          {/* Send CV card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              marginTop: "8px",
              background: "#0d1b3e",
              borderRadius: "16px",
              padding: "36px 40px",
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
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "6px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Don&apos;t see your perfect role?
              </h4>
              <p
                style={{
                  color: "#8fa0c0",
                  fontSize: "13px",
                  fontFamily: "var(--font-dm)",
                }}
              >
                Drop us your CV and a note about what excites you.
              </p>
            </div>
            <a
              href="mailto:careers@triptotackle.com"
              style={{
                background: "#f5c542",
                color: "#0d1b3e",
                padding: "12px 26px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-dm)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#d4a820";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#f5c542";
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
            Ready to Build Something Great?
          </h2>
          <p
            style={{
              color: "rgba(13,27,62,0.7)",
              fontSize: "16px",
              marginBottom: "28px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Also check out our{" "}
            <Link
              href="/campus-ambassador"
              style={{
                color: "#0d1b3e",
                fontWeight: 700,
                textDecoration: "underline",
              }}
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
            💬 Talk to Us on WhatsApp
          </a>
        </FadeSection>
      </section>

      <Footer />
    </>
  );
}
