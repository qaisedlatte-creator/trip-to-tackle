"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star, ShieldCheck, Tag, Headphones, Map } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import HeroScrollAnimation from "@/components/blocks/scroll-animation";
import Testimonials from "@/components/blocks/testimonials";
import BookingSteps from "@/components/blocks/booking-steps";
import InquiryForm from "@/components/blocks/inquiry-form";
import BestSellingCarousel from "@/components/blocks/best-selling-carousel";
import { packages } from "@/lib/packages";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function HomePage() {
  const router = useRouter();
  const [couponEmail, setCouponEmail] = useState("");
  const [couponShown, setCouponShown] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <HeroScrollAnimation />

        {/* WHY TRIP 2 TACKLE — rich split section */}
        <section className="py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #f9fafb 0%, #fff9f5 55%, #f5f8ff 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">

              {/* Left — image with overlaid stats */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                style={{ position: "relative", minHeight: "620px", borderRadius: "0px", overflow: "hidden" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&q=85"
                  alt="Happy travellers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                {/* dark gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(160deg, rgba(10,31,68,0.72) 0%, rgba(10,31,68,0.38) 55%, rgba(10,31,68,0.68) 100%)",
                }} />

                {/* No.1 badge */}
                <div style={{
                  position: "absolute", top: 20, right: 20,
                  width: 82, height: 82, borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6A00 0%, #ff9540 100%)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(255,106,0,0.5)",
                  zIndex: 2,
                }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>No.1</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "8.5px", fontWeight: 600, color: "rgba(255,255,255,0.88)", letterSpacing: "0.3px", textAlign: "center", lineHeight: 1.25, marginTop: 4 }}>Travel{"\n"}Agency</span>
                </div>

                {/* Stats 2×2 grid at the bottom */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
                  zIndex: 2,
                }}>
                  {[
                    { value: "500+", label: "Happy Travellers" },
                    { value: "50+",  label: "Destinations"     },
                    { value: "5+",   label: "Years Experience" },
                    { value: "4.9★", label: "Satisfaction Rate" },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: "rgba(255,255,255,0.09)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      padding: "18px 20px",
                      borderTop: "1px solid rgba(255,255,255,0.12)",
                    }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                        {s.value}
                      </div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.62)", marginTop: 5 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — content */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.12 }}
              >
                {/* Label with line */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 1.5, background: "#FF6A00", borderRadius: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#FF6A00" }}>
                    Why Trip 2 Tackle
                  </span>
                </div>

                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 3.6vw, 48px)", fontWeight: 700, color: "#0A1F44", lineHeight: 1.15, marginBottom: 20 }}>
                  Stress-Free Holidays,{" "}
                  <span style={{ color: "#FF6A00", fontStyle: "italic" }}>Crafted For You</span>
                </h2>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "#6b7280", lineHeight: 1.75, marginBottom: 34, maxWidth: 500 }}>
                  For over 5 years, Trip 2 Tackle has been transforming travel dreams into unforgettable
                  realities. We don&apos;t just book trips — we craft experiences that last a lifetime.
                </p>

                {/* 4 feature cards */}
                <div className="grid grid-cols-2 gap-3 mb-9">
                  {[
                    { Icon: ShieldCheck, title: "100% Transparent Pricing",  desc: "No hidden charges, ever. Every cost is explained upfront before you commit." },
                    { Icon: Tag,         title: "Best Price Guarantee",       desc: "We match or beat any comparable quote. No markup surprises." },
                    { Icon: Headphones,  title: "24/7 Travel Support",        desc: "Our dedicated travel concierge is available round the clock, wherever you are." },
                    { Icon: Map,         title: "Personalised Itineraries",   desc: "Every journey is hand-designed by our experts — no cookie-cutter packages." },
                  ].map(({ Icon, title, desc }) => (
                    <motion.div
                      key={title}
                      whileHover={{ y: -3, boxShadow: "0 10px 28px rgba(0,0,0,0.09)" }}
                      style={{
                        background: "#F7F8FF",
                        borderRadius: 14,
                        padding: "18px 16px",
                        border: "1px solid #eef0f8",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "rgba(10,31,68,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 10, flexShrink: 0,
                      }}>
                        <Icon size={17} color="#0A1F44" />
                      </div>
                      <h4 style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 700, color: "#0A1F44", marginBottom: 4, lineHeight: 1.35 }}>
                        {title}
                      </h4>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#9E9A94", lineHeight: 1.55, margin: 0 }}>
                        {desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link
                    href="/#packages"
                    style={{ background: "#0A1F44", color: "#fff", padding: "13px 28px", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                  >
                    Start Your Journey <ArrowRight size={15} />
                  </Link>
                  <a
                    href="https://wa.me/918309218545"
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: "#0A1F44", border: "1.5px solid rgba(10,31,68,0.28)", padding: "13px 28px", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <MessageCircle size={15} /> Chat With Us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DESTINATION COLLAGE */}
        <section className="py-24 overflow-hidden" style={{ background: "#0A1F44" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="section-label mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                From India, To the World
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                50+ Destinations, Infinite Memories
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=500&q=80", name: "Kashmir" },
                { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80", name: "Bali" },
                { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80", name: "Maldives" },
                { src: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=80", name: "Thailand" },
              ].map((img, i) => (
                <motion.div
                  key={img.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <p className="absolute bottom-3 left-3 font-playfair text-white font-semibold text-lg">
                    {img.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="packages" className="py-24" style={{ background: "linear-gradient(to bottom, #f5f7ff 0%, #ffffff 40%, #fff8f3 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-12">
              <p className="section-label mb-2">Our Packages</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2" style={{ color: "#0A1F44" }}>
                Handpicked Group Packages
              </h2>
              <p className="font-dm text-gray-500 mt-3 max-w-xl">
                Fixed prices. No hidden charges. Book instantly with Razorpay.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <Link key={pkg.id} href={`/packages/${pkg.id}`} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="pkg-card bg-white rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="pkg-img-inner object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {pkg.badge && (
                        <span className="absolute top-3 left-3 font-dm text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: "#FF6A00", color: "#fff" }}>
                          {pkg.badge}
                        </span>
                      )}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1">
                        <Star size={11} fill="#FFD700" stroke="none" />
                        <span className="font-dm text-xs text-white font-semibold">4.9</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="font-dm text-xs text-gray-400 uppercase tracking-wide mb-1">
                        {pkg.destination} · {pkg.duration}
                      </p>
                      <h3 className="font-playfair text-lg font-bold mb-3" style={{ color: "#0A1F44" }}>
                        {pkg.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.includes.slice(0, 3).map((inc) => (
                          <span key={inc} className="font-dm text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                            {inc}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-dm text-xs text-gray-400">per person</p>
                          <p className="font-space text-xl font-bold" style={{ color: "#0A1F44" }}>
                            {pkg.priceLabel}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/packages/${pkg.id}`);
                          }}
                          className="font-dm font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200"
                          style={{ background: "#0A1F44", color: "#fff" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                        >
                          {pkg.isGroupDeparture ? "Book Now" : "Enquire Now"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CORPORATE TRAVEL & PILGRIMAGES */}
        <section className="py-24" style={{ background: "#F7F7F7" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="section-label mb-3">Special Packages</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold" style={{ color: "#0A1F44" }}>
                Corporate Travel &amp; Pilgrimages
              </h2>
              <p className="font-dm text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed">
                Tailored experiences for teams and pilgrims alike — from boardroom retreats to sacred journeys.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Corporate */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                    alt="Corporate Travel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="font-dm text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#FF6A00", color: "#fff" }}>
                      Corporate
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold mb-3" style={{ color: "#0A1F44" }}>
                    Corporate Travel
                  </h3>
                  <p className="font-dm text-sm text-gray-500 leading-relaxed mb-5">
                    Strategic team outings, incentive travel programs, and corporate retreats that inspire and motivate your workforce.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {["Team Building Retreats", "Incentive Travel Programs", "Conference & Events", "Executive Getaways"].map((item) => (
                      <li key={item} className="flex items-center gap-2 font-dm text-sm text-gray-600">
                        <span style={{ color: "#FF6A00", fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/corporate"
                    className="inline-flex items-center gap-2 font-dm font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200"
                    style={{ background: "#0A1F44", color: "#fff", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                  >
                    Explore Corporate Travel <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>

              {/* Pilgrimages */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                    alt="Pilgrimages"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="font-dm text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#FF6A00", color: "#fff" }}>
                      Pilgrimage
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold mb-3" style={{ color: "#0A1F44" }}>
                    Sacred Journeys
                  </h3>
                  <p className="font-dm text-sm text-gray-500 leading-relaxed mb-5">
                    Carefully curated pilgrimage tours with comfortable stays, expert guides, and deeply spiritual immersion.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {["Char Dham Yatra", "Vaishno Devi", "Tirupati Darshan", "Rameswaram & Kashi"].map((item) => (
                      <li key={item} className="flex items-center gap-2 font-dm text-sm text-gray-600">
                        <span style={{ color: "#FF6A00", fontWeight: 700 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/pilgrimages"
                    className="inline-flex items-center gap-2 font-dm font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200"
                    style={{ background: "#0A1F44", color: "#fff", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                  >
                    Explore Pilgrimages <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EMAIL SIGNUP + COUPON */}
        <section className="py-16" style={{ background: "#0A1F44" }}>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div {...fadeUp}>
              <p className="section-label mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                Exclusive Offer
              </p>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
                Get 10% Off Your First Booking
              </h2>
              <p className="font-dm text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                Sign up with your email and get an instant discount coupon.
              </p>

              {!couponShown ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (couponEmail) setCouponShown(true); }}
                  className="flex gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={couponEmail}
                    onChange={(e) => setCouponEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 font-dm text-sm px-4 py-3 rounded-xl outline-none"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                    }}
                  />
                  <button
                    type="submit"
                    className="font-dm font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shrink-0"
                    style={{ background: "#FF6A00", color: "#fff", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#d95f00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                  >
                    Get Coupon
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-sm mx-auto p-6 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <p className="font-dm text-sm mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Your exclusive coupon code:
                  </p>
                  <p className="font-space text-3xl font-bold text-white tracking-widest mb-3">
                    TRAVEL10
                  </p>
                  <p className="font-dm text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Apply at checkout · Valid for 30 days
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <BestSellingCarousel />

        <Testimonials />
        <BookingSteps />

        {/* INQUIRY FORM */}
        <section className="py-24" style={{ background: "linear-gradient(160deg, #fafcff 0%, #fffef8 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div {...fadeUp}>
                <p className="section-label mb-3">Get in Touch</p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-5" style={{ color: "#0A1F44" }}>
                  Plan Your Perfect Trip
                </h2>
                <p className="font-dm text-gray-500 leading-relaxed mb-8 text-base max-w-md">
                  Tell us about your dream destination and we&apos;ll craft a personalised itinerary.
                  Our travel experts respond within 24 hours.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: "📞", text: "+91 83092 18545" },
                    { icon: "✉️", text: "hello@trip2tackle.com" },
                    { icon: "📍", text: "Vijayawada, Andhra Pradesh, India" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 font-dm text-gray-600 text-sm">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl p-8"
                style={{ background: "#F7F7F7" }}
              >
                <InquiryForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24" style={{ background: "#0A1F44" }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div {...fadeUp}>
              <p className="section-label mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                Start Today
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5">
                Ready to Tackle Your Next Adventure?
              </h2>
              <p className="font-dm text-base mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Chat with our travel experts on WhatsApp, browse our packages, or drop us a message.
                Your dream trip is one click away.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/918309218545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-dm font-semibold px-7 py-3 rounded-xl transition-colors min-h-[44px]"
                  style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}
                >
                  <MessageCircle size={17} />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/destinations"
                  className="font-dm font-medium px-7 py-3 rounded-xl transition-all duration-200 min-h-[44px] flex items-center"
                  style={{
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                    textDecoration: "none",
                  }}
                >
                  Browse Destinations
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
