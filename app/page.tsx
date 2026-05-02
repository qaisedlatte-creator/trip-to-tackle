"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import HeroScrollAnimation from "@/components/blocks/scroll-animation";
import Testimonials from "@/components/blocks/testimonials";
import BookingSteps from "@/components/blocks/booking-steps";
import PaymentModal from "@/components/blocks/payment-modal";
import InquiryForm from "@/components/blocks/inquiry-form";
import { packages } from "@/lib/packages";
import type { Package } from "@/lib/packages";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [couponEmail, setCouponEmail] = useState("");
  const [couponShown, setCouponShown] = useState(false);

  const openModal = (pkg: Package) => { setSelectedPkg(pkg); setModalOpen(true); };

  return (
    <>
      <PaymentModal pkg={selectedPkg} open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />

      <main>
        {/* HERO */}
        <HeroScrollAnimation />

        {/* WHY TRIP 2 TACKLE */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeUp} className="space-y-6">
                <p className="section-label">Why Choose Us</p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold leading-snug" style={{ color: "#0A1F44" }}>
                  Why Thousands Choose
                  <br />
                  <span className="italic">Trip 2 Tackle</span>
                </h2>
                <p className="font-dm text-gray-500 leading-relaxed text-base max-w-lg">
                  We&apos;re a Kerala-born travel agency with deep local expertise and a genuine passion
                  for connecting travelers with extraordinary experiences. Whether you&apos;re planning a
                  Maldives getaway, a group Himalayan trek, or a budget Bali trip — we handle every
                  detail with transparent pricing and zero hidden charges.
                </p>
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 font-dm font-medium px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
                  style={{ background: "#0A1F44", color: "#fff", textDecoration: "none" }}
                >
                  Explore Destinations
                  <ArrowRight size={15} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="grid grid-cols-3 gap-0 border border-gray-100 rounded-2xl overflow-hidden"
              >
                {[
                  { value: "500+", label: "Happy Travellers" },
                  { value: "50+", label: "Destinations" },
                  { value: "4.9★", label: "Avg Rating" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="text-center py-10 px-4"
                    style={{ borderRight: i < 2 ? "1px solid #f0f0f0" : "none" }}
                  >
                    <p className="font-playfair text-4xl md:text-5xl font-bold" style={{ color: "#0A1F44" }}>
                      {s.value}
                    </p>
                    <p className="font-dm text-xs text-gray-400 mt-2 leading-tight">{s.label}</p>
                  </div>
                ))}
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
        <section id="packages" className="py-24 bg-white">
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
                <motion.div
                  key={pkg.id}
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
                        onClick={() => openModal(pkg)}
                        className="font-dm font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200"
                        style={{ background: "#0A1F44", color: "#fff" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
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
                  <a
                    href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20interested%20in%20Corporate%20Travel%20packages"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-dm font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200"
                    style={{ background: "#0A1F44", color: "#fff", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                  >
                    Enquire Now <ArrowRight size={15} />
                  </a>
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
                  <a
                    href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20interested%20in%20Pilgrimage%20tour%20packages"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-dm font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200"
                    style={{ background: "#0A1F44", color: "#fff", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                  >
                    Enquire Now <ArrowRight size={15} />
                  </a>
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

        <Testimonials />
        <BookingSteps />

        {/* INQUIRY FORM */}
        <section className="py-24 bg-white">
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
                    { icon: "📍", text: "Kochi, Kerala, India" },
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
