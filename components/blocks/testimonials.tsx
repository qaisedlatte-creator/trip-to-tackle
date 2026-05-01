"use client";
import { motion } from "framer-motion";

const allTestimonials = [
  {
    text: "Trip 2 Tackle made our Kashmir trip absolutely magical. The houseboat on Dal Lake was unforgettable.",
    name: "Rahul Menon",
    location: "Dubai, UAE",
    package: "Kashmir Snow Escape",
    rating: 5,
  },
  {
    text: "Best Wayanad weekend package. The jungle resort was stunning and price was unbeatable from Kochi.",
    name: "Priya Krishnan",
    location: "Bangalore",
    package: "Wayanad Weekend",
    rating: 5,
  },
  {
    text: "Bali was a dream. Every detail handled perfectly — from Seminyak villa to Mt. Batur sunrise trek.",
    name: "Arjun Suresh",
    location: "Kochi, Kerala",
    package: "Bali Soul Journey",
    rating: 5,
  },
  {
    text: "Thailand trip was flawless. Trip 2 Tackle handled everything — flights, hotels, and transfers.",
    name: "Fathima Nair",
    location: "Kozhikode",
    package: "Thailand Adventure",
    rating: 5,
  },
  {
    text: "Sar Pass trek was the experience of a lifetime. The team was responsive via WhatsApp throughout.",
    name: "Vishnu Raj",
    location: "Thrissur",
    package: "Sar Pass Trek",
    rating: 5,
  },
  {
    text: "Maldives for our honeymoon — water villa, snorkeling, sunset dinner. Pure perfection.",
    name: "Anjali & Deepak",
    location: "Kochi",
    package: "Maldives Luxury Retreat",
    rating: 5,
  },
  {
    text: "Vietnam in 8 days — Ha Long Bay, Hoi An, Ho Chi Minh. Trip 2 Tackle nailed every single detail.",
    name: "Mohammed Shafeeq",
    location: "Calicut",
    package: "Vietnam Explorer",
    rating: 5,
  },
  {
    text: "Alappuzha houseboat overnight was the most peaceful experience I've ever had. Highly recommend.",
    name: "Sreelakshmi T.",
    location: "Bangalore",
    package: "Alappuzha Backwaters",
    rating: 5,
  },
  {
    text: "Singapore with family — Universal Studios, Gardens by the Bay, everything sorted perfectly.",
    name: "Rajan Pillai",
    location: "Abu Dhabi",
    package: "Singapore Family Tour",
    rating: 5,
  },
];

type Testimonial = typeof allTestimonials[0];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFB03A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md mb-4 flex flex-col gap-3">
      <StarRating count={t.rating} />
      <p className="font-dm text-gray-700 text-sm leading-relaxed">
        &ldquo;{t.text}&rdquo;
      </p>
      <div>
        <p className="font-dm text-sm font-semibold text-[#003060]">{t.name}</p>
        <p className="font-dm text-xs text-gray-400 mt-0.5">{t.location} · {t.package}</p>
      </div>
    </div>
  );
}

interface ColumnProps {
  testimonials: Testimonial[];
  duration: number;
  reverse?: boolean;
  className?: string;
}

function ScrollingColumn({ testimonials, duration, reverse = false, className = "" }: ColumnProps) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      className={`overflow-hidden relative flex-1 min-w-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] ${className}`}
    >
      <motion.div
        animate={{ y: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col"
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const col1 = allTestimonials.slice(0, 3);
  const col2 = allTestimonials.slice(3, 6);
  const col3 = allTestimonials.slice(6, 9);

  return (
    <section className="bg-[#003060] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label text-[#BECAE6] mb-2">What Travelers Say</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
            Real Stories, Real Journeys
          </h2>
        </div>

        {/* Columns — show 1 on mobile, 3 on desktop */}
        <div className="flex gap-4 h-[520px]">
          <ScrollingColumn testimonials={col1} duration={18} />
          <ScrollingColumn testimonials={col2} duration={22} className="hidden md:flex" />
          <ScrollingColumn testimonials={col3} duration={15} reverse className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}

