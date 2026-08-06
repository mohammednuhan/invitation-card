import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaSignInAlt, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import GoldenParticles from "../components/effects/GoldenParticles";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-gold-300/40 bg-white/70 px-4 py-3 pl-12 font-sans text-sm text-ink-900 placeholder:text-ink-800/40 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300/40";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950 px-6">
      <GoldenParticles count={50} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-3xl gold-border luxury-shadow bg-cream-50/95 p-8 md:p-10"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold">
            <FaHeart />
          </div>
          <h1 className="font-script text-4xl text-ink-900">Admin Panel</h1>
          <p className="mt-1 font-serif text-sm italic text-ink-800/60">
            Sign in to manage the invitation
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={inputCls}
              autoComplete="username"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={inputCls}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 font-serif text-sm italic text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-luxury flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.25em] disabled:opacity-60"
          >
            <FaSignInAlt />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
