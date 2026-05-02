"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, User, MapPin, Calendar, Users, CreditCard, CheckCircle } from "lucide-react";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import { useAuth, type Booking } from "@/context/auth-context";
import { formatINR } from "@/lib/razorpay";

export default function AccountPage() {
  const { user, bookings, logout, openAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) { openAuth(); router.push("/"); }
  }, [user, openAuth, router]);

  if (!user) return null;

  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <Navbar />
      <main style={{ background: "#F7F7F7", minHeight: "100vh", paddingTop: "96px", paddingBottom: "80px" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden mb-8"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
          >
            <div className="px-6 py-5 flex items-center justify-between" style={{ background: "#0A1F44" }}>
              <div className="flex items-center gap-4">
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "#FF6A00", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18, color: "#fff",
                }}>
                  {initials}
                </div>
                <div>
                  <p className="font-playfair text-lg font-bold text-white">{user.name}</p>
                  <p className="font-dm text-xs text-white/55">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="flex items-center gap-2 font-dm text-sm font-medium px-4 py-2 rounded-lg transition-all"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: <User size={15} />, label: "Full Name", value: user.name },
                { icon: <CreditCard size={15} />, label: "Email", value: user.email },
                { icon: <Users size={15} />, label: "Phone", value: user.phone || "—" },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center gap-1.5 font-dm text-xs text-gray-400 mb-1">
                    {item.icon} {item.label}
                  </div>
                  <p className="font-dm text-sm font-medium text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bookings */}
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6" style={{ color: "#0A1F44" }}>
              My Bookings
              {bookings.length > 0 && (
                <span className="font-dm text-sm font-normal text-gray-400 ml-2">({bookings.length} total)</span>
              )}
            </h2>

            {bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-playfair text-xl font-bold mb-2" style={{ color: "#0A1F44" }}>No bookings yet</h3>
                <p className="font-dm text-sm text-gray-500 mb-6">Your confirmed trips will appear here.</p>
                <a href="/#packages"
                  className="inline-flex font-dm font-semibold text-sm px-6 py-3 rounded-xl transition-all"
                  style={{ background: "#0A1F44", color: "#fff", textDecoration: "none" }}>
                  Browse Packages
                </a>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b: Booking, i: number) => (
                  <motion.div
                    key={b.bookingRef}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="bg-white rounded-2xl p-6"
                    style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}
                  >
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle size={14} className="text-green-500" />
                          <span className="font-dm text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            Confirmed
                          </span>
                        </div>
                        <h3 className="font-playfair text-lg font-bold" style={{ color: "#0A1F44" }}>{b.packageName}</h3>
                      </div>
                      <div className="text-right">
                        <p className="font-dm text-xs text-gray-400">Total Paid</p>
                        <p className="font-space text-xl font-bold" style={{ color: "#0A1F44" }}>{formatINR(b.totalPaid)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      {[
                        { icon: <MapPin size={13} />, label: "Destination", value: b.destination },
                        { icon: <Users size={13} />, label: "Travelers", value: `${b.travelers} person${b.travelers > 1 ? "s" : ""}` },
                        { icon: <Calendar size={13} />, label: "Travel Date", value: b.travelDate || "TBD" },
                        { icon: <CreditCard size={13} />, label: "Booking Ref", value: b.bookingRef },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex items-center gap-1 font-dm text-xs text-gray-400 mb-0.5">
                            {item.icon} {item.label}
                          </div>
                          <p className="font-dm text-sm font-medium text-gray-700">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
