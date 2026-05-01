"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Users, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import HeroScrollAnimation from "@/components/blocks/scroll-animation";
import Testimonials from "@/components/blocks/testimonials";
import BookingSteps from "@/components/blocks/booking-steps";
import CustomCursor from "@/components/blocks/custom-cursor";
import { featuredDestinations } from "@/lib/destinations";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

const livePackages = [
  {
    destination: "Spiti Valley",
    region: "Himachal Pradesh",
    dates: "Jun 14 – Jun 22, 2025",
    spots: 4,
    price: "₹18,500",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    destination: "Bali",
    region: "Indonesia",
    dates: "Jul 5 – Jul 12, 2025",
    spots: 6,
    price: "₹45,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
  },
  {
    destination: "Meghalaya",
    region: "Northeast India",
    dates: "Jul 19 – Jul 25, 2025",
    spots: 3,
    price: "₹14,000",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
  },
  {
    destination: "Kashmir",
    region: "Jammu & Kashmir",
    dates: "Aug 2 – Aug 9, 2025",
    spots: 5,
    price: "₹16,000",
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=600&q=80",
  },
  {
    destination: "Vietnam",
    region: "Southeast Asia",
    dates: "Aug 18 – Aug 26, 2025",
    spots: 8,
    price: "₹32,000",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  },
  {
    destination: "Coorg",
    region: "Karnataka",
    dates: "Sep 6 – Sep 8, 2025",
    spots: 2,
    price: "₹7,500",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
  },
];

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        {/* HERO */}
        <HeroScrollAnimation />

        {/* FEATURED DESTINATIONS */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-2">Our Destinations</p>
                <h2
                  className="font-playfair text-3xl md:text-4xl font-bold mt-2"
                  style={{ color: "#0A1F44" }}
                >
                  Your Journey Begins Here
                </h2>
              </div>
              <Link
                href="/destinations"
                className="hidden md:flex items-center gap-2 font-dm text-sm font-medium transition-colors"
                style={{ color: "#0A1F44" }}
              >
                See All
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            <div
              className="flex gap-5 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                paddingBottom: 4,
              }}
            >
              {featuredDestinations.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ scrollSnapAlign: "start", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-playfair text-white font-semibold text-lg leading-tight">{d.name}</p>
                      <p className="font-dm text-white/65 text-xs mt-0.5">{d.region}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white flex items-center justify-between">
                    <span className="price-tag">{d.priceLabel}</span>
                    <span
                      className="font-dm text-xs font-medium flex items-center gap-1"
                      style={{ color: "#0A1F44" }}
                    >
                      {d.duration} <ArrowRight size={11} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link href="/destinations" className="inline-flex items-center gap-2 font-dm text-sm font-medium" style={{ color: "#0A1F44" }}>
                See All Destinations <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* LIVE GROUP EXPERIENCES */}
        <section className="py-24 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-14">
              <p className="section-label mb-2">Real Groups, Fixed Departures</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mt-2" style={{ color: "#0A1F44" }}>
                Live Group Experiences
              </h2>
              <p className="font-dm text-gray-500 mt-4 max-w-xl leading-relaxed text-base">
                Join an existing curated group and travel with like-minded people. Fixed departure dates,
                shared costs, unforgettable stories — no solo planning required.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {livePackages.map((pkg, i) => (
                <motion.div
                  key={pkg.destination}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden group"
                  style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.destination}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Spots badge */}
                    <div
                      className="absolute top-3 right-3 font-dm text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: pkg.spots <= 3 ? "#FF6A00" : "#0A1F44",
                        color: "#fff",
                      }}
                    >
                      {pkg.spots} spots left
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-playfair font-bold text-xl" style={{ color: "#0A1F44" }}>
                          {pkg.destination}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={11} style={{ color: "#FF6A00" }} />
                          <span className="font-dm text-xs text-gray-400">{pkg.region}</span>
                        </div>
                      </div>
                      <span className="font-playfair font-bold text-lg" style={{ color: "#0A1F44" }}>
                        {pkg.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-5">
                      <Calendar size={12} style={{ color: "#0A1F44", opacity: 0.45 }} />
                      <span className="font-dm text-xs text-gray-400">{pkg.dates}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} style={{ color: "#0A1F44", opacity: 0.45 }} />
                        <span className="font-dm text-xs text-gray-400">Group travel</span>
                      </div>
                      <a
                        href="https://wa.me/919000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-dm font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200"
                        style={{
                          background: "#0A1F44",
                          color: "#fff",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0A1F44"; }}
                      >
                        Join Group
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
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

        <Testimonials />
        <BookingSteps />

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
                  href="https://wa.me/919000000000"
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
