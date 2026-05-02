"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import PaymentModal from "@/components/blocks/payment-modal";
import { pilgrimages } from "@/lib/pilgrimages";
import type { Package } from "@/lib/packages";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function PilgrimagesPage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (pkg: Package) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
  };

  return (
    <>
      <PaymentModal pkg={selectedPkg} open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />

      <main className="bg-[#F7F7F7]">
        <section className="relative overflow-hidden bg-[#0A1F44] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.18),transparent_42%)]" />
          <motion.div {...fadeUp} className="relative mx-auto max-w-6xl text-center">
            <p className="section-label mb-4 text-white/45">Faith-led Journeys</p>
            <h1 className="font-playfair text-[clamp(44px,7vw,76px)] font-bold text-white">Sacred Pilgrimages</h1>
            <p className="mx-auto mt-5 max-w-3xl font-dm text-base leading-8 text-white/62">
              Pilgrimage routes planned with dependable stays, temple access coordination, and group-friendly pacing
              for families, seniors, and community departures.
            </p>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {pilgrimages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="overflow-hidden rounded-[24px] border border-[#0A1F44]/8 bg-white shadow-[0_10px_30px_rgba(10,31,68,0.06)]"
              >
                <div className="relative h-56 overflow-hidden">
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
                    <p className="font-dm text-[11px] uppercase tracking-[0.16em] text-white/70">
                      {pkg.destination}
                    </p>
                    <h2 className="mt-1 font-playfair text-3xl font-bold text-white">{pkg.name}</h2>
                  </div>
                </div>

                <div className="p-5">
                  <p className="font-dm text-xs uppercase tracking-[0.16em] text-[#0A1F44]/45">{pkg.duration}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pkg.includes.slice(0, 4).map((item) => (
                      <span key={item} className="rounded-full bg-[#0A1F44]/6 px-3 py-1.5 font-dm text-xs font-medium text-[#0A1F44]/75">
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 font-dm text-sm leading-7 text-[#0A1F44]/62">{pkg.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#0A1F44]/8 pt-4">
                    <div>
                      <p className="font-dm text-xs text-[#0A1F44]/45">Starting from</p>
                      <p className="font-space text-2xl font-bold text-[#0A1F44]">{pkg.priceLabel}</p>
                    </div>
                    <button
                      onClick={() => openModal(pkg)}
                      className="rounded-xl bg-[#0A1F44] px-5 py-3 font-dm text-sm font-bold text-white transition-colors hover:bg-[#FF6A00]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-[#0A1F44] px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
            <p className="section-label mb-4 text-white/45">Group Planning</p>
            <h2 className="font-playfair text-[clamp(34px,5vw,54px)] font-bold text-white">
              Planning a Group Pilgrimage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-dm text-base leading-8 text-white/62">
              We can organize temple circuits for families, associations, and community groups with departure support
              from Kerala and beyond.
            </p>
            <a
              href="https://wa.me/918309218545?text=Hi%2C%20I%27m%20planning%20a%20group%20pilgrimage"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center rounded-full bg-[#FF6A00] px-6 py-3 font-dm text-sm font-bold text-white"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
