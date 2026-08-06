import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../animations/gsap";
import GoldenParticles from "../effects/GoldenParticles";
import FallingPetals from "../effects/FallingPetals";
import { IslamicPattern } from "../effects/Ornaments";
import { useCountdown } from "../../hooks/useCountdown";
import { itemFadeUp, itemBlur, container } from "../../animations/variants";

export default function Hero({ data }) {
  const { couple } = data;
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const countdown = useCountdown(couple.date);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        { yPercent: 0 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-800 to-cream-50 py-20"
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <IslamicPattern variant="star" className="h-full w-full" color="#f0d48a" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 18%, rgba(227,181,74,0.22) 0%, rgba(227,181,74,0) 70%)"
        }}
      />
      <GoldenParticles count={70} />
      <FallingPetals count={12} />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] opacity-[0.16]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 560"
          className="h-[72vh] max-h-[720px] w-auto"
          fill="none"
        >
          <defs>
            <linearGradient id="heroArchGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0d48a" />
              <stop offset="1" stopColor="#b9832c" />
            </linearGradient>
          </defs>
          <path
            d="M36 560 V190 a164 164 0 0 1 328 0 V560"
            stroke="url(#heroArchGold)"
            strokeWidth="2.5"
          />
          <path
            d="M54 560 V198 a146 146 0 0 1 292 0 V560"
            stroke="url(#heroArchGold)"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <path
            d="M72 560 V208 a128 128 0 0 1 256 0 V560"
            stroke="url(#heroArchGold)"
            strokeWidth="0.8"
            opacity="0.35"
          />
          <path d="M200 6 l14 16 -14 16 -14 -16 Z" fill="url(#heroArchGold)" />
          <circle cx="200" cy="66" r="3.5" fill="#e3b54a" />
          <circle cx="200" cy="560" r="4" fill="#e3b54a" />
        </svg>
      </div>

      <div ref={parallaxRef} className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          variants={container(0.15)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.p
            variants={itemBlur}
            className="mb-6 font-serif text-sm uppercase tracking-[0.5em] text-gold-300 md:text-base"
          >
            With the blessings of Allah
          </motion.p>

          <div className="mb-10 flex items-center gap-8 md:gap-14">
            <motion.div variants={itemFadeUp} className="relative">
              <div className="relative h-36 w-28 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-gold-400/60 shadow-glow md:h-44 md:w-36">
                <img
                  src={couple.groom.image}
                  alt={couple.groom.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/groom.jpg";
                  }}
                />
              </div>
              <motion.span
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl text-gold-300"
              >
                {"\u2693"}
              </motion.span>
              <p className="mt-2 text-center font-script text-2xl text-gold-200 md:text-3xl">
                Meehan
              </p>
            </motion.div>

            <motion.div variants={itemFadeUp} className="flex flex-col items-center">
              <motion.span
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="font-script text-4xl text-gold-300 md:text-5xl"
              >
                {"\u2666"}
              </motion.span>
              <h1 className="mt-2 font-script text-5xl leading-tight text-cream-50 drop-shadow-[0_0_40px_rgba(227,181,74,0.4)] md:text-8xl">
                {couple.groom.name} {"\u2661"} {couple.bride.name}
              </h1>
            </motion.div>

            <motion.div variants={itemFadeUp} className="relative">
              <div className="relative h-36 w-28 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-gold-400/60 shadow-glow md:h-44 md:w-36">
                <img
                  src={couple.bride.image}
                  alt={couple.bride.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/bride.jpg";
                  }}
                />
              </div>
              <motion.span
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl text-gold-300"
              >
                {"\u2693"}
              </motion.span>
              <p className="mt-2 text-center font-script text-2xl text-gold-200 md:text-3xl">
                Ariba
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemFadeUp} className="flex flex-col items-center">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-gold-200/80">
              We are getting married
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-cream-50 md:text-3xl">
              {fmtDate(couple.date)}
            </p>
            <p className="mt-2 font-serif text-sm italic tracking-widest text-gold-300/90">
              {couple.venueName}
            </p>
          </motion.div>

          <motion.div
            variants={itemFadeUp}
            className="mt-10 flex gap-4 text-center md:gap-6"
          >
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds }
            ].map((t) => (
              <div
                key={t.label}
                className="glass-dark flex min-w-[70px] flex-col items-center rounded-2xl px-4 py-3 md:min-w-[90px]"
              >
                <span className="font-display text-3xl font-bold text-gold-300 md:text-4xl">
                  {String(t.value).padStart(2, "0")}
                </span>
                <span className="mt-1 font-sans text-[10px] uppercase tracking-[0.25em] text-cream-200/70">
                  {t.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-serif text-[10px] uppercase tracking-[0.35em] text-gold-300/70">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-gold-400/60 p-1"
        >
          <motion.span
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="block h-2 w-1 rounded-full bg-gold-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
