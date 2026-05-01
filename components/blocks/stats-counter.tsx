"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Trips Planned" },
  { value: 13, suffix: "", label: "Destinations" },
  { value: 98, suffix: "%", label: "Happy Travelers" },
  { value: 24, suffix: "/7", label: "Support" },
];

function Counter({ value, suffix, label }: Stat) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center px-4 py-3">
      <p className="font-space text-3xl md:text-4xl font-bold text-white">
        {count}
        <span className="text-[#FFB03A]">{suffix}</span>
      </p>
      <p className="font-dm text-sm text-white/70 mt-1">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="bg-[#2571BC] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x divide-white/20">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}

