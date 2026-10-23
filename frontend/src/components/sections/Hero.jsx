import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../animations/gsap";
import GoldenParticles from "../effects/GoldenParticles";
import FallingPetals from "../effects/FallingPetals";
import { IslamicPattern } from "../effects/Ornaments";
import { itemFadeUp, itemBlur, container } from "../../animations/variants";

export default function Hero({ data }) {
  const { couple } = data;
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (reduce || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        { yPercent: 0 },
        {
          yPercent: 12,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#03140e] py-16 sm:py-20"
    >
      {/* Bride & groom photograph blended into a dark emerald backdrop */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#03140e]">
        {/* Ambient fill so the screen stays covered edge to edge */}
        <img
          src="/images/hero-couple.jpg?v=9"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.16] object-cover object-[50%_28%] blur-[6px]"
        />
        <div className="absolute inset-0 bg-emerald-950/62" />

        {/* Full-bleed photograph centered on screen */}
        <img
          src="/images/hero-couple.jpg?v=9"
          srcSet="/images/hero-couple-mobile.jpg?v=9 1300w, /images/hero-couple.jpg?v=9 2163w"
          sizes="100vw"
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_26%]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)"
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#03140e] via-transparent to-[#03140e]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#03140e_0%,rgba(3,20,14,0.28)_12%,transparent_30%,transparent_70%,rgba(3,20,14,0.28)_88%,#03140e_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_42%_at_50%_44%,rgba(3,20,14,0.16)_0%,rgba(3,20,14,0.05)_55%,transparent_78%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <IslamicPattern variant="star" className="h-full w-full" color="#f0d48a" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 18%, rgba(227,181,74,0.18) 0%, rgba(227,181,74,0) 70%)"
        }}
      />
      <GoldenParticles count={70} />
      <FallingPetals count={12} />

      <div ref={parallaxRef} className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          variants={container(0.15)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.p
            variants={itemBlur}
            className="mb-8 font-serif text-xs uppercase tracking-[0.5em] text-[#c9a95d] md:text-base"
          >
            With the blessings of Allah
          </motion.p>

          {/* Portraits side-by-side on all screens */}
          <div className="mb-8 flex items-end justify-center gap-x-6 sm:gap-x-10 md:gap-x-16">
            <motion.div variants={itemFadeUp} className="flex flex-col items-center">
              <div className="h-28 w-24 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-gold-400/60 shadow-glow sm:h-36 sm:w-28 md:h-44 md:w-36">
                <img
                  src={couple.groom.image}
                  alt={couple.groom.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/groom.svg";
                  }}
                />
              </div>
              <p className="mt-2 text-center font-script text-lg text-[#d9b75b] sm:text-xl md:text-2xl">
                {couple.groom.name}
              </p>
            </motion.div>

            <motion.div
              variants={itemFadeUp}
              className="mb-8 flex flex-col items-center md:mb-10"
            >
              <motion.span
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="will-change-transform font-script text-2xl text-[#b89a3a] md:text-3xl"
              >
                {"\u2666"}
              </motion.span>
            </motion.div>

            <motion.div variants={itemFadeUp} className="flex flex-col items-center">
              <div className="h-28 w-24 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-gold-400/60 shadow-glow sm:h-36 sm:w-28 md:h-44 md:w-36">
                <img
                  src={couple.bride.image}
                  alt={couple.bride.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/bride.svg";
                  }}
                />
              </div>
              <p className="mt-2 text-center font-script text-lg text-[#d9b75b] sm:text-xl md:text-2xl">
                {couple.bride.name}
              </p>
            </motion.div>
          </div>

          {/* Names stacked below on their own row */}
          <motion.div variants={itemFadeUp} className="mb-4 flex w-full max-w-2xl flex-col items-center px-1">
            <h1 className="flex w-full flex-col items-center font-script leading-tight">
              <span className="max-w-full break-words bg-gradient-to-b from-[#f5e7c6] via-[#e7d29b] to-[#b89a3a] bg-clip-text text-center text-3xl text-transparent drop-shadow-[0_2px_26px_rgba(20,28,18,0.9)] sm:text-5xl md:text-6xl">
                {couple.groom.fullName || couple.groom.name}
              </span>

              {/* Centered, styled "weds to" divider */}
              <span className="my-3 flex w-full items-center justify-center gap-2 sm:my-4 sm:gap-3">
                <span className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-[#b89a3a]/40 to-[#b89a3a]/80" />
                  <span className="h-1 w-1 shrink-0 rotate-45 bg-[#b89a3a]/80" />
                </span>

                <span className="mr-[-0.45em] shrink-0 whitespace-nowrap bg-gradient-to-r from-[#f0dc9a] via-[#f5e7c6] to-[#c9a95d] bg-clip-text font-serif text-[11px] font-medium uppercase italic tracking-[0.45em] text-transparent drop-shadow-[0_0_12px_rgba(20,28,18,0.9)] sm:text-sm">
                  weds to
                </span>

                <span className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <span className="h-1 w-1 shrink-0 rotate-45 bg-[#b89a3a]/80" />
                  <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-[#b89a3a]/40 to-[#b89a3a]/80" />
                </span>
              </span>

              <span className="max-w-full break-words bg-gradient-to-b from-[#f0dc9a] via-[#e7d29b] to-[#c9a95d] bg-clip-text text-center text-3xl text-transparent drop-shadow-[0_2px_26px_rgba(20,28,18,0.9)] sm:text-5xl md:text-6xl">
                {couple.bride.fullName || couple.bride.name}
              </span>
            </h1>

            {/* Ornament flourish */}
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
              className="mt-4 flex items-center gap-2.5 text-[#b89a3a] sm:mt-5"
            >
              <span className="h-1 w-1 rotate-45 bg-[#b89a3a]/80" />
              <span className="font-script text-lg leading-none sm:text-xl">
                {"\u2661"}
              </span>
              <span className="h-1 w-1 rotate-45 bg-[#b89a3a]/80" />
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-6 sm:gap-2"
      >
        <span className="hidden font-serif text-[9px] uppercase tracking-[0.35em] text-[#c9a95d] sm:block sm:text-[10px]">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-[#b89a3a]/70 p-0.5 sm:h-10 sm:w-6 sm:p-1"
        >
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="block h-1.5 w-0.5 rounded-full bg-[#b89a3a] sm:h-2 sm:w-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
