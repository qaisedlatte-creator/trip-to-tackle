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
  Clock3,
  MapPin,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import PaymentModal from "@/components/blocks/payment-modal";
import { packages, type Package } from "@/lib/packages";

const fadeInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function PackageDetailPage() {
  const params = useParams<{ id: string }>();
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const pkg = packages.find((item) => item.id === id);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openBooking = (targetPkg: Package) => {
    setSelectedPkg(targetPkg);
    setModalOpen(true);
  };

  if (!pkg) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F7F7F7] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              {...fadeInView}
              className="rounded-[28px] bg-white px-8 py-12 text-center shadow-[0_18px_50px_rgba(10,31,68,0.08)]"
            >
              <p className="section-label mb-4">Package Missing</p>
              <h1 className="font-playfair text-4xl font-bold text-[#0A1F44]">
                This package isn&apos;t available
              </h1>
              <p className="mx-auto mt-4 max-w-xl font-dm text-base leading-7 text-[#0A1F44]/65">
                The itinerary may have changed or the link may be outdated. Browse the current group packages from the
                home page.
              </p>
              <Link
                href="/#packages"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-5 py-3 font-dm text-sm font-semibold text-white"
              >
                <ArrowLeft size={16} />
                Back to Packages
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PaymentModal pkg={selectedPkg} open={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />

      <main className="bg-[#F7F7F7]">
        <section className="relative min-h-[88vh] overflow-hidden bg-[#0A1F44]">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.18)_0%,rgba(10,31,68,0.54)_42%,rgba(10,31,68,0.96)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <div>
              <Link
                href="/#packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-dm text-sm font-medium text-white/85 backdrop-blur-md"
              >
                <ArrowLeft size={15} />
                All Packages
              </Link>
            </div>

            <motion.div {...fadeInView} className="max-w-3xl">
              <p className="mb-4 font-dm text-xs font-bold uppercase tracking-[0.28em] text-white/70">
                {pkg.destination}
              </p>
              <h1 className="font-playfair text-[clamp(48px,8vw,88px)] font-bold leading-[0.95] text-white">
                {pkg.name}
              </h1>
              <p className="mt-5 max-w-2xl font-dm text-lg leading-8 text-white/65">{pkg.description}</p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#0A1F44]/8 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-4 py-5 sm:px-6 lg:px-8">
            {[
              { icon: MapPin, label: "Destination", value: pkg.destination },
              { icon: Clock3, label: "Duration", value: pkg.duration },
              { icon: CalendarDays, label: "Trip Length", value: `${pkg.days} Days / ${pkg.nights} Nights` },
              { icon: Wallet, label: "Price", value: pkg.priceLabel },
            ].map((item) => (
              <div
                key={item.label}
                className="flex min-w-[220px] items-center gap-3 rounded-full border border-[#0A1F44]/8 bg-[#F7F7F7] px-4 py-3 font-dm text-[#0A1F44]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6A00]/12 text-[#FF6A00]">
                  <item.icon size={18} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#0A1F44]/50">{item.label}</span>
                  <span className="block text-sm font-bold">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <motion.div {...fadeInView} className="mb-14">
                <p className="section-label mb-3">Day by Day</p>
                <h2 className="font-playfair text-4xl font-bold text-[#0A1F44]">Your Itinerary</h2>
                <p className="mt-4 max-w-2xl font-dm text-base leading-8 text-[#0A1F44]/65">
                  Every departure is paced for comfort while keeping the best experiences front and center.
                </p>
              </motion.div>

              <div className="mb-16">
                {pkg.itinerary?.map((item, index) => {
                  const isLast = index === pkg.itinerary!.length - 1;

                  return (
                    <motion.div
                      key={item.day}
                      {...fadeInView}
                      className="relative pl-20"
                      style={{ paddingBottom: isLast ? 0 : 28 }}
                    >
                      {!isLast && (
                        <div className="absolute left-[21px] top-12 bottom-0 w-[2px] bg-[linear-gradient(180deg,rgba(255,106,0,0.45)_0%,rgba(10,31,68,0.08)_100%)]" />
                      )}
                      <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6A00] font-dm text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,106,0,0.22)]">
                        {item.day}
                      </div>
                      <div className="rounded-[22px] border border-[#0A1F44]/6 bg-white px-6 py-6 shadow-[0_14px_40px_rgba(10,31,68,0.06)]">
                        <h3 className="font-dm text-lg font-bold text-[#0A1F44]">{item.title}</h3>
                        <p className="mt-3 font-dm text-[15px] leading-7 text-[#0A1F44]/65">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <motion.div {...fadeInView}>
                  <p className="section-label mb-3">Highlights</p>
                  <h2 className="font-playfair text-3xl font-bold text-[#0A1F44]">Why this trip stands out</h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {pkg.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#0A1F44] px-4 py-2 font-dm text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeInView}>
                  <p className="section-label mb-3">Included</p>
                  <h2 className="font-playfair text-3xl font-bold text-[#0A1F44]">What you get</h2>
                  <div className="mt-6 grid gap-3">
                    {pkg.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-[#0A1F44]/6 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(10,31,68,0.04)]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6A00]/12 text-[#FF6A00]">
                          <Check size={16} />
                        </span>
                        <span className="font-dm text-sm font-semibold text-[#0A1F44]">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div>
              <motion.div
                {...fadeInView}
                className="sticky top-24 overflow-hidden rounded-[28px] border border-[#0A1F44]/6 bg-white p-6 shadow-[0_22px_60px_rgba(10,31,68,0.1)]"
              >
                <div className="mb-5 overflow-hidden rounded-[22px]">
                  <div className="relative h-52">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.1)_0%,rgba(10,31,68,0.8)_100%)]" />
                    {pkg.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#FF6A00] px-3 py-1 font-dm text-xs font-bold text-white">
                        {pkg.badge}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-dm text-[11px] uppercase tracking-[0.14em] text-white/70">{pkg.duration}</p>
                      <h3 className="font-playfair text-3xl font-bold text-white">{pkg.name}</h3>
                    </div>
                  </div>
                </div>

                <p className="section-label mb-2">Secure Booking</p>
                <h2 className="font-playfair text-3xl font-bold text-[#0A1F44]">Reserve your seat</h2>
                <p className="mt-3 font-dm text-sm leading-7 text-[#0A1F44]/62">
                  Instant booking via Razorpay. Lock your package now and finalize your preferred travel date in the
                  checkout flow.
                </p>

                <div className="mt-5 rounded-[22px] border border-[#0A1F44]/6 bg-[#F7F7F7] p-5">
                  <p className="font-dm text-[11px] uppercase tracking-[0.14em] text-[#0A1F44]/50">Starting from</p>
                  <p className="mt-2 font-space text-4xl font-bold text-[#0A1F44]">{pkg.priceLabel}</p>
                  <p className="mt-1 font-dm text-sm text-[#0A1F44]/58">per person, with live booking confirmation</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {pkg.includes.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full bg-[#0A1F44]/6 px-3 py-1.5 font-dm text-xs font-medium text-[#0A1F44]/75">
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => openBooking(pkg)}
                  className="mt-6 w-full rounded-2xl bg-[#FF6A00] px-5 py-4 font-dm text-base font-bold text-white transition-colors hover:bg-[#e55f00]"
                >
                  Book Now
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#0A1F44] px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...fadeInView} className="mx-auto max-w-4xl text-center">
            <p className="section-label mb-4 text-white/45">Trip Support</p>
            <h2 className="font-playfair text-[clamp(34px,5vw,52px)] font-bold text-white">
              Need help choosing dates for {pkg.destination}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-dm text-base leading-8 text-white/62">
              We can help you compare departure windows, group sizes, and seasonal conditions before you book.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
