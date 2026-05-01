"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Destination } from "@/lib/destinations";

interface Props {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({ destination, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="scroll-snap-child"
    >
      <Link href={`/destinations/${destination.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] min-w-[260px] max-w-[300px]">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Arrow button top-right */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white">
            <ArrowUpRight size={16} className="text-white group-hover:text-[#0A1F44] transition-colors" />
          </div>

          {/* Content bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#BECAE6]" />
              <span className="font-dm text-xs text-white/70">{destination.region}</span>
            </div>
            <h3 className="font-playfair text-xl font-semibold text-white leading-tight">
              {destination.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="price-tag">Starting {destination.priceLabel}</span>
              <span className="text-xs font-dm text-white/50 uppercase tracking-wider">
                {destination.type_label}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

