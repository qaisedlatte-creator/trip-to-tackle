"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Infosys",         accent: "#007CC2", initial: "IN" },
  { name: "TCS",             accent: "#002A6D", initial: "TC" },
  { name: "Wipro",           accent: "#341F6C", initial: "WI" },
  { name: "HDFC Bank",       accent: "#004C8F", initial: "HD" },
  { name: "Cochin Shipyard", accent: "#1E3A5F", initial: "CS" },
  { name: "BPCL",            accent: "#E63329", initial: "BP" },
  { name: "L&T",             accent: "#003087", initial: "LT" },
  { name: "Mphasis",         accent: "#005DAA", initial: "MP" },
];

function LogoPill({ name, accent, initial }: { name: string; accent: string; initial: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "#ffffff",
        border: "1px solid rgba(10,31,68,0.08)",
        borderRadius: "14px",
        padding: "12px 22px",
        boxShadow: "0 2px 12px rgba(10,31,68,0.06)",
        flexShrink: 0,
        minWidth: "160px",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "9px",
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#fff", fontSize: "9px", fontWeight: 800, letterSpacing: "0.5px", fontFamily: "var(--font-body)" }}>
          {initial}
        </span>
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "#0A1F44", letterSpacing: "0.1px" }}>
        {name}
      </span>
    </div>
  );
}

interface LogoCarouselProps {
  label?: string;
  heading?: string;
  dark?: boolean;
}

export default function LogoCarousel({
  label = "Trusted by leading organisations",
  heading,
  dark = false,
}: LogoCarouselProps) {
  const doubled = [...logos, ...logos];

  return (
    <section
      style={{
        overflow: "hidden",
        borderTop: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(10,31,68,0.06)",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(10,31,68,0.06)",
        background: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
        padding: "36px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,0.4)" : "rgba(10,31,68,0.35)",
            marginBottom: heading ? "8px" : "28px",
          }}
        >
          {label}
        </motion.p>

        {heading && (
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              textAlign: "center",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 700,
              color: dark ? "#ffffff" : "#0A1F44",
              marginBottom: "28px",
              lineHeight: 1.2,
            }}
          >
            {heading}
          </motion.h3>
        )}
      </div>

      {/* Marquee track */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          width: "max-content",
          animation: "logo-marquee 28s linear infinite",
          paddingLeft: "14px",
        }}
      >
        {doubled.map((logo, i) => (
          <LogoPill key={i} {...logo} />
        ))}
      </div>
    </section>
  );
}
