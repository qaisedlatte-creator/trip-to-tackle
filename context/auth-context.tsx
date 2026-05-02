"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Booking {
  bookingRef: string;
  packageId: string;
  packageName: string;
  destination: string;
  travelers: number;
  travelDate: string;
  totalPaid: number;
  bookedAt: string;
}

interface AuthCtx {
  user: User | null;
  bookings: Booking[];
  login: (email: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, phone: string) => { ok: boolean; error?: string };
  logout: () => void;
  addBooking: (b: Booking) => void;
  authOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const DB_KEY      = "t2t_users_db";
const SESSION_KEY = "t2t_session";
const bookingsKey = (id: string) => `t2t_bookings_${id}`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [authOpen, setAuthOpen] = useState(false);

  /* ── restore session on mount ── */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const u: User = JSON.parse(stored);
        setUser(u);
        const bk = localStorage.getItem(bookingsKey(u.id));
        if (bk) setBookings(JSON.parse(bk));
      }
    } catch { /* ignore */ }
  }, []);

  const login = useCallback((email: string): { ok: boolean; error?: string } => {
    try {
      const db: User[] = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
      const found = db.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (!found) return { ok: false, error: "No account found with this email. Please register first." };
      setUser(found);
      localStorage.setItem(SESSION_KEY, JSON.stringify(found));
      const bk = localStorage.getItem(bookingsKey(found.id));
      setBookings(bk ? JSON.parse(bk) : []);
      return { ok: true };
    } catch { return { ok: false, error: "Something went wrong. Please try again." }; }
  }, []);

  const register = useCallback((name: string, email: string, phone: string): { ok: boolean; error?: string } => {
    try {
      const db: User[] = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
      if (db.find(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
        return { ok: false, error: "An account with this email already exists. Please sign in." };
      }
      const newUser: User = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        createdAt: new Date().toISOString(),
      };
      db.push(newUser);
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      setUser(newUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      setBookings([]);
      return { ok: true };
    } catch { return { ok: false, error: "Something went wrong. Please try again." }; }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const addBooking = useCallback((b: Booking) => {
    setUser(u => {
      if (!u) return u;
      setBookings(prev => {
        const updated = [b, ...prev];
        localStorage.setItem(bookingsKey(u.id), JSON.stringify(updated));
        return updated;
      });
      return u;
    });
  }, []);

  const openAuth  = useCallback(() => setAuthOpen(true), []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <Ctx.Provider value={{ user, bookings, login, register, logout, addBooking, authOpen, openAuth, closeAuth }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
