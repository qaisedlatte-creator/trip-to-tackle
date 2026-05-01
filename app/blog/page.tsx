"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    tag: "Travel Tips",
    date: "April 28, 2026",
    title: "10 Hidden Gems in Kerala You Must Visit This Monsoon",
    excerpt:
      "From misty hilltop villages to ancient temple trails — Kerala's monsoon season is underrated and magical.",
    featured: true,
    readTime: "6 min read",
    imgColor: "#1a3060",
  },
  {
    tag: "Destinations",
    date: "April 22, 2026",
    title: "Why Bali Is Still the World's Best Value Honeymoon Destination",
    excerpt:
      "Despite growing popularity, Bali delivers luxury experiences at a fraction of European costs.",
    featured: false,
    readTime: "5 min read",
    imgColor: "#0e2a3a",
  },
  {
    tag: "Packing Guide",
    date: "April 18, 2026",
    title: "The Ultimate Carry-On Packing List for Southeast Asia",
    excerpt:
      "Lightweight, versatile and ready for anything — here's what actually makes it into our bags.",
    featured: false,
    readTime: "4 min read",
    imgColor: "#1a2a1a",
  },
  {
    tag: "Budget Travel",
    date: "April 14, 2026",
    title: "How to Do a 10-Day India Trip Under ₹25,000",
    excerpt:
      "Real numbers, real routes — we break down exactly what you spend and where to save.",
    featured: false,
    readTime: "7 min read",
    imgColor: "#2a1a0a",
  },
  {
    tag: "Adventure",
    date: "April 10, 2026",
    title: "Sar Pass Trek: A Complete Beginner's Guide",
    excerpt:
      "Everything you need to know before your first Himalayan high-altitude trek, from gear to guides.",
    featured: false,
    readTime: "8 min read",
    imgColor: "#0a1a2a",
  },
  {
    tag: "Family Travel",
    date: "April 5, 2026",
    title: "Singapore with Kids: 7 Days, Zero Stress",
    excerpt:
      "Universal Studios, Gardens by the Bay, and a city that just works — here's how we planned it.",
    featured: false,
    readTime: "5 min read",
    imgColor: "#1a0a2a",
  },
];

const tagColors: Record<string, string> = {
  "Travel Tips": "#f5c542",
  Destinations: "#4ade80",
  "Packing Guide": "#60a5fa",
  "Budget Travel": "#f87171",
  Adventure: "#fb923c",
  "Family Travel": "#a78bfa",
};

function TagBadge({ tag, dark = false }: { tag: string; dark?: boolean }) {
  const color = tagColors[tag] || "#f5c542";
  return (
    <span
      style={{
        background: dark ? `${color}20` : color,
        color: dark ? color : "#0d1b3e",
        fontSize: "10px",
        fontWeight: 700,
        padding: "4px 12px",
        borderRadius: "20px",
        fontFamily: "var(--font-dm)",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {tag}
    </span>
  );
}

function PlaceholderImg({ color, height }: { color: string; height: number }) {
  return (
    <div
      style={{
        height,
        background: `linear-gradient(135deg, ${color} 0%, #0d1b3e 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(245,197,66,0.08) 0%, transparent 60%)",
        }}
      />
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </div>
  );
}

export default function BlogPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />

      {/* Header */}
      <div
        style={{
          background: "#0d1b3e",
          padding: "110px 60px 52px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,197,66,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,66,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        <div ref={headerRef} style={{ position: "relative", zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "block",
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#f5c542",
              marginBottom: "14px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Insights &amp; Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(34px, 5vw, 54px)",
              color: "#fff",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            The Trip to Tackle Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            style={{
              color: "#8fa0c0",
              fontSize: "16px",
              maxWidth: "480px",
              lineHeight: 1.6,
              fontFamily: "var(--font-dm)",
            }}
          >
            Actionable travel tips, destination guides, and real stories from the road.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#f7f6f2", padding: "52px 60px 88px" }}>
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            marginBottom: "48px",
            cursor: "pointer",
          }}
          whileHover={{ y: -4 }}
        >
          <PlaceholderImg color={featured.imgColor} height={400} />
          <div
            style={{
              padding: "44px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "18px",
                alignItems: "center",
              }}
            >
              <TagBadge tag={featured.tag} />
              <span style={{ color: "#aaa", fontSize: "12px", fontFamily: "var(--font-dm)" }}>
                {featured.date} · {featured.readTime}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "28px",
                color: "#0d1b3e",
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: "16px",
              }}
            >
              {featured.title}
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: "28px",
                fontFamily: "var(--font-dm)",
              }}
            >
              {featured.excerpt}
            </p>
            <Link
              href="#"
              style={{
                color: "#0d1b3e",
                fontWeight: 600,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
              }}
            >
              Read Article
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {rest.map((post, i) => (
            <motion.div
              key={i}
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
              <PlaceholderImg color={post.imgColor} height={180} />
              <div style={{ padding: "20px 22px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <TagBadge tag={post.tag} />
                  <span
                    style={{ color: "#aaa", fontSize: "11px", fontFamily: "var(--font-dm)" }}
                  >
                    {post.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "18px",
                    color: "#0d1b3e",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: "10px",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    marginBottom: "16px",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="#"
                    style={{
                      color: "#0d1b3e",
                      fontWeight: 600,
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      textDecoration: "none",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    Read Article
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#bbb",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          background: "#0d1b3e",
          padding: "64px 60px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "36px",
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          Want More Travel Inspiration?
        </h3>
        <p
          style={{
            color: "#8fa0c0",
            marginBottom: "28px",
            fontSize: "15px",
            fontFamily: "var(--font-dm)",
          }}
        >
          Get trip ideas, packing guides and exclusive deals straight to your WhatsApp.
        </p>
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#f5c542",
            color: "#0d1b3e",
            padding: "13px 32px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
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
          Subscribe to Updates
        </a>
      </div>

      <Footer />
    </>
  );
}
