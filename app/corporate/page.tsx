"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Briefcase, Globe, Users, BarChart3, Award, HeadphonesIcon,
  CheckCircle, ChevronLeft, ChevronRight, Star, MessageCircle
} from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import BookingForm from "@/components/blocks/booking-form";
import LogoCarousel from "@/components/blocks/logo-carousel";
import { corporatePackages } from "@/lib/corporate";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

const services = [
  {
    Icon: Briefcase,
    title: "MICE Travel",
    desc: "Meetings, incentives, conferences, and exhibitions — end-to-end logistics handled by a dedicated MICE specialist.",
  },
  {
    Icon: Users,
    title: "Team Offsites",
    desc: "Retreat-style experiences that build cohesion, creativity, and morale across teams of 10 to 500+.",
  },
  {
    Icon: Award,
    title: "Incentive Travel",
    desc: "Reward your top performers with curated escapes — Bali, Maldives, or Kashmir — fully managed.",
  },
  {
    Icon: Globe,
    title: "Rotational Client Travel",
    desc: "Seamless coordination for client visiting circuits across India with accommodation, transport, and meeting prep.",
  },
  {
    Icon: BarChart3,
    title: "Annual Conference Trips",
    desc: "Venue sourcing, group transfers, pre/post-conference excursions and full event-day logistics.",
  },
  {
    Icon: HeadphonesIcon,
    title: "24/7 Dedicated Support",
    desc: "A named account manager on every corporate trip. One call solves everything, at any hour.",
  },
];

const testimonials = [
  {
    name: "Anand Krishnamurthy",
    title: "VP Operations, Infosys BPM",
    quote:
      "Trip 2 Tackle handled our 120-person Goa offsite without a single hitch. From airport transfers to team dinners, everything was flawless. We&apos;ve booked them three years running.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
  },
  {
    name: "Meera Subramaniam",
    title: "HR Director, TCS Kerala",
    quote:
      "We needed a Kashmir incentive trip for 60 people in under 3 weeks. Trip 2 Tackle delivered perfectly — every detail covered, budget respected, team delighted.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
  },
  {
    name: "Rajesh Nambiar",
    title: "CEO, Cochin Shipyard Ltd.",
    quote:
      "Exceptional service throughout our conference + Bali extension. The dedicated support line made last-minute changes stress-free. Highly recommend for corporate groups.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
  },
  {
    name: "Sunita Pillai",
    title: "Head of L&D, HDFC Life",
    quote:
      "Our annual leadership retreat was beautifully organised. Great venues, thoughtful itinerary, and a team that genuinely cared about the experience. 10/10.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
  },
];


