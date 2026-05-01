"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const onEnterCTA = () => {
      cursor.classList.add("cta-hover");
      follower.classList.add("cta-hover");
    };
    const onLeaveCTA = () => {
      cursor.classList.remove("cta-hover");
      follower.classList.remove("cta-hover");
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    const ctaEls = document.querySelectorAll("a, button, [data-cursor-cta]");
    ctaEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterCTA);
      el.addEventListener("mouseleave", onLeaveCTA);
    });
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: width 0.2s, height 0.2s, background 0.2s;
          top: 0; left: 0;
        }
        .cursor-dot.cta-hover {
          width: 20px;
          height: 20px;
          background: #FF6A00;
        }
        .cursor-follower {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          top: 0; left: 0;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-follower.cta-hover {
          width: 56px;
          height: 56px;
          border-color: #FF6A00;
        }
        @media (max-width: 768px) {
          .cursor-dot, .cursor-follower { display: none; }
        }
      `}</style>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

