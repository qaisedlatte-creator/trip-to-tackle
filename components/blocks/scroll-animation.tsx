"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── config ──────────────────────────────────────────── */
const DESKTOP_TOTAL  = 250;
const DESKTOP_BATCH  = 20;

/* Mobile: only load every 4th frame → 63 frames max, resize to 720 px wide
   This keeps peak decoded memory under ~220 MB instead of crashing at 2 GB  */
const MOBILE_STRIDE  = 4;
const MOBILE_TOTAL   = Math.ceil(250 / MOBILE_STRIDE);  // 63
const MOBILE_BATCH   = 8;
const MOBILE_MAX_W   = 720;

const MOBILE_BP = 768;
/* ─────────────────────────────────────────────────────── */

function pad4(n: number) {
  return String(n).padStart(4, "0");
}

export default function HeroScrollAnimation() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const bitmapsRef    = useRef<(ImageBitmap | null)[]>([]);
  const ctxRef        = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef        = useRef<number>(0);
  const needsDrawRef  = useRef(false);
  const lastFrameRef  = useRef(-1);
  const progressRef   = useRef(0);
  const isReadyRef    = useRef(false);
  const totalRef      = useRef(DESKTOP_TOTAL);

  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [ready, setReady]     = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  /* real viewport height — fixes iOS Safari 100vh gap */
  const [vh, setVh]           = useState("100vh");

  /* ── viewport height (fixes iOS address-bar gap) ── */
  useEffect(() => {
    const update = () => setVh(`${window.innerHeight}px`);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

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

    const total = isMobile ? MOBILE_TOTAL : DESKTOP_TOTAL;
    totalRef.current = total;
    bitmapsRef.current = new Array(total).fill(null);
    lastFrameRef.current = -1;

    const loadFrame = async (logicalIdx: number): Promise<void> => {
      try {
        /* logical → file index */
        const fileNum = isMobile
          ? Math.min(logicalIdx * MOBILE_STRIDE + 1, 250)
          : logicalIdx + 1;

        const folder = isMobile ? "/mobileframes-jpg" : "/pcframes-jpg";
        const res = await fetch(`${folder}/${pad4(fileNum)}.jpg`);
        if (!res.ok || !mounted) return;

        const blob = await res.blob();

        /* on mobile: force decode at 720 px wide to save GPU memory */
        const opts: ImageBitmapOptions = {
          resizeQuality:        "medium",
          premultiplyAlpha:     "none",
          colorSpaceConversion: "default",
          ...(isMobile ? { resizeWidth: MOBILE_MAX_W } : {}),
        };
        const bitmap = await createImageBitmap(blob, opts);
        if (!mounted) { bitmap.close(); return; }

        bitmapsRef.current[logicalIdx] = bitmap;
        needsDrawRef.current = true;
      } catch {
        /* skip failed frame silently */
      }
    };

    const run = async () => {
      const batchSize = isMobile ? MOBILE_BATCH : DESKTOP_BATCH;

      /* phase 1 — first batch, unblocks render */
      await Promise.all(
        Array.from({ length: batchSize }, (_, i) => loadFrame(i))
      );
      if (!mounted) return;
      isReadyRef.current = true;
      setReady(true);

      /* phase 2 — rest, background */
      for (let start = batchSize; start < total; start += batchSize) {
        if (!mounted) break;
        const end = Math.min(start + batchSize, total);
        await Promise.all(
          Array.from({ length: end - start }, (_, i) => loadFrame(start + i))
        );
        /* small yield between batches — prevents jank on low-end phones */
        await new Promise((r) => setTimeout(r, 50));
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

    /* on mobile: DPR capped at 1 to halve pixel count */
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const w = sticky.clientWidth;
    const h = sticky.clientHeight;

    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext("2d", {
      alpha:              false,
      desynchronized:     true,
      willReadFrequently: false,
    });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobile ? "low" : "high";
    ctxRef.current    = ctx;
    needsDrawRef.current = true;
  }, [isMobile]);

  /* ── cover-fit draw ── */
  const drawBitmap = useCallback((idx: number) => {
    const ctx     = ctxRef.current;
    const bitmaps = bitmapsRef.current;

    /* find nearest loaded frame */
    let i = Math.min(idx, bitmaps.length - 1);
    while (i > 0 && !bitmaps[i]) i--;
    const bm = bitmaps[i];
    if (!ctx || !bm) return;

    const sticky = stickyRef.current;
    const cw = sticky ? sticky.clientWidth  : window.innerWidth;
    const ch = sticky ? sticky.clientHeight : window.innerHeight;

    const ir = bm.width / bm.height;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (ir > cr) { dh = ch; dw = ir * dh; }
    else         { dw = cw; dh = dw / ir; }

    ctx.drawImage(bm, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  /* ── RAF tick ── */
  const tick = useCallback(() => {
    if (isReadyRef.current) {
      const el = containerRef.current;
      if (el) {
        const rect      = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - (stickyRef.current?.clientHeight ?? window.innerHeight);
        const p = scrollable > 0
          ? Math.max(0, Math.min(1, -rect.top / scrollable))
          : 0;
        progressRef.current = p;

        const target = Math.round(p * (totalRef.current - 1));
        if (target !== lastFrameRef.current || needsDrawRef.current) {
          lastFrameRef.current = target;
          needsDrawRef.current = false;
          drawBitmap(target);
        }

        /* text / hint DOM updates (no React re-render) */
        const textOpacity = p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.12);
        if (textRef.current) {
          textRef.current.style.opacity      = String(textOpacity);
          textRef.current.style.pointerEvents = textOpacity > 0.3 ? "auto" : "none";
        }
        if (hintRef.current) {
          hintRef.current.style.opacity = textOpacity < 0.1 ? "1" : "0";
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [drawBitmap]);

  /* ── init ── */
  useEffect(() => {
    if (isMobile === null) return;
    setupCanvas();
    window.addEventListener("resize", setupCanvas, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setupCanvas, tick, isMobile]);

  /* ── SSR guard ── */
  if (isMobile === null) {
    return <div style={{ width: "100%", height: vh, background: "#0A1F44" }} />;
  }

  const scrollH = isMobile ? "240vh" : "500vh";

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: scrollH }}>
      {/* sticky panel — real pixel height, no iOS gap */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: vh,
          overflow: "hidden",
          background: "#0A1F44",
        }}
      >
        {/* fullscreen canvas */}
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

        {/* subtle vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,transparent 22%,transparent 68%,rgba(0,0,0,0.18) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* loading */}
        {!ready && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#0A1F44",
              zIndex: 20,
              gap: 18,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                border: "1px solid rgba(255,255,255,0.1)",
                borderTop: "1px solid rgba(255,255,255,0.45)",
                borderRadius: "50%",
                animation: "spin 0.85s linear infinite",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.18)",
                fontSize: 9,
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
              }}
            >
              Loading
            </span>
          </div>
        )}

        {/* brand text — fades in at 80 % scroll */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 0.35s ease",
          }}
        >
          <h1
            style={{
              fontFamily:  "var(--font-heading)",
              fontSize:    "clamp(36px, 6.5vw, 92px)",
              fontWeight:  700,
              color:       "#fff",
              letterSpacing: "-0.02em",
              textAlign:   "center",
              textShadow:  "0 2px 40px rgba(0,0,0,0.45)",
              margin: 0,
              lineHeight: 1.04,
            }}
          >
            Trip to Tackle
          </h1>
          <p
            style={{
              fontFamily:  "var(--font-body)",
              fontSize:    "clamp(9px, 1.1vw, 13px)",
              color:       "rgba(255,255,255,0.45)",
              letterSpacing: "5px",
              textTransform: "uppercase",
              marginTop:   20,
              textShadow:  "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Travel to Experience
          </p>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            color: "rgba(255,255,255,0.3)",
            zIndex: 10,
            opacity: 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
            animation: "bounce-y 2.2s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: "3.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
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
