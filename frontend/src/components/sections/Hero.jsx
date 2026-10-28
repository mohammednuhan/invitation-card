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
          src="/images/hero-couple.jpg?v=12"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-[50%_28%] blur-[3px]"
        />
        <div className="absolute inset-0 bg-emerald-950/16" />

        {/* Full-bleed photograph centered on screen */}
        <img
          src="/images/hero-couple.jpg?v=12"
          srcSet="/images/hero-couple-mobile.jpg?v=12 1400w, /images/hero-couple.jpg?v=12 2286w"
          sizes="100vw"
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)"
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#041a12]/48 via-transparent to-[#041a12]/62" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#041a12_0%,rgba(4,26,18,0.14)_12%,transparent_32%,transparent_68%,rgba(4,26,18,0.14)_88%,#041a12_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_48%_at_50%_42%,rgba(4,26,18,0.06)_0%,rgba(4,26,18,0.02)_58%,transparent_78%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <IslamicPattern variant="star" className="h-full w-full" color="#ffd89c" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 48% at 50% 16%, rgba(255,216,156,0.32) 0%, rgba(255,216,156,0) 72%)"
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
            className="mb-8 font-serif text-xs uppercase tracking-[0.5em] text-[#fff3d0] md:text-base"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9), 0 0 26px rgba(255,214,140,0.6)" }}
          >
            With the blessings of Allah
          </motion.p>

          {/* Portraits side-by-side on all screens */}
          <div className="mb-6 flex items-end justify-center sm:mb-8" />

          {/* Names stacked below on their own row */}
          <motion.div variants={itemFadeUp} className="mb-4 flex w-full max-w-2xl flex-col items-center px-1">
            <h1 className="flex w-full flex-col items-center font-script leading-tight">
              <span
                className="max-w-full break-words text-center text-3xl text-[#fff8e1] sm:text-5xl md:text-6xl"
                style={{
                  textShadow:
                    "0 3px 22px rgba(0,0,0,0.92), 0 0 34px rgba(255,214,140,0.55), 0 0 70px rgba(255,196,90,0.28)"
                }}
              >
                {couple.groom.fullName || couple.groom.name}
              </span>

              {/* Centered, styled "weds to" divider */}
              <span className="my-3 flex w-full items-center justify-center gap-2 sm:my-4 sm:gap-3">
                <span className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-[#b89a3a]/40 to-[#b89a3a]/80" />
                  <span className="h-1 w-1 shrink-0 rotate-45 bg-[#b89a3a]/80" />
                </span>

                <span
                  className="mr-[-0.45em] shrink-0 whitespace-nowrap font-serif text-[11px] font-medium uppercase italic tracking-[0.45em] text-[#ffe6ad] sm:text-sm"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9), 0 0 24px rgba(255,214,140,0.5)" }}
                >
                  weds to
                </span>

                <span className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <span className="h-1 w-1 shrink-0 rotate-45 bg-[#b89a3a]/80" />
                  <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-[#b89a3a]/40 to-[#b89a3a]/80" />
                </span>
              </span>

              <span
                className="max-w-full break-words text-center text-3xl text-[#fff8e1] sm:text-5xl md:text-6xl"
                style={{
                  textShadow:
                    "0 3px 22px rgba(0,0,0,0.92), 0 0 34px rgba(255,214,140,0.55), 0 0 70px rgba(255,196,90,0.28)"
                }}
              >
                {couple.bride.fullName || couple.bride.name}
              </span>
            </h1>

            {/* Ornament flourish */}
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
              className="mt-4 flex items-center gap-2.5 text-[#ffd89c] drop-shadow-[0_0_18px_rgba(255,216,156,0.55)] sm:mt-5"
            >
              <span className="h-1 w-1 rotate-45 bg-[#ffd89c]/95" />
              <span className="font-script text-lg leading-none sm:text-xl">
                {"\u2661"}
              </span>
              <span className="h-1 w-1 rotate-45 bg-[#ffd89c]/95" />
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
        <span
          className="hidden font-serif text-[9px] uppercase tracking-[0.35em] text-[#fff3d0] sm:block sm:text-[10px]"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-[#ffd89c]/85 p-0.5 shadow-[0_0_18px_rgba(255,216,156,0.4)] sm:h-10 sm:w-6 sm:p-1"
        >
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="block h-1.5 w-0.5 rounded-full bg-[#ffd89c] sm:h-2 sm:w-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
