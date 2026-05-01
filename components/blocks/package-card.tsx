"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Package } from "@/lib/packages";

interface Props {
  pkg: Package;
  index?: number;
  onBook?: (pkg: Package) => void;
  layout?: "horizontal" | "card";
}

export default function PackageCard({ pkg, index = 0, onBook, layout = "card" }: Props) {
  if (layout === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row border border-gray-100"
      >
        {/* Image */}
        <div className="relative w-full md:w-64 lg:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {pkg.badge && (
            <div className="absolute top-3 left-3 bg-[#FFB03A] text-[#003060] text-xs font-space font-bold px-3 py-1 rounded-full">
              {pkg.badge}
            </div>
          )}
        </div>
        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#2571BC]" />
              <span className="font-dm text-sm text-[#2571BC] font-medium">{pkg.duration}</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-[#003060]">{pkg.name}</h3>
            <p className="font-dm text-sm text-gray-600 leading-relaxed">{pkg.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {pkg.includes.map((inc) => (
                <span key={inc} className="flex items-center gap-1 text-xs font-dm text-[#2571BC] bg-[#BECAE6]/30 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={11} className="text-[#2571BC]" />
                  {inc}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <div>
              <p className="font-dm text-xs text-gray-400 mb-0.5">Starting from</p>
              <p className="font-space text-2xl font-bold text-[#003060]">
                {pkg.priceLabel}
                <span className="text-sm text-gray-400 font-dm font-normal ml-1">/person</span>
              </p>
            </div>
            <Button
              onClick={() => onBook?.(pkg)}
              className="bg-[#FFB03A] hover:bg-[#e89c2a] text-[#003060] font-semibold px-6"
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Card layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {pkg.badge && (
          <div className="absolute top-3 left-3 bg-[#FFB03A] text-[#003060] text-xs font-space font-bold px-3 py-1 rounded-full">
            {pkg.badge}
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-[#003060]/80 backdrop-blur-sm text-white text-xs font-dm flex items-center gap-1 px-2.5 py-1.5 rounded-full">
          <Clock size={11} />
          {pkg.duration}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-playfair text-xl font-bold text-[#003060] mb-2">{pkg.name}</h3>
        <p className="font-dm text-sm text-gray-500 leading-relaxed mb-3 flex-1">{pkg.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.includes.slice(0, 3).map((inc) => (
            <span key={inc} className="text-xs font-dm text-[#2571BC] bg-[#BECAE6]/30 px-2 py-0.5 rounded-full">
              {inc}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="font-space text-xl font-bold text-[#003060]">{pkg.priceLabel}</p>
            <p className="font-dm text-xs text-gray-400">per person*</p>
          </div>
          <Button
            onClick={() => onBook?.(pkg)}
            className="bg-[#FFB03A] hover:bg-[#e89c2a] text-[#003060] font-semibold"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

