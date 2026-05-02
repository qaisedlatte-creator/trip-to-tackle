import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFloat from "@/components/blocks/whatsapp-float";
import AuthModal from "@/components/blocks/auth-modal";
import { AuthProvider } from "@/context/auth-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-var",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-var",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-var",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Trip 2 Tackle — Travel to Experience",
  description:
    "Group travel packages across India and beyond. Live departures, real groups, unforgettable journeys.",
  keywords: "travel, group packages, India, international, Kerala, Kashmir, Bali",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Trip 2 Tackle",
  },
};

/* viewport-fit=cover extends content under iOS notch/home bar,
   themeColor colours the Safari chrome to match the hero            */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A1F44",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased text-[#171717]">
        <AuthProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <WhatsAppFloat />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
