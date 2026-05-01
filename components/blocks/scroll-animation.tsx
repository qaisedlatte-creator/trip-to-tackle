"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 250;
const INITIAL_BATCH = 30;
const MOBILE_BREAKPOINT = 768;

function pad4(n: number) {
  return String(n).padStart(4, "0");
}

export default function HeroScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number>(0);
  const needsDrawRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const scrollProgressRef = useRef(0);
  const isReadyRef = useRef(false);

  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [isFirstBatchLoaded, setIsFirstBatchLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  /* ── Mobile detection ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Progressive frame loading ── */
  useEffect(() => {
    if (isMobile === null) return;
    let mounted = true;
    isReadyRef.current = false;
    setIsFirstBatchLoaded(false);

    bitmapsRef.current.forEach((b) => b?.close());
    bitmapsRef.current = new Array(TOTAL_FRAMES).fill(null);
    lastFrameRef.current = -1;

    const folder = isMobile ? "/mobileframes-jpg" : "/pcframes-jpg";

    const loadFrame = async (i: number): Promise<void> => {
      try {
        const res = await fetch(`${folder}/${pad4(i + 1)}.jpg`);
        if (!res.ok) return;
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob, {
          resizeQuality: "high",
          premultiplyAlpha: "none",
          colorSpaceConversion: "default",
        });
        if (!mounted) { bitmap.close(); return; }
        bitmapsRef.current[i] = bitmap;
        needsDrawRef.current = true;
      } catch {
        // frame load failed — skip silently
      }
    };

    const run = async () => {
      /* Phase 1: first INITIAL_BATCH — unblock render */
      await Promise.all(
        Array.from({ length: INITIAL_BATCH }, (_, i) => loadFrame(i))
      );
      if (!mounted) return;
      isReadyRef.current = true;
      setIsFirstBatchLoaded(true);

      /* Phase 2: remaining frames in background batches */
      const BATCH = 40;
      for (let start = INITIAL_BATCH; start < TOTAL_FRAMES; start += BATCH) {
        if (!mounted) break;
        const end = Math.min(start + BATCH, TOTAL_FRAMES);
        await Promise.all(
          Array.from({ length: end - start }, (_, i) => loadFrame(start + i))
        );
      }
    };

    run().catch(console.error);
    return () => { mounted = false; };
  }, [isMobile]);

  /* ── Canvas setup ── */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
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

  /* ── Draw frame — clamps to nearest loaded frame ── */
  const drawBitmap = useCallback((idx: number) => {
    const ctx = ctxRef.current;
    const bitmaps = bitmapsRef.current;
    let actualIdx = Math.min(idx, TOTAL_FRAMES - 1);
    while (actualIdx > 0 && !bitmaps[actualIdx]) actualIdx--;
    const bm = bitmaps[actualIdx];
    if (!ctx || !bm) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const ir = bm.width / bm.height;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (ir > cr) { dh = ch; dw = ir * dh; }
    else { dw = cw; dh = dw / ir; }
    ctx.drawImage(bm, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  /* ── Scroll → frame index ── */
  const getTargetFrame = useCallback((): number => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    scrollProgressRef.current = progress;
    return Math.round(progress * (TOTAL_FRAMES - 1));
  }, []);

  /* ── RAF tick ── */
  const tick = useCallback(() => {
    if (isReadyRef.current) {
      const target = getTargetFrame();
      if (target !== lastFrameRef.current || needsDrawRef.current) {
        lastFrameRef.current = target;
        needsDrawRef.current = false;
        drawBitmap(target);
      }

      /* Update text and hint opacity via direct DOM mutation */
      const p = scrollProgressRef.current;
      const textOpacity = p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.12);

      if (textRef.current) {
        textRef.current.style.opacity = String(textOpacity);
        textRef.current.style.pointerEvents = textOpacity > 0.3 ? "auto" : "none";
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = textOpacity < 0.1 ? "1" : "0";
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [getTargetFrame, drawBitmap]);

  /* ── Init canvas + RAF ── */
  useEffect(() => {
    if (isMobile === null) return;
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setupCanvas, tick, isMobile]);

  /* ── SSR guard ── */
  if (isMobile === null) {
    return <div style={{ width: "100%", height: "100vh", background: "#0A1F44" }} />;
  }

  const scrollH = isMobile ? "280vh" : "500vh";

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: scrollH }}>
      {/* Sticky fullscreen canvas */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#0A1F44",
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

        {/* Minimal vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.22) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Loading state */}
        {!isFirstBatchLoaded && (
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
              gap: 20,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                border: "1px solid rgba(255,255,255,0.1)",
                borderTop: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "50%",
                animation: "spin 0.9s linear infinite",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
              }}
            >
              Loading
            </span>
          </div>
        )}

        {/* Brand text — fades in at 80% scroll progress */}
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
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(38px, 6.5vw, 92px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              textAlign: "center",
              textShadow: "0 2px 40px rgba(0,0,0,0.45)",
              margin: 0,
              lineHeight: 1.04,
            }}
          >
            Trip to Tackle
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(9px, 1.1vw, 13px)",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "5px",
              textTransform: "uppercase",
              marginTop: 20,
              textShadow: "0 1px 8px rgba(0,0,0,0.6)",
            }}
          >
            Travel to Experience
          </p>
        </div>

        {/* Scroll hint — visible until text starts to appear */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            color: "rgba(255,255,255,0.3)",
            zIndex: 10,
            opacity: 0,
            transition: "opacity 0.6s ease",
            pointerEvents: "none",
            animation: "bounce-y 2.2s ease-in-out infinite",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
            }}
          >
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
