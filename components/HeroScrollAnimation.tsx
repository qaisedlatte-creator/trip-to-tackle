"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 40;
const DESKTOP_FOLDER = "/frames";
const MOBILE_FOLDER = "/frames-mobile";
const MOBILE_BREAKPOINT = 768;

/** Returns zero-padded 3-digit frame filename, e.g. frame 1 → "001" */
function pad(n: number): string {
  return String(n).padStart(3, "0");
}

export default function HeroScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Easing — 0.12 gives silky smooth lag-free scrubbing
  const EASING = 0.12;

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Preload all frames when device type changes ── */
  useEffect(() => {
    let mounted = true;
    setIsLoaded(false);
    framesRef.current = [];
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;

    const folder = isMobile ? MOBILE_FOLDER : DESKTOP_FOLDER;
    const promises: Promise<HTMLImageElement>[] = Array.from(
      { length: TOTAL_FRAMES },
      (_, i) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Frame ${i + 1} failed`));
          img.src = `${folder}/ezgif-frame-${pad(i + 1)}.jpg`;
        })
    );

    Promise.all(promises)
      .then((imgs) => {
        if (!mounted) return;
        framesRef.current = imgs;
        setIsLoaded(true);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, [isMobile]);

  /* ── Scroll progress (0 → 1) through sticky container ── */
  const getProgress = useCallback((): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.max(0, Math.min(1, -rect.top / scrollable));
  }, []);

  /* ── Draw one frame to canvas ──
     Scale up by CROP_FACTOR to push Veo watermark (bottom-right corner)
     off-screen. Cover fill keeps image full-bleed.
  ── */
  const CROP_FACTOR = 1.1; // 10% zoom removes bottom-right watermark cleanly

  const drawFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      cw: number,
      ch: number
    ) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      // Cover-fill math
      let dw: number, dh: number;
      if (imgRatio > canvasRatio) {
        dh = ch;
        dw = imgRatio * ch;
      } else {
        dw = cw;
        dh = cw / imgRatio;
      }

      // Apply crop-zoom to eliminate watermark
      dw *= CROP_FACTOR;
      dh *= CROP_FACTOR;

      const ox = (cw - dw) / 2;
      const oy = (ch - dh) / 2;

      ctx.drawImage(img, ox, oy, dw, dh);
    },
    []
  );

  /* ── Render current frame to canvas ── */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || framesRef.current.length === 0) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true, // lower-latency for scroll sync
    });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    const idx = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
    );
    drawFrame(ctx, framesRef.current[idx], cw, ch);
  }, [isLoaded, drawFrame]);

  /* ── RAF animation loop ── */
  const animate = useCallback(() => {
    targetFrameRef.current = getProgress() * (TOTAL_FRAMES - 1);
    currentFrameRef.current +=
      (targetFrameRef.current - currentFrameRef.current) * EASING;
    render();
    rafRef.current = requestAnimationFrame(animate);
  }, [getProgress, render]);

  /* ── Handle resize: set canvas pixel dimensions ── */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
  }, []);

  /* ── Init ── */
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleResize, animate]);

  return (
    /*
      Outer container: 500vh gives ~5 viewport-heights of scroll travel
      for a fluid, cinematic frame playback experience.
    */
    <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
      {/* Sticky viewport — stays pinned while scrolling through outer */}
      <div
        className="sticky top-0 w-full overflow-hidden bg-[#060e20]"
        style={{ height: "100vh" }}
      >
        {/* Canvas: renders frames at native device resolution */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ imageRendering: "auto" }}
        />

        {/* Gradient overlay: readability top + seamless blend into navy bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,14,32,0.35) 0%, rgba(10,20,50,0.1) 35%, rgba(10,20,50,0.25) 70%, rgba(13,27,62,0.98) 100%)",
            zIndex: 1,
          }}
        />

        {/* Loading screen */}
        {!isLoaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ background: "#060e20" }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "2px solid rgba(245,197,66,0.2)",
                borderTop: "2px solid #f5c542",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                marginBottom: "16px",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "var(--font-dm)",
              }}
            >
              Loading
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Hero text content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-700`}
          style={{
            zIndex: 10,
            opacity: isLoaded ? 1 : 0,
          }}
        >
          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#f5c542",
              marginBottom: "20px",
              fontFamily: "var(--font-dm)",
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Live Group Departures · India &amp; Beyond
          </motion.span>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(52px, 7vw, 100px)",
              fontWeight: 900,
              lineHeight: 1.02,
              color: "#fff",
              textShadow: "0 4px 40px rgba(0,0,0,0.65)",
              marginBottom: "20px",
            }}
          >
            Trip to{" "}
            <span className="gold-shimmer-text">Tackle</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontSize: "clamp(15px, 2vw, 20px)",
              color: "rgba(255,255,255,0.88)",
              fontWeight: 300,
              maxWidth: "520px",
              lineHeight: 1.6,
              marginBottom: "8px",
              fontFamily: "var(--font-dm)",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            Discover Your Next Adventure with Us 🌍
          </motion.p>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "42px",
              fontFamily: "var(--font-dm)",
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            Affordable &amp; Personalized Travel Plans ✈️ · Let&apos;s wander together! 🗺️
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/#packages"
              style={{
                background: "#f5c542",
                color: "#0d1b3e",
                padding: "14px 32px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 24px rgba(245,197,66,0.35)",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
                fontFamily: "var(--font-dm)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#d4a820";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 32px rgba(245,197,66,0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#f5c542";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 24px rgba(245,197,66,0.35)";
              }}
            >
              Explore Packages
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

            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                backdropFilter: "blur(10px)",
                transition: "background 0.2s, border-color 0.2s",
                fontFamily: "var(--font-dm)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.16)";
                el.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              Chat with Us
            </a>
          </motion.div>
        </div>

        {/* Scroll hint — bouncing arrow */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            color: "rgba(255,255,255,0.5)",
            zIndex: 10,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.7s",
            animation: "bounce-y 2s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm)",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            Scroll
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
