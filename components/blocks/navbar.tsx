"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/#packages", label: "Packages" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/campus-ambassador", label: "Campus Ambassador" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo — color on light bg, white on dark bg */}
          <Link href="/" className="flex items-center">
            <Image
              src={scrolled ? "/logo-color.png" : "/logo-dark.png"}
              alt="Trip 2 Tackle"
              width={140}
              height={40}
              priority
              style={{ objectFit: "contain", height: "36px", width: "auto" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.slice(0, 5).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: scrolled
                    ? pathname === l.href ? "#0A1F44" : "rgba(10,31,68,0.55)"
                    : pathname === l.href ? "#fff" : "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  position: "relative",
                }}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 1.5,
                      background: scrolled ? "#FF6A00" : "#fff",
                      borderRadius: 2,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: scrolled ? "#0A1F44" : "#fff",
                border: `1px solid ${scrolled ? "rgba(10,31,68,0.25)" : "rgba(255,255,255,0.4)"}`,
                padding: "6px 14px",
                borderRadius: 6,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <Link
              href="/#packages"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                background: scrolled ? "#0A1F44" : "#fff",
                color: scrolled ? "#fff" : "#0A1F44",
                padding: "6px 16px",
                borderRadius: 6,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            style={{ color: scrolled ? "#0A1F44" : "#fff" }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "#0A1F44",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
              {/* White logo on dark overlay */}
              <Image
                src="/logo-dark.png"
                alt="Trip 2 Tackle"
                width={120}
                height={34}
                style={{ objectFit: "contain", height: "32px", width: "auto" }}
              />
              <button onClick={() => setOpen(false)} style={{ color: "#fff" }}>
                <X size={26} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 28 }}>
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.08 }}
                >
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 28,
                      fontWeight: 600,
                      textDecoration: "none",
                      color: pathname === l.href ? "#FF6A00" : "#fff",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: 8 }}
              >
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "10px 20px",
                    borderRadius: 8,
                    fontSize: 15,
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                    minHeight: 44,
                  }}
                >
                  <MessageCircle size={17} />
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
