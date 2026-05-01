"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Settings, Plane } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "Pick Your Destination",
    description: "Browse 14 domestic and international destinations. Filter by budget, type, and travel style.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Customize Your Tour",
    description: "Choose your dates, group size, and add-ons. Our Kerala experts tailor every detail.",
  },
  {
    icon: Plane,
    number: "03",
    title: "Confirm & Travel",
    description: "Pay via Razorpay or WhatsApp for bank transfer. We handle everything — you just pack.",
  },
];

export default function BookingSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D perspective tilt: starts tilted (rotateX 20deg), flattens to 0 as it enters view
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.7], [18, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  return (
    <section ref={containerRef} className="bg-white py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title above the card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-2">How It Works</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#003060]">
            Booking Made Easy as 1-2-3
          </h2>
        </motion.div>

        {/* 3D perspective wrapper */}
        <div style={{ perspective: "1000px" }}>
          <motion.div
            style={{ rotateX, scale, opacity }}
            className="bg-[#003060] rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Inner card content */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-10 gap-5 group hover:bg-[#002050] transition-colors duration-300"
                >
                  {/* Icon circle with number badge */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <step.icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FFB03A] flex items-center justify-center">
                      <span className="font-space text-xs font-bold text-[#003060]">{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="font-dm text-sm text-white/65 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#FFB03A] via-white/20 to-[#FFB03A]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

