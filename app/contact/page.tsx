"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  const info = [
    {
      Icon: MapPin,
      label: "Office Address",
      value: "Vijayawada, Andhra Pradesh — 520 001, India",
    },
    { Icon: Phone, label: "Phone / WhatsApp", value: "+91 83092 18545" },
    { Icon: Mail, label: "Email", value: "hello@trip2tackle.com" },
    { Icon: Clock, label: "Business Hours", value: "Mon–Sat, 9:00 AM – 7:00 PM IST" },
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#0A1F44] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_50%)]" />
          <motion.div {...fadeUp} className="relative mx-auto max-w-4xl text-center">
            <p className="section-label mb-4 text-white/45">Let&apos;s Talk Travel</p>
            <h1 className="font-playfair text-[clamp(40px,6vw,68px)] font-bold text-white">
              Get in Touch
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-dm text-lg leading-8 text-white/62">
              Whether you have a quick question or want to plan your dream trip, our team responds within
              24 hours — usually much faster.
            </p>
          </motion.div>
        </section>

        {/* MAIN CONTENT */}
        <section className="bg-[#F7F7F7] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">

              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-[28px] bg-white p-8 shadow-[0_18px_60px_rgba(10,31,68,0.09)]"
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h2 className="font-playfair text-2xl font-bold text-[#0A1F44]">
                      Message Received!
                    </h2>
                    <p className="mt-3 font-dm text-[#0A1F44]/65 leading-7">
                      Thanks, <strong>{form.name}</strong>! We&apos;ll be in touch at{" "}
                      <strong>{form.email}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-8 rounded-xl bg-[#0A1F44] px-6 py-3 font-dm text-sm font-bold text-white hover:bg-[#FF6A00] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="section-label mb-2">Send a Message</p>
                    <h2 className="font-playfair text-2xl font-bold text-[#0A1F44] mb-7">
                      We&apos;d Love to Hear From You
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Rahul Menon"
                            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
                            Email Address *
                          </label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="rahul@example.com"
                            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
                            Subject
                          </label>
                          <select
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            className="w-full rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15"
                          >
                            <option value="">Select a topic</option>
                            <option>Holiday Package Enquiry</option>
                            <option>Corporate Travel</option>
                            <option>Pilgrimage Trip</option>
                            <option>Custom Itinerary</option>
                            <option>Group Booking</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50">
                          Your Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your trip — destination, dates, group size, any special requirements..."
                          className="w-full resize-none rounded-xl border border-[#0A1F44]/12 bg-[#F7F7F7] px-4 py-3 font-dm text-sm text-[#0A1F44] outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/15"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A1F44] px-6 py-4 font-dm text-base font-bold text-white transition-colors hover:bg-[#FF6A00] disabled:opacity-60"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending…
                          </span>
                        ) : (
                          <>
                            <Send size={17} /> Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* INFO */}
              <div className="space-y-5">
                {info.map(({ Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(10,31,68,0.07)]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00]/12">
                      <Icon size={20} color="#FF6A00" />
                    </div>
                    <div>
                      <p className="font-dm text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/45">{label}</p>
                      <p className="mt-1 font-dm text-sm font-medium text-[#0A1F44] leading-6">{value}</p>
                    </div>
                  </motion.div>
                ))}

                {/* WhatsApp CTA */}
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.44, duration: 0.5 }}
                  href="https://wa.me/918309218545?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20trip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-[#25D366] p-5 text-white shadow-[0_8px_24px_rgba(37,211,102,0.22)] transition-all hover:bg-[#1cb857] hover:shadow-[0_14px_36px_rgba(37,211,102,0.3)]"
                >
                  <MessageCircle size={22} />
                  <div>
                    <p className="font-dm font-bold">Chat on WhatsApp</p>
                    <p className="font-dm text-xs text-white/80">We typically reply within minutes</p>
                  </div>
                </motion.a>

                {/* Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.52, duration: 0.5 }}
                  className="overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(10,31,68,0.07)]"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5!2d80.6480!3d16.5062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9196ec327%3A0xa7e632a2fe58b70e!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Trip 2 Tackle Office Location"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
