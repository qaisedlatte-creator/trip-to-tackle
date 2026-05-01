"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#1B2866", padding: "64px 60px 40px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "52px",
        }}
        className="grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <Image
              src="/logo.png"
              alt="Trip 2 Tackle"
              width={140}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p
            style={{
              color: "#94A3B8",
              fontSize: "14px",
              lineHeight: 1.75,
              maxWidth: "280px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Discover your next adventure with us. Affordable &amp; personalized travel
            plans crafted with care. Let&apos;s wander together.
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
            {["FB", "IG", "YT", "TW"].map((s) => (
              <button
                key={s}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94A3B8",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "var(--font-dm)",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(8,145,178,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "#0891B2";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Explore */}
        <FooterCol
          title="Explore"
          links={[
            { label: "Group Packages", href: "/#packages" },
            { label: "Destinations", href: "/destinations" },
            { label: "Blog", href: "/blog" },
            { label: "About Us", href: "/#about" },
            { label: "Contact", href: "/#contact" },
          ]}
        />

        {/* Company */}
        <FooterCol
          title="Company"
          links={[
            { label: "Careers", href: "/careers" },
            { label: "Campus Ambassador", href: "/campus-ambassador" },
            { label: "Partners", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms", href: "#" },
          ]}
        />

        {/* Support */}
        <FooterCol
          title="Support"
          links={[
            { label: "WhatsApp Us", href: "https://wa.me/919000000000" },
            { label: "FAQs", href: "#" },
            { label: "Cancellation Policy", href: "#" },
            { label: "Travel Insurance", href: "#" },
          ]}
        />
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ color: "#94A3B8", fontSize: "12.5px", fontFamily: "var(--font-dm)" }}>
          © 2026 Trip to Tackle. All rights reserved.
        </p>
        <p style={{ color: "#4A5568", fontSize: "12px", fontFamily: "var(--font-dm)" }}>
          Crafted with ♥ for wanderers everywhere
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4
        style={{
          color: "#fff",
          fontSize: "13.5px",
          fontWeight: 600,
          marginBottom: "16px",
          fontFamily: "var(--font-dm)",
        }}
      >
        {title}
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.label} style={{ marginBottom: "10px" }}>
            <Link
              href={link.href}
              style={{
                color: "#94A3B8",
                fontSize: "13px",
                textDecoration: "none",
                fontFamily: "var(--font-dm)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#94A3B8";
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
