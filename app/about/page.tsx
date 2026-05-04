"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Globe, Users, Star, Shield, Compass } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

const team = [
  {
    name: "M Doondi Karthik",
    role: "Founder & Managing Director",
    initials: "MDK",
    bio: "Passionate traveller and entrepreneur from Andhra Pradesh. Founded Trip 2 Tackle to give South Indian travellers access to expertly curated group journeys at honest, transparent prices.",
  },
  {
    name: "P. Sashank Reddy",
    role: "Co-Founder & Head of Operations",
    initials: "PSR",
    bio: "Handles logistics, partner networks, and on-ground coordination to ensure every Trip 2 Tackle departure runs smoothly — from Vijayawada to Vaishno Devi.",
  },
];

const values = [
  {
    Icon: Heart,
    title: "People First",
    desc: "Every package is built around the traveller — their budget, pace, and expectations.",
  },
  {
    Icon: Shield,
    title: "100% Transparent",
    desc: "No hidden charges, no surprises. We explain every cost before you commit.",
  },
  {
    Icon: Globe,
    title: "Reach Everywhere",
    desc: "From Kerala's backwaters to Bali's terraces, we cover India and beyond.",
  },
  {
    Icon: Users,
    title: "Community-Driven",
    desc: "Our groups are curated for genuine connection, not just co-travellers.",
  },
  {
    Icon: Star,
    title: "Expert Guided",
    desc: "Every destination comes with local guides, not generic tour commentary.",
  },
  {
    Icon: Compass,
    title: "Custom-Ready",
    desc: "No trip is too unique. We design itineraries from scratch for any request.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#0A1F44] px-4 pb-24 pt-36 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,0,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,106,0,0.1),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-3xl">
              <p className="section-label mb-4 text-white/45">Our Story</p>
              <h1 className="font-playfair text-[clamp(44px,7vw,76px)] font-bold leading-[0.95] text-white">
                We Don&apos;t Just Book Trips.{" "}
                <span className="italic text-[#FF6A00]">We Build Memories.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-dm text-lg leading-8 text-white/62">
                Trip 2 Tackle was born in Kochi with a single belief — that group travel should feel personal,
                not transactional. Over the years, we&apos;ve grown into a full-service travel agency serving
                individuals, families, corporates, and pilgrims across India and internationally.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
                >
                  Explore Our Destinations <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 font-dm text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS BAND */}
        <section className="bg-white py-10 border-b border-[#0A1F44]/08">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: "500+", label: "Happy Travellers" },
                { value: "50+", label: "Destinations" },
                { value: "5+", label: "Years of Service" },
                { value: "4.9 ★", label: "Satisfaction Rate" },
              ].map((s) => (
                <motion.div key={s.label} {...fadeUp} className="text-center">
                  <p className="font-playfair text-4xl font-bold text-[#0A1F44]">{s.value}</p>
                  <p className="mt-1 font-dm text-sm text-[#0A1F44]/55">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="bg-[#F7F7F7] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="relative h-[480px] overflow-hidden rounded-[24px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80"
                  alt="Our story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(10,31,68,0.6)_0%,rgba(10,31,68,0.2)_60%)]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-5 backdrop-blur-sm border border-white/20">
                  <p className="font-playfair text-2xl font-bold text-white">Founded in Andhra Pradesh</p>
                  <p className="mt-2 font-dm text-sm text-white/70">
                    Starting with group trips from Vijayawada, growing to serve travellers across Andhra Pradesh, Telangana, and beyond.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.12 }}
              >
                <p className="section-label mb-4">The Journey</p>
                <h2 className="font-playfair text-[clamp(30px,4vw,48px)] font-bold leading-tight text-[#0A1F44]">
                  From Local Trips to{" "}
                  <span className="italic text-[#FF6A00]">Global Adventures</span>
                </h2>
                <div className="mt-6 space-y-5 font-dm text-[#0A1F44]/70 leading-8">
                  <p>
                    It started with a vision to give Andhra Pradesh travellers the kind of expertly organised group
                    travel that was previously only accessible to metro cities. Our founders believed that great
                    travel shouldn&apos;t require a big city address.
                  </p>
                  <p>
                    Trip 2 Tackle was founded in Vijayawada, Andhra Pradesh. In just a few years, we&apos;ve helped
                    hundreds of travellers from across AP and Telangana discover India&apos;s most stunning
                    landscapes, international beach escapes, and deeply spiritual pilgrimage circuits.
                  </p>
                  <p>
                    Today, we offer group packages, corporate travel, sacred pilgrimages, and fully custom itineraries
                    — all anchored in the belief that great travel means no hidden charges, real expertise, and
                    genuine care for every traveller in your group.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-14 text-center">
              <p className="section-label mb-3">What We Stand For</p>
              <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                Our Core Values
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="rounded-2xl border border-[#0A1F44]/08 bg-[#F7F8FF] p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A1F44]/08">
                    <Icon size={22} color="#0A1F44" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#0A1F44]">{title}</h3>
                  <p className="mt-2 font-dm text-sm leading-6 text-[#0A1F44]/60">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="bg-[#F7F7F7] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-14 text-center">
              <p className="section-label mb-3">The People Behind the Trips</p>
              <h2 className="font-playfair text-3xl font-bold text-[#0A1F44] md:text-4xl">
                Meet the Team
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-dm text-gray-500">
                Travellers at heart, professionals by trade. Every member of our team has personally visited the
                destinations they recommend.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-7 sm:grid-cols-2">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(10,31,68,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(10,31,68,0.13)]"
                >
                  <div className="flex h-52 items-center justify-center bg-[#0A1F44]">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FF6A00] shadow-[0_0_0_4px_rgba(255,106,0,0.25)]">
                      <span className="font-playfair text-3xl font-bold text-white tracking-tight">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-playfair text-xl font-bold text-[#0A1F44]">{member.name}</p>
                    <p className="mt-0.5 font-dm text-xs font-semibold uppercase tracking-wider text-[#FF6A00]">
                      {member.role}
                    </p>
                    <p className="mt-3 font-dm text-sm leading-6 text-[#0A1F44]/65">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A1F44] py-24 px-4">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-4 text-white/45">Get in Touch</p>
            <h2 className="font-playfair text-3xl font-bold text-white md:text-4xl">
              Ready to Plan Your Next Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-dm text-base leading-7 text-white/55">
              Our travel experts are on hand to craft a trip tailored exactly to you — whether it&apos;s a
              weekend getaway or a month-long adventure.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-3 font-dm text-sm font-bold text-white transition-colors hover:bg-[#e55f00]"
              >
                Contact Us <ArrowRight size={16} />
              </Link>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3 font-dm text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse Destinations
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
