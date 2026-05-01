"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 40;
const DESKTOP_FOLDER = "/frames";
const MOBILE_FOLDER = "/frames-mobile";
const MOBILE_BREAKPOINT = 768;
const CROP = 1.08; // zoom 8% — cleanly removes Veo watermark from corners

function pad(n: number) {
  return String(n).padStart(3, "0");
}

export default function HeroScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Store ImageBitmap[] for GPU-accelerated, zero-copy blitting
  const bitmapsRef = useRef<ImageBitmap[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number>(0);
  const needsDrawRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ── Mobile detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Preload frames as ImageBitmap (GPU-decoded, hardware-accelerated) ── */
  useEffect(() => {
    let mounted = true;
    setIsLoaded(false);
    // Revoke old bitmaps to free GPU memory
    bitmapsRef.current.forEach((b) => b.close());
    bitmapsRef.current = [];
    lastFrameRef.current = -1;

    const folder = isMobile ? MOBILE_FOLDER : DESKTOP_FOLDER;

    const loadAll = async () => {
      const bitmaps: ImageBitmap[] = new Array(TOTAL_FRAMES);

      // Fetch + decode in parallel — browser decodes directly to GPU texture
      await Promise.all(
        Array.from({ length: TOTAL_FRAMES }, async (_, i) => {
          const res = await fetch(`${folder}/ezgif-frame-${pad(i + 1)}.jpg`);
          const blob = await res.blob();
          // createImageBitmap decodes JPEG once, stores on GPU memory
          // premultiplyAlpha: 'none' prevents quality loss on non-alpha images
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

  /* ── Canvas setup — called once + on resize ── */
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
      desynchronized: true,   // compositor-thread sync, lowest latency
      willReadFrequently: false,
    });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctxRef.current = ctx;
    needsDrawRef.current = true; // force redraw after resize
  }, []);

  /* ── Draw a single bitmap frame — cover-fill + crop for watermark ── */
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
    // Cover: fill whole canvas, cropping excess
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

  /* ── Compute target frame from scroll position ── */
  const getTargetFrame = useCallback((): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    return Math.round(progress * (TOTAL_FRAMES - 1));
  }, []);

  /* ── RAF loop: only redraws when frame actually changes ── */
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

  /* ── Init ── */
  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setupCanvas, tick]);

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
          background: "#060e20",
        }}
      >
        {/* Canvas — drawn at full devicePixelRatio for 4K sharpness */}
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

        {/*
          Gradient overlay:
          - Subtle dark at top → transparent mid → deep navy at bottom
          - Lets the frame breathe in the middle, melts into stats bar at bottom
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg," +
              "rgba(6,14,32,0.28) 0%," +
              "rgba(0,0,0,0) 18%," +
              "rgba(0,0,0,0) 60%," +
              "rgba(13,27,62,0.92) 88%," +
              "rgba(13,27,62,1) 100%)",
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
              background: "#060e20",
              zIndex: 20,
            }}
          >
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid rgba(245,197,66,0.15)",
                borderTop: "2px solid #f5c542",
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
                fontFamily: "var(--font-dm)",
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
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#f5c542",
              marginBottom: 20,
              fontFamily: "var(--font-dm)",
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
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(52px, 7vw, 100px)",
              fontWeight: 900,
              lineHeight: 1.02,
              color: "#fff",
              textShadow: "0 4px 48px rgba(0,0,0,0.7)",
              marginBottom: 20,
            }}
          >
            Trip to{" "}
            <span className="gold-shimmer-text">Tackle</span>
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
              fontFamily: "var(--font-dm)",
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
              fontFamily: "var(--font-dm)",
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
                background: "#f5c542",
                color: "#0d1b3e",
                padding: "14px 32px",
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 28px rgba(245,197,66,0.4)",
                transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
                fontFamily: "var(--font-dm)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#d4a820";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 36px rgba(245,197,66,0.55)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#f5c542";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 28px rgba(245,197,66,0.4)";
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
                fontFamily: "var(--font-dm)",
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
              fontFamily: "var(--font-dm)",
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
