import React from "react";
import { motion } from "framer-motion";
import GoldenParticles from "../effects/GoldenParticles";

export default function Loader({ text = "Crafting your invitation..." }) {
  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-ink-900"
    >
      <GoldenParticles count={80} />
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative h-20 w-20 sm:h-28 sm:w-28"
        >
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(212,160,60,0.15)"
              strokeWidth="2"
            />
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="rgba(212,160,60,0.15)"
              strokeWidth="2"
              strokeDasharray="2 6"
            />
            <path
              d="M60 6 a54 54 0 0 1 54 54"
              fill="none"
              stroke="url(#goldLoader)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="goldLoader" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f0d48a" />
                <stop offset="1" stopColor="#b9832c" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-script text-3xl text-gold-300">
            {"\u2665"}
          </div>
        </motion.div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 font-serif text-sm uppercase tracking-[0.4em] text-cream-200/70"
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
}
