"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 40;
const DESKTOP_FOLDER = "/frames";
const MOBILE_BREAKPOINT = 768;
const CROP = 1.08; // zoom 8% — cleanly removes watermark from corners

function pad(n: number) {
  return String(n).padStart(3, "0");
}

/* ── STATIC MOBILE HERO ── */
function MobileHero() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #0A0A0A 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="Kashmir mountains"
        fill
        style={{ objectFit: "cover", opacity: 0.35 }}
        priority
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 28px",
          maxWidth: "480px",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 18,
            fontFamily: "var(--font-body)",
            textShadow: "0 1px 8px rgba(0,0,0,0.7)",
          }}
        >
          Live Group Departures · India &amp; Beyond
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(44px, 10vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.02,
            color: "#fff",
            textShadow: "0 4px 48px rgba(0,0,0,0.7)",
            marginBottom: 16,
          }}
        >
          Trip to{" "}
          <span style={{ color: "#FFFFFF" }}>Tackle</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontSize: "clamp(15px, 4vw, 18px)",
            color: "rgba(255,255,255,0.88)",
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: 8,
            fontFamily: "var(--font-body)",
            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
          }}
        >
          Discover Your Next Adventure with Us 🌍
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 36,
            fontFamily: "var(--font-body)",
            textShadow: "0 1px 8px rgba(0,0,0,0.6)",
          }}
        >
          Affordable &amp; Personalized Travel Plans ✈️
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link
            href="/#packages"
            style={{
              background: "#F97316",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 28px rgba(249,115,22,0.4)",
              fontFamily: "var(--font-body)",
            }}
          >
            Explore Packages
          </Link>

          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: "#fff",
              padding: "13px 24px",
              borderRadius: 100,
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-body)",
            }}
          >
            Chat with Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/* ── DESKTOP CANVAS HERO ── */
export default function HeroScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bitmapsRef = useRef<ImageBitmap[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number>(0);
  const needsDrawRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  /* ── Mobile detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Preload frames (desktop only) ── */
  useEffect(() => {
    if (isMobile !== false) return; // wait until we know it's desktop
    let mounted = true;
    setIsLoaded(false);
    bitmapsRef.current.forEach((b) => b.close());
    bitmapsRef.current = [];
    lastFrameRef.current = -1;

    const loadAll = async () => {
      const bitmaps: ImageBitmap[] = new Array(TOTAL_FRAMES);
      await Promise.all(
        Array.from({ length: TOTAL_FRAMES }, async (_, i) => {
          const res = await fetch(`${DESKTOP_FOLDER}/ezgif-frame-${pad(i + 1)}.jpg`);
          const blob = await res.blob();
          bitmaps[i] = await createImageBitmap(blob, {
            resizeQuality: "high",
            premultiplyAlpha: "none",
            colorSpaceConversion: "default",
          });
        })
      );
      if (!mounted) {
        bitmaps.forEach((b) => b.close());
        return;
      }
      bitmapsRef.current = bitmaps;
      setIsLoaded(true);
    };

    loadAll().catch(console.error);
    return () => {
      mounted = false;
    };
  }, [isMobile]);

  /* ── Canvas setup ── */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctxRef.current = ctx;
    needsDrawRef.current = true;
  }, []);

  /* ── Draw frame ── */
  const drawBitmap = useCallback((idx: number) => {
    const ctx = ctxRef.current;
    const bitmaps = bitmapsRef.current;
    if (!ctx || !bitmaps[idx]) return;

    const bm = bitmaps[idx];
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const imgRatio = bm.width / bm.height;
    const canvasRatio = cw / ch;

    let dw: number, dh: number;
    if (imgRatio > canvasRatio) {
      dh = ch * CROP;
      dw = imgRatio * dh;
    } else {
      dw = cw * CROP;
      dh = dw / imgRatio;
    }
    const ox = (cw - dw) / 2;
    const oy = (ch - dh) / 2;

    ctx.drawImage(bm, ox, oy, dw, dh);
  }, []);

  /* ── Compute target frame ── */
  const getTargetFrame = useCallback((): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    return Math.round(progress * (TOTAL_FRAMES - 1));
  }, []);

  /* ── RAF loop ── */
  const tick = useCallback(() => {
    if (isLoaded && bitmapsRef.current.length > 0) {
      const target = getTargetFrame();
      if (target !== lastFrameRef.current || needsDrawRef.current) {
        lastFrameRef.current = target;
        needsDrawRef.current = false;
        drawBitmap(target);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [isLoaded, getTargetFrame, drawBitmap]);

  /* ── Init canvas (desktop only) ── */
  useEffect(() => {
    if (isMobile !== false) return;
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setupCanvas, tick, isMobile]);

  /* ── SSR / hydration guard ── */
  if (isMobile === null) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#0A0A0A",
        }}
      />
    );
  }

  /* ── Mobile: static hero ── */
  if (isMobile) {
    return <MobileHero />;
  }

  /* ── Desktop: scroll-driven canvas animation ── */
  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "500vh" }}>
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#0A0A0A",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg," +
              "rgba(0,0,0,0.38) 0%," +
              "rgba(0,0,0,0.18) 30%," +
              "rgba(0,0,0,0.18) 65%," +
              "rgba(0,0,0,0.42) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Loading state */}
        {!isLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#0A0A0A",
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid rgba(249,115,22,0.15)",
                borderTop: "2px solid #F97316",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
                marginBottom: 14,
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
              }}
            >
              Loading
            </span>
          </div>
        )}

        {/* Hero text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 40px",
            zIndex: 10,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 20,
              fontFamily: "var(--font-body)",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}
          >
            Live Group Departures · India &amp; Beyond
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(52px, 7vw, 100px)",
              fontWeight: 700,
              lineHeight: 1.02,
              color: "#fff",
              textShadow: "0 4px 48px rgba(0,0,0,0.7)",
              marginBottom: 20,
            }}
          >
            Trip to{" "}
            <span style={{ color: "#FFFFFF" }}>Tackle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontSize: "clamp(15px, 2vw, 20px)",
              color: "rgba(255,255,255,0.88)",
              fontWeight: 300,
              maxWidth: 520,
              lineHeight: 1.6,
              marginBottom: 8,
              fontFamily: "var(--font-body)",
              textShadow: "0 2px 14px rgba(0,0,0,0.6)",
            }}
          >
            Discover Your Next Adventure with Us 🌍
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 42,
              fontFamily: "var(--font-body)",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Affordable &amp; Personalized Travel Plans ✈️ · Let&apos;s wander together! 🗺️
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              href="/#packages"
              style={{
                background: "#F97316",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 28px rgba(249,115,22,0.4)",
                transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#E86C0A";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 36px rgba(249,115,22,0.55)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#F97316";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 28px rgba(249,115,22,0.4)";
              }}
            >
              Explore Packages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                backdropFilter: "blur(12px)",
                transition: "background 0.2s, border-color 0.2s",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.16)";
                el.style.borderColor = "rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.07)";
                el.style.borderColor = "rgba(255,255,255,0.35)";
              }}
            >
              Chat with Us
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            color: "rgba(255,255,255,0.5)",
            zIndex: 10,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.8s ease",
            animation: "bounce-y 2s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              textShadow: "0 1px 6px rgba(0,0,0,0.7)",
            }}
          >
            Scroll
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
