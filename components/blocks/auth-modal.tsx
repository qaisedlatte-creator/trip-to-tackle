"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, User, Mail, Phone, LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function AuthModal() {
  const { authOpen, closeAuth, login, register } = useAuth();
  const [tab, setTab]     = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => { setEmail(""); setName(""); setPhone(""); setError(""); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = tab === "signin"
        ? login(email)
        : register(name, email, phone);
      setLoading(false);
      if (result.ok) { reset(); closeAuth(); }
      else setError(result.error ?? "Something went wrong.");
    }, 300);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "11px 14px 11px 40px",
    borderRadius: "10px", border: "1px solid #E5E7EB",
    fontSize: "14px", fontFamily: "var(--font-body)",
    outline: "none", background: "#fff",
  };

  return (
    <Dialog open={authOpen} onOpenChange={(o) => { if (!o) { reset(); closeAuth(); } }}>
      <DialogContent className="max-w-sm bg-white rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 flex items-start justify-between" style={{ background: "#0A1F44" }}>
          <div>
            <p className="font-dm text-xs text-white/60 uppercase tracking-wider mb-1">Trip 2 Tackle</p>
            <h3 className="font-playfair text-xl font-bold text-white">
              {tab === "signin" ? "Welcome Back" : "Create Account"}
            </h3>
          </div>
          <button onClick={() => { reset(); closeAuth(); }} className="text-white/60 hover:text-white mt-0.5">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(["signin", "register"] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className="flex-1 py-3 font-dm text-sm font-medium transition-colors"
              style={{
                color: tab === t ? "#0A1F44" : "#9E9A94",
                borderBottom: tab === t ? "2px solid #FF6A00" : "2px solid transparent",
              }}
            >
              {t === "signin" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === "register" && (
            <div style={{ position: "relative" }}>
              <User size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9E9A94" }} />
              <input
                required type="text" placeholder="Full Name"
                value={name} onChange={e => setName(e.target.value)}
                style={inp}
              />
            </div>
          )}

          <div style={{ position: "relative" }}>
            <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9E9A94" }} />
            <input
              required type="email" placeholder="Email Address"
              value={email} onChange={e => setEmail(e.target.value)}
              style={inp}
            />
          </div>

          {tab === "register" && (
            <div style={{ position: "relative" }}>
              <Phone size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#9E9A94" }} />
              <input
                required type="tel" placeholder="Phone Number"
                value={phone} onChange={e => setPhone(e.target.value)}
                style={inp}
              />
            </div>
          )}

          {error && (
            <p className="font-dm text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-dm font-bold text-sm py-3 rounded-xl transition-all"
            style={{ background: "#FF6A00", color: "#fff", opacity: loading ? 0.7 : 1 }}
          >
            <LogIn size={15} />
            {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
          </button>

          <p className="font-dm text-xs text-center text-gray-400">
            {tab === "signin" ? "No account yet? " : "Already have one? "}
            <button type="button" onClick={() => { setTab(tab === "signin" ? "register" : "signin"); setError(""); }}
              className="text-[#FF6A00] font-medium underline">
              {tab === "signin" ? "Register" : "Sign In"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
