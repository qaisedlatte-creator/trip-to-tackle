import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/blocks/social-icons";

export default function Footer() {
  return (
    <footer className="bg-[#003060] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Trip 2 Tackle"
              width={140}
              height={40}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <p className="font-playfair text-lg text-white/80 italic leading-snug">
              Travel to Experience
            </p>
            <p className="font-dm text-sm text-white/60 leading-relaxed">
              Group travel packages across India and beyond. Live departures, real groups, unforgettable journeys.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFB03A] hover:text-[#003060] transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFB03A] hover:text-[#003060] transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-400 hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5 text-white">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: "/destinations", label: "All Destinations" },
                { href: "/#packages", label: "Group Packages" },
                { href: "/blog", label: "Blog" },
                { href: "/careers", label: "Careers" },
                { href: "/campus-ambassador", label: "Campus Ambassador" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-dm text-sm text-white/60 hover:text-[#BECAE6] transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2571BC] group-hover:bg-[#FFB03A] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5 text-white">Company</h4>
            <ul className="space-y-2">
              {[
                { href: "#", label: "About Us" },
                { href: "#", label: "Partners" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Terms & Conditions" },
                { href: "#", label: "Cancellation Policy" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-dm text-sm text-white/60 hover:text-[#BECAE6] transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2571BC] group-hover:bg-[#FFB03A] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <Phone size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                  <span className="font-dm text-sm text-white/60 group-hover:text-white transition-colors">
                    +91 90000 00000
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@trip2tackle.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                  <span className="font-dm text-sm text-white/60 group-hover:text-white transition-colors">
                    hello@trip2tackle.com
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#2571BC] mt-0.5 shrink-0" />
                <span className="font-dm text-sm text-white/60">
                  Kochi, Kerala, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#002050]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-dm text-xs text-white/50">
            © 2026 Trip 2 Tackle. All rights reserved.
          </p>
          <a
            href="https://webbes.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm text-xs text-white/50 hover:text-white/80 transition-colors"
          >
            Developed by <span className="text-[#FFB03A] font-semibold">Webbes</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
