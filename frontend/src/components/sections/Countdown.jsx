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
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950 py-24"
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
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          variants={itemFadeScale}
          className="mb-4 font-serif text-sm uppercase tracking-[0.5em] text-gold-300"
        >
          Counting down to forever
        </motion.p>
        <motion.h2
          variants={itemFadeScale}
          className="mb-14 font-script text-6xl text-cream-50 md:text-7xl"
        >
          We are waiting for you
        </motion.h2>

        {time.passed ? (
          <motion.p
            variants={itemFadeScale}
            className="font-script text-5xl text-gold-300"
          >
            We are married! {"\u2665"}
          </motion.p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                variants={itemFadeScale}
                whileHover={{ scale: 1.05 }}
                className="relative flex flex-col items-center"
              >
                <div className="flex h-28 w-24 flex-col items-center justify-center rounded-3xl glass-dark shadow-luxury md:h-36 md:w-32">
                  <span className="font-display text-5xl font-bold text-gold-300 md:text-6xl">
                    {String(u.value).padStart(2, "0")}
                  </span>
                  <span className="mt-2 font-sans text-[11px] uppercase tracking-[0.3em] text-cream-200/70">
                    {u.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-2xl text-gold-400/60 md:-right-6 md:text-3xl">
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
