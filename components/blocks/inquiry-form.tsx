"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!phone.trim()) errs.phone = "Phone is required";
    if (!message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, destination: "General Inquiry" }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle = (err?: string) => ({
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: `1px solid ${err ? "#ef4444" : "#E5E7EB"}`,
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
    background: "#fff",
    transition: "border-color 0.2s",
  });

  if (status === "success") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", gap: "16px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle size={32} color="#22c55e" />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", fontWeight: 700, color: "#0A1F44" }}>
          Message Sent!
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "#6b7280", fontSize: "14px", maxWidth: "280px" }}>
          We&apos;ll get back to you within 24 hours. Check your inbox!
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#FF6A00", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px", fontFamily: "var(--font-body)" }}>
          Full Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }}
          placeholder="Your full name"
          style={fieldStyle(errors.name)}
        />
        {errors.name && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", fontFamily: "var(--font-body)" }}>{errors.name}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px", fontFamily: "var(--font-body)" }}>
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
            placeholder="you@email.com"
            style={fieldStyle(errors.email)}
          />
          {errors.email && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", fontFamily: "var(--font-body)" }}>{errors.email}</p>}
        </div>
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px", fontFamily: "var(--font-body)" }}>
            Phone *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: "" })); }}
            placeholder="+91 98765 43210"
            style={fieldStyle(errors.phone)}
          />
          {errors.phone && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", fontFamily: "var(--font-body)" }}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px", fontFamily: "var(--font-body)" }}>
          Message *
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors(p => ({ ...p, message: "" })); }}
          placeholder="Tell us about your dream trip..."
          style={{ ...fieldStyle(errors.message), resize: "none" }}
        />
        {errors.message && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", fontFamily: "var(--font-body)" }}>{errors.message}</p>}
      </div>

      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", background: "#fef2f2", borderRadius: "10px" }}>
          <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: "13px", color: "#dc2626", fontFamily: "var(--font-body)" }}>
            Something went wrong. Please try again.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "#FF6A00",
          color: "#fff",
          padding: "13px 28px",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 700,
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          fontFamily: "var(--font-body)",
          transition: "background 0.2s",
          opacity: status === "loading" ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.background = "#d95f00"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF6A00"; }}
      >
        {status === "loading" ? "Sending..." : "Send Inquiry →"}
      </button>

      <p style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "var(--font-body)", textAlign: "center" }}>
        Powered by Formspree · Your data is secure
      </p>
    </form>
  );
}
