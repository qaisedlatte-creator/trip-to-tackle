"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/#packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 60px",
        height: "68px",
        background: "transparent",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "22px",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.3px",
          textDecoration: "none",
          flexShrink: 0,
          textShadow: "0 1px 12px rgba(0,0,0,0.5)",
        }}
      >
        Trip to <span style={{ color: "#f5c542" }}>Tackle</span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "34px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="hidden md:flex"
      >
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href.split("#")[0]) &&
                link.href.split("#")[0] !== "/";
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                style={{
                  color: isActive ? "#fff" : "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  transition: "color 0.2s",
                  borderBottom: isActive ? "2px solid #f5c542" : "none",
                  paddingBottom: isActive ? "2px" : "0",
                  fontFamily: "var(--font-dm)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.82)";
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <a
          href="https://wa.me/919000000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            border: "1.5px solid rgba(255,255,255,0.45)",
            color: "#fff",
            padding: "8px 17px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            textDecoration: "none",
            fontFamily: "var(--font-dm)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#25d366";
            el.style.color = "#25d366";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.45)";
            el.style.color = "#fff";
          }}
          className="hidden sm:flex"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.486a.5.5 0 00.609.61l5.71-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.77-.506-5.35-1.389l-.383-.22-3.392.888.905-3.306-.243-.398A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          WhatsApp
        </a>

        <Link
          href="/#packages"
          style={{
            background: "#f5c542",
            color: "#0d1b3e",
            padding: "9px 22px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-dm)",
            textDecoration: "none",
            transition: "background 0.2s",
            boxShadow: "0 2px 12px rgba(245,197,66,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#d4a820";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#f5c542";
          }}
        >
          Book Now
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "4px",
          }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            right: 0,
            background: "rgba(13,27,62,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          className="flex md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "rgba(255,255,255,0.9)",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                fontFamily: "var(--font-dm)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
