"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/#packages", label: "Packages" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/campus-ambassador", label: "Campus Ambassador" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <Image
              src="/logo.png"
              alt="Trip 2 Tackle"
              width={130}
              height={36}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.slice(0, 5).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-dm text-sm font-medium transition-colors duration-200 relative ${
                  pathname === l.href ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFB03A] rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white border border-white/50 hover:border-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10 font-dm"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <Link
              href="/#packages"
              className="bg-white hover:bg-white/90 text-[#003060] px-4 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 font-dm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#003060] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Image
                src="/logo.png"
                alt="Trip 2 Tackle"
                width={120}
                height={34}
                style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
              <button onClick={() => setOpen(false)} className="text-white">
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-7">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={l.href}
                    className={`font-playfair text-3xl font-semibold transition-colors ${
                      pathname === l.href
                        ? "text-[#FFB03A]"
                        : "text-white hover:text-white/70"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-4"
              >
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white border border-white/40 px-5 py-2.5 rounded-lg text-base min-h-[44px] font-dm"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
