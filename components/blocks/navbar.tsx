"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/destinations", label: "Destinations" },
  { href: "/corporate", label: "Corporate" },
  { href: "/pilgrimages", label: "Pilgrimage" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout, openAuth } = useAuth();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = user ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[92px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={scrolled ? "/logo-color.png" : "/logo-dark.png"}
              alt="Trip 2 Tackle"
              width={220}
              height={63}
              priority
              style={{ objectFit: "contain", height: "86px", width: "auto" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
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
                      position: "absolute", bottom: -2, left: 0, right: 0,
                      height: 1.5, background: scrolled ? "#FF6A00" : "#fff", borderRadius: 2,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/918309218545"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                color: scrolled ? "#0A1F44" : "#fff",
                border: `1px solid ${scrolled ? "rgba(10,31,68,0.25)" : "rgba(255,255,255,0.4)"}`,
                padding: "6px 14px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s",
              }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>

            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Link
                  href="/account"
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                    background: scrolled ? "#0A1F44" : "#fff",
                    color: scrolled ? "#fff" : "#0A1F44",
                    padding: "6px 14px", borderRadius: 6, textDecoration: "none",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "#FF6A00", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff",
                  }}>
                    {initials}
                  </div>
                  {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: "6px",
                    color: scrolled ? "rgba(10,31,68,0.55)" : "rgba(255,255,255,0.65)",
                  }}
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuth}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                  background: scrolled ? "#0A1F44" : "#fff",
                  color: scrolled ? "#fff" : "#0A1F44",
                  padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <User size={14} /> Login
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1"
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0A1F44", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
              <Image
                src="/logo-dark.png" alt="Trip 2 Tackle"
                width={190} height={54}
                style={{ objectFit: "contain", height: "62px", width: "auto" }}
              />
              <button onClick={() => setOpen(false)} style={{ color: "#fff" }}>
                <X size={26} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 28 }}>
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.08 }}>
                  <Link
                    href={l.href}
                    style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 600, textDecoration: "none", color: pathname === l.href ? "#FF6A00" : "#fff" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                {user ? (
                  <>
                    <Link href="/account" onClick={() => setOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 20px", borderRadius: 8, fontSize: 15, fontFamily: "var(--font-body)", textDecoration: "none" }}>
                      <User size={16} /> My Account ({user.name.split(" ")[0]})
                    </Link>
                    <button onClick={() => { logout(); setOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", border: "none", background: "none", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontFamily: "var(--font-body)", cursor: "pointer" }}>
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <button onClick={() => { openAuth(); setOpen(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 20px", borderRadius: 8, fontSize: 15, fontFamily: "var(--font-body)", cursor: "pointer", background: "none" }}>
                    <User size={16} /> Login / Register
                  </button>
                )}
                <a href="https://wa.me/918309218545" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "10px 20px", borderRadius: 8, fontSize: 15, fontFamily: "var(--font-body)", textDecoration: "none", minHeight: 44 }}>
                  <MessageCircle size={17} /> WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
