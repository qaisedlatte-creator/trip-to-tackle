"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── tunables ───────────────────────────────────────────────────────── */
const DESKTOP_TOTAL  = 250;
const DESKTOP_BATCH  = 8;      // reduced to avoid I/O saturation causing jank

/* Mobile: load 1 frame per 4 → 63 frames, resize to 720 px wide        */
const MOBILE_STRIDE  = 4;
const MOBILE_TOTAL   = Math.ceil(250 / MOBILE_STRIDE); // 63
const MOBILE_BATCH   = 2;      // only 2 concurrent fetches on mobile

const MOBILE_MAX_W   = 720;
const MOBILE_BP      = 768;

/* Zoom-in crop: removes Veo watermark from corners (7 % on all sides)  */
const CROP           = 1.07;

/* Mobile RAF throttle: draw at most once per 33 ms (≈30 fps)           */
const MOBILE_FPS_MS  = 33;
/* ─────────────────────────────────────────────────────────────────────── */

function pad4(n: number) { return String(n).padStart(4, "0"); }

export default function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bitmapsRef   = useRef<(ImageBitmap | null)[]>([]);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef       = useRef<number>(0);
  const needsDrawRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const progressRef  = useRef(0);
  const isReadyRef     = useRef(false);
  const totalRef       = useRef(DESKTOP_TOTAL);
  const lastDrawMsRef  = useRef(0);  // for mobile fps throttle
  const hasCompletedRef= useRef(false); // true after first full play-through

  const textRef          = useRef<HTMLDivElement>(null);
  const hintRef          = useRef<HTMLDivElement>(null);
  const lightRef         = useRef<HTMLDivElement>(null);
  const searchRef        = useRef<HTMLDivElement>(null);
  const destInputRef     = useRef<HTMLInputElement>(null);
  const durationInputRef = useRef<HTMLInputElement>(null);
  const budgetInputRef   = useRef<HTMLInputElement>(null);
  const travelersInputRef= useRef<HTMLInputElement>(null);

  const handleExplore = useCallback(() => {
    const params = new URLSearchParams();
    if (destInputRef.current?.value)       params.set("dest",      destInputRef.current.value);
    if (durationInputRef.current?.value)   params.set("duration",  durationInputRef.current.value);
    if (budgetInputRef.current?.value)     params.set("budget",    budgetInputRef.current.value);
    if (travelersInputRef.current?.value)  params.set("travelers", travelersInputRef.current.value);
    const qs = params.toString();
    window.location.href = `/destinations${qs ? "?" + qs : ""}`;
  }, []);

  const [ready, setReady]       = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  /* ── one-time viewport height (no resize on mobile = no wobble) ── */
  const [stickyH, setStickyH] = useState("100vh");
  useEffect(() => {
    setStickyH(`${window.innerHeight}px`);
    if (isMobile) return;                          // mobile: never re-measure
    const onResize = () => setStickyH(`${window.innerHeight}px`);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [isMobile]);

  /* ── mobile detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BP);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── progressive frame loading ── */
  useEffect(() => {
    if (isMobile === null) return;
    let mounted = true;

    isReadyRef.current = false;
    setReady(false);
    bitmapsRef.current.forEach((b) => b?.close());

    const total    = isMobile ? MOBILE_TOTAL   : DESKTOP_TOTAL;
    const batch    = isMobile ? MOBILE_BATCH   : DESKTOP_BATCH;
    totalRef.current = total;
    bitmapsRef.current = new Array(total).fill(null);
    lastFrameRef.current = -1;

    const folder = isMobile ? "/mobileframes-jpg" : "/pcframes-jpg";

    const loadOne = async (li: number) => {
      try {
        const fileNum = isMobile
          ? Math.min(li * MOBILE_STRIDE + 1, 250)
          : li + 1;
        const res = await fetch(`${folder}/${pad4(fileNum)}.jpg`);
        if (!res.ok || !mounted) return;
        const blob = await res.blob();
        const opts: ImageBitmapOptions = {
          resizeQuality: "medium",
          premultiplyAlpha: "none",
          colorSpaceConversion: "default",
          ...(isMobile ? { resizeWidth: MOBILE_MAX_W } : {}),
        };
        const bm = await createImageBitmap(blob, opts);
        if (!mounted) { bm.close(); return; }
        bitmapsRef.current[li] = bm;
        needsDrawRef.current = true;
      } catch { /* skip */ }
    };

    /* sequential batching — avoids saturating mobile radios */
    const run = async () => {
      for (let start = 0; start < total; start += batch) {
        if (!mounted) return;
        const end = Math.min(start + batch, total);
        await Promise.all(
          Array.from({ length: end - start }, (_, k) => loadOne(start + k))
        );
        if (start === 0) {
          isReadyRef.current = true;
          setReady(true);
        }
        /* give the browser a breath between batches */
        if (start + batch < total) {
          await new Promise((r) => setTimeout(r, isMobile ? 80 : 16));
        }
      }
    };
    run().catch(console.error);
    return () => { mounted = false; };
  }, [isMobile]);

  /* ── canvas setup ── */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width  = Math.round(window.innerWidth  * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    const ctx = canvas.getContext("2d", {
      alpha: false, desynchronized: true, willReadFrequently: false,
    });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobile ? "low" : "high";
    ctxRef.current    = ctx;
    needsDrawRef.current = true;
  }, [isMobile]);

  /* ── draw one bitmap with cover-fit + crop ── */
  const drawBitmap = useCallback((idx: number) => {
    const ctx     = ctxRef.current;
    const bitmaps = bitmapsRef.current;
    let i = Math.min(idx, bitmaps.length - 1);
    while (i > 0 && !bitmaps[i]) i--;
    const bm = bitmaps[i];
    if (!ctx || !bm) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const ir = bm.width / bm.height;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (ir > cr) { dh = ch * CROP; dw = ir * dh; }
    else         { dw = cw * CROP; dh = dw / ir; }
    ctx.drawImage(bm, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  /* ── RAF tick ── */
  const tick = useCallback(() => {
    /* skip drawing while tab is hidden — saves GPU work */
    if (document.hidden) { rafRef.current = requestAnimationFrame(tick); return; }
    if (isReadyRef.current) {
      const now = performance.now();
      const canDraw = !isMobile || (now - lastDrawMsRef.current >= MOBILE_FPS_MS);

      if (canDraw) {
        const el = containerRef.current;
        if (el) {
          const rect      = el.getBoundingClientRect();
          const sh        = window.innerHeight;
          const scrollable = el.offsetHeight - sh;
          const p = scrollable > 0
            ? Math.max(0, Math.min(1, -rect.top / scrollable))
            : 0;
          progressRef.current = p;

          /* after first full play-through, show last frame at p≈0 so
             the second scroll doesn't start with black frames */
          if (p > 0.92) hasCompletedRef.current = true;
          const rawTarget = Math.round(p * (totalRef.current - 1));
          const target = hasCompletedRef.current && p < 0.04
            ? totalRef.current - 1
            : rawTarget;
          if (target !== lastFrameRef.current || needsDrawRef.current) {
            lastFrameRef.current = target;
            needsDrawRef.current = false;
            drawBitmap(target);
            if (isMobile) lastDrawMsRef.current = now;
          }

          /* text / hint — direct DOM, no re-render */
          const ta = p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.12);
          if (textRef.current) {
            textRef.current.style.opacity      = String(ta);
            textRef.current.style.pointerEvents = ta > 0.3 ? "auto" : "none";
          }
          if (hintRef.current) {
            hintRef.current.style.opacity = ta < 0.1 ? "1" : "0";
          }

          /* search widget — simultaneous with brand text */
          const sa = p < 0.80 ? 0 : Math.min(1, (p - 0.80) / 0.12);
          if (searchRef.current) {
            searchRef.current.style.opacity      = String(sa);
            searchRef.current.style.pointerEvents = sa > 0.3 ? "auto" : "none";
          }
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [isMobile, drawBitmap]);

  /* skip RAF when tab is hidden */
  useEffect(() => {
    const onVisible = () => { needsDrawRef.current = true; };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  /* ── init ── */
  useEffect(() => {
    if (isMobile === null) return;
    setupCanvas();
    /* desktop: redraw on resize; mobile: skip to avoid wobble */
    if (!isMobile) {
      window.addEventListener("resize", setupCanvas, { passive: true });
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setupCanvas, tick, isMobile]);

  /* ── SSR ── */
  if (isMobile === null) {
    return <div style={{ width: "100%", height: "100vh", background: "#0A1F44" }} />;
  }

  const scrollH = isMobile ? "240vh" : "500vh";

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: scrollH,
      }}
    >
      {/* sticky panel — real pixel height, immune to address-bar resize */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: stickyH,
          overflow: "hidden",
          background: "#0A1F44",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* vignette */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background:
              "linear-gradient(to bottom,rgba(0,0,0,0.08) 0%,transparent 20%,transparent 70%,rgba(0,0,0,0.15) 100%)",
          }}
        />

        {/* loading */}
        {!ready && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 20,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#0A1F44", gap: 18,
          }}>
            <div style={{
              width: 22, height: 22,
              border: "1px solid rgba(255,255,255,0.1)",
              borderTop: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "50%",
              animation: "spin 0.85s linear infinite",
            }} />
            <span style={{
              color: "rgba(255,255,255,0.18)", fontSize: 9,
              letterSpacing: "4px", textTransform: "uppercase",
              fontFamily: "var(--font-body)",
            }}>
              Loading
            </span>
          </div>
        )}

        {/* brand text — fades in at 80 % scroll, z-13 sits above overlay */}
        <div ref={textRef} style={{
          position: "absolute", inset: 0, zIndex: 13,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          opacity: 0, pointerEvents: "none",
          transition: "opacity 0.35s ease",
        }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(36px, 6.5vw, 92px)",
            fontWeight: 700, color: "#fff",
            letterSpacing: "-0.02em", textAlign: "center",
            textShadow: "0 2px 40px rgba(0,0,0,0.45)",
            margin: 0, lineHeight: 1.04,
          }}>
            Trip to Tackle
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(9px, 1.1vw, 13px)",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "5px", textTransform: "uppercase",
            marginTop: 20, textShadow: "0 1px 8px rgba(0,0,0,0.6)",
          }}>
            Travel to Experience
          </p>
        </div>

        {/* subtle dark gradient to keep text readable over the final landscape frame */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.55) 100%)",
            zIndex: 11,
            pointerEvents: "none",
          }}
        />

        {/* search widget — desktop + mobile, appears simultaneously with hero title */}
        <div
          ref={searchRef}
          style={{
            position: "absolute",
            bottom: isMobile ? "5%" : "7%",
            left: "50%",
            transform: "translateX(-50%)",
            width: isMobile ? "min(420px, calc(100% - 32px))" : "min(900px, calc(100% - 48px))",
            background: "rgba(0, 0, 0, 0.42)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderRadius: "16px",
            padding: isMobile ? "16px 18px 14px" : "24px 30px 22px",
            zIndex: 14,
            opacity: 0,
            pointerEvents: "none",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
            {/* header */}
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "20px" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <span style={{ color: "#FF6A00", fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-body)", letterSpacing: "0.2px" }}>
                Search Your Perfect Holiday
              </span>
            </div>

            {/* 4 fields — real inputs, 2-col on mobile */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "10px" : "14px", marginBottom: isMobile ? "14px" : "20px" }}>
              {/* DESTINATION */}
              <div>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginBottom: "9px" }}>
                  Destination
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.10)", borderRadius: "10px", padding: "11px 14px", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <input ref={destInputRef} type="text" placeholder="Where to go?" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", fontFamily: "var(--font-body)", width: "100%", minWidth: 0 }} />
                </div>
              </div>

              {/* DURATION */}
              <div>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginBottom: "9px" }}>
                  Duration
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.10)", borderRadius: "10px", padding: "11px 14px", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <rect width="18" height="18" x="3" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <input ref={durationInputRef} type="text" placeholder="How long?" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", fontFamily: "var(--font-body)", width: "100%", minWidth: 0 }} />
                </div>
              </div>

              {/* BUDGET */}
              <div>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginBottom: "9px" }}>
                  Budget
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.10)", borderRadius: "10px", padding: "11px 14px", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  <input ref={budgetInputRef} type="text" placeholder="Your budget?" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", fontFamily: "var(--font-body)", width: "100%", minWidth: 0 }} />
                </div>
              </div>

              {/* TRAVELERS */}
              <div>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginBottom: "9px" }}>
                  Travelers
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.10)", borderRadius: "10px", padding: "11px 14px", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <input ref={travelersInputRef} type="text" placeholder="How many?" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", fontFamily: "var(--font-body)", width: "100%", minWidth: 0 }} />
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleExplore}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#FF6A00", color: "#fff",
                padding: "11px 26px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: "var(--font-body)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#d95f00"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Explore Tours
            </button>
          </div>

        {/* scroll hint */}
        <div ref={hintRef} style={{
          position: "absolute", bottom: 28,
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 6, zIndex: 10,
          color: "rgba(255,255,255,0.3)", opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.6s ease",
          animation: "bounce-y 2.2s ease-in-out infinite",
        }}>
          <span style={{
            fontSize: 9, letterSpacing: "3.5px",
            textTransform: "uppercase", fontFamily: "var(--font-body)",
          }}>
            Scroll
          </span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