export default function CorporatePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveTestimonial((p) => (p + 1) % testimonials.length);
  };

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative min-h-[90vh] overflow-hidden bg-[#040f22]">
          <Image
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=85"
            alt="Corporate Travel"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,15,34,0.98)_0%,rgba(10,31,68,0.85)_50%,rgba(4,15,34,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,106,0,0.12),transparent_55%)]" />

          <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 py-32 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/08 px-4 py-2 backdrop-blur-sm">
                <Briefcase size={14} className="text-[#FF6A00]" />
                <span className="font-dm text-xs font-semibold uppercase tracking-widest text-white/70">
                  Corporate Travel Services
                </span>
              </div>
              <h1 className="font-playfair text-[clamp(42px,7vw,80px)] font-bold leading-[0.95] text-white">
                Enterprise Travel,{" "}
                <span className="italic text-[#FF6A00]">Effortlessly Managed.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-dm text-lg leading-8 text-white/60">
                From board retreats to MICE programmes for 500+ attendees — Trip 2 Tackle delivers
                frictionless corporate travel with fixed pricing, a dedicated account manager, and
                zero surprises.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => setShowBooking(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-3.5 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
                >
                  Get a Corporate Quote <ArrowRight size={16} />
                </button>
                <a
                  href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20planning%20a%20corporate%20trip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-dm text-sm font-semibold text-white hover:bg-white/08 transition"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              {[
                { value: "200+", label: "Corporate Trips" },
                { value: "10k+", label: "Business Travellers" },
                { value: "50+", label: "Corporate Clients" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-playfair text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 font-dm text-xs text-white/45 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="bg-[#F5F6FA] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-14">
              <p className="section-label mb-3">What We Offer</p>
              <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                Complete Corporate Travel Solutions
              </h2>
              <p className="mt-3 max-w-2xl font-dm text-[#0A1F44]/60 leading-7">
                Whether it&apos;s a one-day offsite or a 10-day international incentive tour, we handle
                every detail so your team can focus on what matters.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="service-card relative overflow-hidden rounded-[20px] border border-[#0A1F44]/08 p-7"
                  style={{ background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)" }}
                >
                  <div className="service-card-overlay" />
                  <div className="relative z-10">
                    <div
                      className="service-card-icon mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: "rgba(10,31,68,0.08)" }}
                    >
                      <Icon size={22} style={{ color: "#0A1F44" }} />
                    </div>
                    <h3 className="service-card-title font-playfair text-lg font-bold" style={{ color: "#0A1F44" }}>
                      {title}
                    </h3>
                    <p className="service-card-desc mt-2 font-dm text-sm leading-6" style={{ color: "rgba(10,31,68,0.6)" }}>
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENT LOGOS — animated carousel */}
        <LogoCarousel
          label="Trusted by leading organisations"
          heading="Companies That Trust Us"
        />

        {/* TESTIMONIALS CAROUSEL */}
        <section className="bg-[#0A1F44] py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <p className="section-label mb-3 text-white/45">Client Voices</p>
              <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
                What Our Corporate Clients Say
              </h2>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden rounded-[28px] bg-white/06 border border-white/10 p-8 sm:p-10 backdrop-blur-sm">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex gap-0.5 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#FF6A00" className="text-[#FF6A00]" />
                    ))}
                  </div>
                  <p className="font-playfair text-xl font-medium italic leading-8 text-white sm:text-2xl">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#FF6A00]/40">
                      <Image
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="font-dm font-bold text-white">
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="font-dm text-sm text-white/55">
                        {testimonials[activeTestimonial].title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setActiveTestimonial(i); }}
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: i === activeTestimonial ? 24 : 8,
                        background: i === activeTestimonial ? "#FF6A00" : "rgba(255,255,255,0.25)",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="bg-[#F5F6FA] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-12">
              <p className="section-label mb-3">Corporate Packages</p>
              <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                Ready-to-Deploy Programmes
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {corporatePackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                  className="overflow-hidden rounded-[24px] border border-[#0A1F44]/08 bg-white shadow-[0_10px_30px_rgba(10,31,68,0.06)]"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.1)_0%,rgba(10,31,68,0.8)_100%)]" />
                    {pkg.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#FF6A00] px-3 py-1 font-dm text-xs font-bold text-white">
                        {pkg.badge}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-dm text-[11px] uppercase tracking-[0.16em] text-white/70">{pkg.destination}</p>
                      <h2 className="mt-1 font-playfair text-2xl font-bold text-white">{pkg.name}</h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-dm text-xs uppercase tracking-[0.16em] text-[#0A1F44]/45">{pkg.duration}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pkg.includes.slice(0, 4).map((item) => (
                        <span key={item} className="rounded-full bg-[#0A1F44]/06 px-3 py-1.5 font-dm text-xs font-medium text-[#0A1F44]/75">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 font-dm text-sm leading-6 text-[#0A1F44]/62">{pkg.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#0A1F44]/08 pt-4">
                      <div>
                        <p className="font-dm text-xs text-[#0A1F44]/45">Starting from</p>
                        <p className="font-space text-xl font-bold text-[#0A1F44]">{pkg.priceLabel}</p>
                      </div>
                      <button
                        onClick={() => setShowBooking(true)}
                        className="rounded-xl bg-[#0A1F44] px-5 py-2.5 font-dm text-sm font-bold text-white transition-colors hover:bg-[#FF6A00]"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <motion.div {...fadeUp}>
                <p className="section-label mb-3">Why Trip 2 Tackle</p>
                <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                  The Enterprise Advantage
                </h2>
                <p className="mt-4 font-dm text-[#0A1F44]/60 leading-7">
                  We understand that corporate travel isn&apos;t just logistics — it&apos;s a reflection of
                  your company culture. We help you travel professionally.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Fixed group pricing with GST-compliant invoicing",
                    "Named account manager from planning to post-trip",
                    "Emergency support line, 24/7 on all active trips",
                    "Customisable T&C and cancellation policies for corporates",
                    "Multi-city and rotational travel coordination",
                    "Post-trip expense reports and analytics",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={17} className="mt-0.5 shrink-0 text-[#FF6A00]" />
                      <span className="font-dm text-sm text-[#0A1F44]/75">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="relative h-[420px] overflow-hidden rounded-[24px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                  alt="Corporate team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A1F44] py-20 px-4">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-3 text-white/45">Start Planning</p>
            <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
              Plan Your Next Corporate Trip
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-dm text-base leading-7 text-white/55">
              Share your requirements and our corporate travel team will send a tailored proposal
              within 24 hours — budget, itinerary, and group pricing included.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowBooking(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-3.5 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
              >
                Get Corporate Quote <ArrowRight size={16} />
              </button>
              <a
                href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20planning%20a%20corporate%20trip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-dm text-sm font-semibold text-white hover:bg-white/08 transition"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* BOOKING FORM SLIDE-IN */}
      {showBooking && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg rounded-[28px] bg-white p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-y-auto"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="section-label mb-1">Corporate Enquiry</p>
                <h3 className="font-playfair text-2xl font-bold text-[#0A1F44]">Request a Quote</h3>
              </div>
              <button
                onClick={() => setShowBooking(false)}
                className="rounded-lg p-2 text-[#0A1F44]/40 hover:bg-[#0A1F44]/08 hover:text-[#0A1F44] transition"
              >
                ✕
              </button>
            </div>
            <BookingForm
              tourName="Corporate Travel"
              price="Custom Pricing"
              onClose={() => setShowBooking(false)}
            />
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}
