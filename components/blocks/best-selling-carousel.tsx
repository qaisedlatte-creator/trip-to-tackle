"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { packages as allPackages, type Package } from "@/lib/packages";

interface Props {
  label?: string;
  title?: string;
  packages?: Package[];
  linkPrefix?: string;
}

export default function BestSellingCarousel({ label = "Most Booked", title = "Best Selling Packages", packages: customPackages, linkPrefix = "/packages" }: Props) {
  const source = customPackages ?? allPackages.filter((p) => p.isGroupDeparture);
  const doubled = [...source, ...source];

  return (
    <section
      style={{
        background: "#0A1F44",
        padding: "56px 0 52px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 36, height: 1.5, background: "#FF6A00", borderRadius: 2, flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {label}
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>
      </div>

      {/* marquee wrapper */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            width: "max-content",
            animation: "logo-marquee 48s linear infinite",
            paddingLeft: "20px",
          }}
        >
          {doubled.map((pkg, i) => (
            <Link
              key={i}
              href={`${linkPrefix}/${pkg.id}`}
              className="pkg-sell-card"
              style={{
                flexShrink: 0,
                width: "272px",
                borderRadius: "20px",
                overflow: "hidden",
                display: "block",
                textDecoration: "none",
                position: "relative",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ position: "relative", height: "336px" }}>
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="272px"
                  style={{ objectFit: "cover" }}
                />
                {/* cinematic gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(10,31,68,0.06) 0%, rgba(10,31,68,0.22) 40%, rgba(10,31,68,0.94) 100%)",
                  }}
                />

                {/* badge */}
                {pkg.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      background: "#FF6A00",
                      color: "#fff",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {pkg.badge}
                  </span>
                )}

                {/* rating pill */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "rgba(10,31,68,0.65)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    padding: "4px 9px",
                    borderRadius: "20px",
                  }}
                >
                  <Star size={10} fill="#FFD700" stroke="none" />
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    4.9
                  </span>
                </div>

                {/* bottom content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 18px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: 5,
                    }}
                  >
                    {pkg.destination} · {pkg.duration}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 12,
                      lineHeight: 1.25,
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.42)",
                          marginBottom: 2,
                        }}
                      >
                        per person from
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-space-mono)",
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {pkg.priceLabel}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#fff",
                        background: "rgba(255,106,0,0.9)",
                        padding: "7px 14px",
                        borderRadius: "9px",
                      }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "100px",
            background: "linear-gradient(to right, #0A1F44 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "100px",
            background: "linear-gradient(to left, #0A1F44 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    </section>
  );
}
