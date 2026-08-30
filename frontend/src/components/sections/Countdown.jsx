import React from "react";
import { motion } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";
import GoldenParticles from "../effects/GoldenParticles";
import { container, itemFadeScale } from "../../animations/variants";

export default function Countdown({ data }) {
  const time = useCountdown(data.couple.date);
  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds }
  ];

  return (
    <section
      id="countdown"
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950 py-16 sm:min-h-[70vh] sm:py-24"
    >
      <GoldenParticles count={60} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <img src="/images/islamic-bg.png" alt="" className="h-full w-full object-cover" />
      </div>

      <motion.div
        variants={container(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <motion.p
          variants={itemFadeScale}
          className="mb-3 font-serif text-xs uppercase tracking-[0.4em] text-gold-300 sm:mb-4 sm:text-sm sm:tracking-[0.5em]"
        >
          Counting down to forever
        </motion.p>
        <motion.h2
          variants={itemFadeScale}
          className="mb-8 font-script text-4xl text-cream-50 sm:mb-14 sm:text-6xl md:text-7xl"
        >
          We are waiting for you
        </motion.h2>

        {time.passed ? (
          <motion.p
            variants={itemFadeScale}
            className="font-script text-4xl text-gold-300 sm:text-5xl"
          >
            We are married! {"\u2665"}
          </motion.p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                variants={itemFadeScale}
                whileHover={{ scale: 1.05 }}
                className="relative flex flex-col items-center"
              >
                <div className="flex h-20 w-16 flex-col items-center justify-center rounded-2xl glass-dark shadow-luxury sm:h-28 sm:w-24 sm:rounded-3xl md:h-36 md:w-32">
                  <span className="font-display text-3xl font-bold text-gold-300 sm:text-5xl md:text-6xl">
                    {String(u.value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 font-sans text-[8px] uppercase tracking-[0.2em] text-cream-200/70 sm:mt-2 sm:text-[11px] sm:tracking-[0.3em]">
                    {u.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 font-display text-lg text-gold-400/60 sm:-right-4 sm:text-2xl md:-right-6 md:text-3xl">
                    :
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
