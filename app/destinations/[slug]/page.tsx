"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Download,
  Mail,
  MessageCircle,
  Plane,
  Sparkles,
  SunMedium,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import BookingForm from "@/components/blocks/booking-form";
import { getDestinationBySlug } from "@/lib/destinations";
import { packages, type Package } from "@/lib/packages";
import type { Destination } from "@/lib/destinations";

const fadeInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function DestinationDetailPage() {
  const params = useParams<{ slug: string }>();
  const slugParam = params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const destination = slug ? getDestinationBySlug(slug) : undefined;
  const [emailOpen, setEmailOpen] = useState(false);

  const downloadItinerary = (dest: Destination) => {
    const content = `
TRIP 2 TACKLE — GROUP DEPARTURE ITINERARY

Destination: ${dest.name}
Region: ${dest.region}
Duration: ${dest.duration}
Best Time: ${dest.bestTime}
Starting From: ${dest.priceLabel}

ABOUT ${dest.name.toUpperCase()}
${dest.description}

INCLUSIONS
${dest.includes.map((i) => `• ${i}`).join("\n")}

DAY-BY-DAY PLAN
${dest.itinerary.map((d) => `Day ${d.day}: ${d.title}\n${d.description}`).join("\n\n")}

---
GROUP DEPARTURES
Fixed-date group departures are available from Vijayawada/Hyderabad.
Contact us for slot availability and custom departure dates.

TERMS & CONDITIONS
• Prices are per person on twin/triple sharing basis.
• Booking confirmation requires 30% advance payment.
• Balance payment due 15 days before departure.
• Cancellation: 30+ days — 10% deduction; 15–29 days — 30%; under 15 days — 50%.

Trip 2 Tackle | hello@trip2tackle.com | +91 83092 18545
Vijayawada, Andhra Pradesh, India
`.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dest.slug}-group-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!slug || !destination) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#F7F7F7",
            paddingTop: "120px",
            paddingBottom: "80px",
          }}
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInView}
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "40px 32px",
                boxShadow: "0 18px 50px rgba(10,31,68,0.08)",
                textAlign: "center",
              }}
            >
              <p className="section-label" style={{ marginBottom: "14px" }}>
                Destination Missing
              </p>
              <h1
                className="font-playfair"
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  color: "#0A1F44",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                We couldn&apos;t find that destination
              </h1>
              <p
                className="font-dm"
                style={{
                  color: "rgba(10,31,68,0.65)",
                  lineHeight: 1.7,
                  maxWidth: "640px",
                  margin: "0 auto 24px",
                }}
              >
                The trip you&apos;re looking for may have moved or may not be live yet. Browse all destinations and pick a
                new route from there.
              </p>
              <Link
                href="/destinations"
                className="font-dm"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#0A1F44",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                <ArrowLeft size={16} />
                Back to All Destinations
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPackages = packages.filter((pkg) => pkg.destinationSlug === slug);
  const customPkg: Package = {
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    destination: destination.name,
    destinationSlug: destination.slug,
    duration: destination.duration,
    nights: 5,
    days: 6,
    price: destination.price,
    priceLabel: destination.priceLabel,
    image: destination.image,
    includes: destination.includes,
    highlights: destination.itinerary.map((item) => item.title),
    description: destination.description,
  };
  const packagesToShow = relatedPackages.length > 0 ? relatedPackages : [customPkg];

  return (
    <>
      <Navbar />

      <main style={{ background: "#F7F7F7" }}>
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            background: "#0A1F44",
          }}
        >
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,31,68,0.2) 0%, rgba(10,31,68,0.5) 40%, rgba(10,31,68,0.92) 100%)",
            }}
          />
          <div
            className="mx-auto flex h-screen max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8"
            style={{ position: "relative", zIndex: 2, paddingTop: "96px", paddingBottom: "48px" }}
          >
            <div>
              <Link
                href="/destinations"
                className="font-dm"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "10px 16px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <ArrowLeft size={15} />
                All Destinations
              </Link>
            </div>

            <motion.div {...fadeInView} style={{ maxWidth: "720px" }}>
              <p
                className="font-dm"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {destination.region}
              </p>
              <h1
                className="font-playfair"
                style={{
                  fontSize: "clamp(52px, 8vw, 96px)",
                  lineHeight: 0.96,
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                {destination.name}
              </h1>
              <p
                className="font-dm"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  lineHeight: 1.7,
                  maxWidth: "620px",
                }}
              >
                {destination.tagline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => downloadItinerary(destination)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
                >
                  <Download size={15} /> Download Group Itinerary
                </button>
                <button
                  onClick={() => setEmailOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-dm text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  <Mail size={15} /> Email Itinerary
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section style={{ background: "#fff", borderBottom: "1px solid rgba(10,31,68,0.08)" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-4 py-5 sm:px-6 lg:px-8">
            {[
              { icon: CalendarDays, label: "Duration", value: destination.duration },
              { icon: SunMedium, label: "Best Time", value: destination.bestTime },
              { icon: Sparkles, label: "Trip Style", value: destination.type_label },
              { icon: Wallet, label: "Starting From", value: destination.priceLabel },
            ].map((item) => (
              <div
                key={item.label}
                className="font-dm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  borderRadius: "999px",
                  background: "#F7F7F7",
                  color: "#0A1F44",
                  minWidth: "220px",
                  border: "1px solid rgba(10,31,68,0.08)",
                }}
              >
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    background: "rgba(255,106,0,0.12)",
                    color: "#FF6A00",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={18} />
                </span>
                <span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(10,31,68,0.5)",
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: 700 }}>{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <motion.div {...fadeInView} style={{ marginBottom: "56px" }}>
                <h2
                  className="font-playfair"
                  style={{
                    fontSize: "36px",
                    color: "#0A1F44",
                    fontWeight: 700,
                    marginBottom: "18px",
                  }}
                >
                  About {destination.name}
                </h2>
                <p
                  className="font-dm"
                  style={{
                    color: "rgba(10,31,68,0.72)",
                    fontSize: "16px",
                    lineHeight: 1.9,
                  }}
                >
                  {destination.description}
                </p>
              </motion.div>

              <motion.div {...fadeInView} style={{ marginBottom: "56px" }}>
                <p className="section-label" style={{ marginBottom: "12px" }}>
                  Experience Flow
                </p>
                <h2
                  className="font-playfair"
                  style={{
                    fontSize: "36px",
                    color: "#0A1F44",
                    fontWeight: 700,
                    marginBottom: "28px",
                  }}
                >
                  Day-by-Day Itinerary
                </h2>

                <div style={{ position: "relative" }}>
                  {destination.itinerary.map((item, index) => {
                    const isLast = index === destination.itinerary.length - 1;

                    return (
                      <div key={item.day} style={{ position: "relative", paddingLeft: "76px", paddingBottom: isLast ? "0" : "28px" }}>
                        {!isLast && (
                          <div
                            style={{
                              position: "absolute",
                              left: "21px",
                              top: "48px",
                              width: "2px",
                              bottom: "0",
                              background: "linear-gradient(180deg, rgba(255,106,0,0.45) 0%, rgba(10,31,68,0.08) 100%)",
                            }}
                          />
                        )}
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "44px",
                            height: "44px",
                            borderRadius: "999px",
                            background: "#FF6A00",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "15px",
                            boxShadow: "0 12px 24px rgba(255,106,0,0.22)",
                          }}
                        >
                          {item.day}
                        </div>
                        <div
                          style={{
                            background: "#fff",
                            borderRadius: "20px",
                            padding: "24px 24px 22px",
                            boxShadow: "0 14px 40px rgba(10,31,68,0.06)",
                            border: "1px solid rgba(10,31,68,0.06)",
                          }}
                        >
                          <h3
                            className="font-dm"
                            style={{
                              color: "#0A1F44",
                              fontSize: "18px",
                              fontWeight: 700,
                              marginBottom: "10px",
                            }}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="font-dm"
                            style={{
                              color: "rgba(10,31,68,0.62)",
                              lineHeight: 1.75,
                              fontSize: "15px",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div {...fadeInView}>
                <h2
                  className="font-playfair"
                  style={{
                    fontSize: "36px",
                    color: "#0A1F44",
                    fontWeight: 700,
                    marginBottom: "24px",
                  }}
                >
                  What&apos;s Included
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {destination.includes.map((item) => (
                    <div
                      key={item}
                      className="font-dm"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "#fff",
                        borderRadius: "18px",
                        padding: "16px 18px",
                        border: "1px solid rgba(10,31,68,0.06)",
                        boxShadow: "0 10px 30px rgba(10,31,68,0.04)",
                      }}
                    >
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "999px",
                          background: "rgba(255,106,0,0.12)",
                          color: "#FF6A00",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={16} />
                      </span>
                      <span style={{ color: "#0A1F44", fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                {...fadeInView}
                style={{
                  position: "sticky",
                  top: "88px",
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 22px 60px rgba(10,31,68,0.1)",
                  border: "1px solid rgba(10,31,68,0.06)",
                }}
              >
                <p className="section-label" style={{ marginBottom: "10px" }}>
                  Plan Your Trip
                </p>
                <h2
                  className="font-playfair"
                  style={{
                    fontSize: "28px",
                    color: "#0A1F44",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  Enquire About {destination.name}
                </h2>
                <p className="font-dm" style={{ color: "rgba(10,31,68,0.55)", fontSize: "13px", marginBottom: "22px", lineHeight: 1.6 }}>
                  Fill in your details and we&apos;ll reach out on WhatsApp within a few hours.
                </p>

                <div style={{ display: "grid", gap: "14px" }}>
                  {packagesToShow.map((pkg) => (
                    <div
                      key={pkg.slug}
                      style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: "1px solid rgba(10,31,68,0.08)",
                        background: "#fff",
                      }}
                    >
                      {/* Package header image */}
                      <div style={{ position: "relative", height: "140px" }}>
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 360px"
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(10,31,68,0.12) 0%, rgba(10,31,68,0.82) 100%)",
                          }}
                        />
                        <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                          <p className="font-dm" style={{ color: "rgba(255,255,255,0.65)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "4px" }}>
                            {pkg.destination} · {pkg.duration} · {pkg.priceLabel}
                          </p>
                          <h3 className="font-playfair" style={{ color: "#fff", fontSize: "20px", fontWeight: 700, lineHeight: 1.2 }}>
                            {pkg.name}
                          </h3>
                        </div>
                      </div>

                      {/* Inquiry form */}
                      <div style={{ padding: "20px" }}>
                        <BookingForm tourName={pkg.name} price={pkg.priceLabel} />
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919000000000?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(destination.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "18px",
                    color: "#0A1F44",
                    textDecoration: "none",
                    fontWeight: 600,
                    opacity: 0.75,
                  }}
                >
                  <MessageCircle size={16} />
                  Prefer to chat first on WhatsApp?
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <section style={{ background: "#0A1F44", padding: "72px 24px" }}>
          <motion.div {...fadeInView} className="mx-auto max-w-4xl text-center">
            <p className="section-label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "14px" }}>
              Tailored Departure
            </p>
            <h2
              className="font-playfair"
              style={{
                fontSize: "clamp(34px, 5vw, 52px)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Need a Kerala-first itinerary for {destination.name}?
            </h2>
            <p
              className="font-dm"
              style={{
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.8,
                maxWidth: "720px",
                margin: "0 auto 28px",
              }}
            >
              We can adjust flights, stay style, and pacing for couples, families, or groups without changing the core
              experience of the destination.
            </p>
            <a
              href={`https://wa.me/919000000000?text=Hi%2C%20I%27d%20like%20a%20custom%20${encodeURIComponent(destination.name)}%20itinerary`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#FF6A00",
                color: "#fff",
                textDecoration: "none",
                padding: "14px 24px",
                borderRadius: "999px",
                fontWeight: 700,
              }}
            >
              <Plane size={16} />
              Build a Custom Plan
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
