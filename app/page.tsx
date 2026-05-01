"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import HeroScrollAnimation from "@/components/blocks/scroll-animation";
import Testimonials from "@/components/blocks/testimonials";
import BookingSteps from "@/components/blocks/booking-steps";
import CustomCursor from "@/components/blocks/custom-cursor";
import { featuredDestinations } from "@/lib/destinations";

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrapper">
        {/* ── HERO ── */}
        <HeroScrollAnimation />

        {/* ── FEATURED DESTINATIONS ── */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-2">Our Destinations</p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] mt-2">
                  Your Journey Begins Here
                </h2>
              </div>
              <Link
                href="/destinations"
                className="hidden md:flex items-center gap-2 font-dm text-sm text-[#003060] hover:text-[#2571BC] font-medium transition-colors"
              >
                See All Destinations
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Destination cards — horizontal scroll */}
            <div className="flex gap-5 overflow-x-auto pb-4 scroll-snap-x -mx-4 px-4 sm:-mx-6 sm:px-6">
              {featuredDestinations.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="scroll-snap-child shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-playfair text-white font-semibold text-lg leading-tight">{d.name}</p>
                      <p className="font-dm text-white/70 text-xs mt-0.5">{d.region}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white flex items-center justify-between">
                    <span className="price-tag">{d.priceLabel}</span>
                    <span className="font-dm text-xs text-[#003060] font-medium flex items-center gap-1">
                      {d.duration} <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 font-dm text-sm text-[#003060] font-medium"
              >
                See All Destinations <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY TRIP 2 TACKLE ── */}
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <p className="section-label">Why Choose Us</p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060] leading-snug">
                  Why Thousands Choose
                  <br />
                  <span className="italic">Trip 2 Tackle</span>
                </h2>
                <p className="font-dm text-gray-600 leading-relaxed text-base max-w-lg">
                  We&apos;re a Kerala-born travel agency with deep local expertise and a genuine passion
                  for connecting travelers with extraordinary experiences. Whether you&apos;re planning a
                  Maldives getaway, a group Himalayan trek, or a budget Bali trip — we handle every
                  detail with transparent pricing and zero hidden charges.
                </p>
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 bg-[#003060] hover:bg-[#002050] text-white font-dm font-medium px-6 py-3 rounded-xl transition-colors duration-200 text-sm"
                >
                  Explore Destinations
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { value: "500+", label: "Happy Travellers" },
                  { value: "50+", label: "Destinations" },
                  { value: "4.9★", label: "Avg Rating" },
                ].map((s) => (
                  <div key={s.label} className="text-center py-8 border-r border-gray-100 last:border-0">
                    <p className="font-playfair text-4xl md:text-5xl font-bold text-[#003060]">{s.value}</p>
                    <p className="font-dm text-sm text-gray-400 mt-2">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── DESTINATION COLLAGE ── */}
        <section className="py-24 bg-[#003060] overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="section-label text-[#BECAE6] mb-3">From India, To the World</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                50+ Destinations, Infinite Memories
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=500&q=80", name: "Kashmir" },
                { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80", name: "Bali" },
                { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80", name: "Maldives" },
                { src: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=80", name: "Thailand" },
              ].map((img, i) => (
                <motion.div
                  key={img.name}
                  initial={{ opacity: 0, scale: 0.93 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-3 left-3 font-playfair text-white font-semibold text-lg">{img.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <BookingSteps />

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden bg-[#003060] py-24">
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <p className="section-label text-white/50 mb-4">Start Today</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-5">
              Ready to Tackle Your Next Adventure?
            </h2>
            <p className="font-dm text-white/70 text-base mb-10 leading-relaxed">
              Chat with our travel experts on WhatsApp, browse our packages, or drop us a message.
              Your dream trip is one click away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-dm font-medium px-7 py-3 rounded-xl transition-colors min-h-[44px]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <Link
                href="/destinations"
                className="text-white border border-white/30 hover:border-white/70 hover:bg-white/5 font-dm font-medium px-7 py-3 rounded-xl transition-all duration-200 min-h-[44px] flex items-center"
              >
                Browse Destinations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
