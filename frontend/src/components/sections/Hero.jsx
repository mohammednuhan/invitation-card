import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../animations/gsap";
import GoldenParticles from "../effects/GoldenParticles";
import FallingPetals from "../effects/FallingPetals";
import { IslamicPattern } from "../effects/Ornaments";
import { itemFadeUp, itemBlur, container } from "../../animations/variants";

export default function Hero({ data, paused = false }) {
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
      {/* Full-screen home page background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#120d07]">
        {/* Soft fill behind the artwork so the screen is never empty, while the
            photo itself is shown in full and never cropped. */}
        <div
          className="hero-fill absolute inset-0"
          style={{ backgroundImage: "url(/images/hero-stage-photo.jpg?v=1)" }}
        />

        <div className="hero-frame">
          <img
            src="/images/hero-stage-photo.jpg?v=1"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="hero-scene h-full w-full object-cover"
          />
        </div>

        {/* Tints that keep the names readable without hiding the scene */}
        <div className="absolute inset-0 bg-[#041a12]/12" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04120c]/48 via-[#04120c]/6 to-[#04120c]/58" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_50%_44%,rgba(3,18,12,0.38)_0%,rgba(3,18,12,0.12)_60%,transparent_80%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <IslamicPattern variant="star" className="h-full w-full" color="#ffd89c" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 48% at 50% 14%, rgba(255,216,156,0.14) 0%, rgba(255,216,156,0) 72%)"
        }}
      />
      <GoldenParticles count={34} paused={paused} />
      <FallingPetals count={7} paused={paused} />

      <div className="hero-copy relative z-10 flex w-full flex-col items-center px-6 text-center">
        <div ref={parallaxRef} className="flex flex-col items-center">
          <motion.div
            variants={container(0.15)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.p
              variants={itemBlur}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f0d48a]/45 bg-[#03140e]/60 px-3.5 py-1.5 font-serif text-[10px] uppercase tracking-[0.22em] text-[#fff9e0] sm:mb-8 sm:gap-2.5 sm:px-5 sm:py-2 sm:text-sm sm:tracking-[0.42em]"
              style={{
                textShadow: "0 1px 8px rgba(0,0,0,0.8)",
                boxShadow: "0 0 26px rgba(255,214,140,0.22), inset 0 0 18px rgba(255,214,140,0.08)"
              }}
            >
              <span className="text-[7px] leading-none text-[#f0d48a]">{"\u25C6"}</span>
              With the blessings of Allah
              <span className="text-[7px] leading-none text-[#f0d48a]">{"\u25C6"}</span>
            </motion.p>

            {/* Names stacked below on their own row */}
            <motion.div variants={itemFadeUp} className="mb-4 flex w-full max-w-2xl flex-col items-center px-1">
              <h1 className="flex w-full flex-col items-center font-script leading-tight">
                <span
                  className="max-w-full break-words text-center text-[clamp(1.7rem,9vw,2.6rem)] leading-[1.12] text-[#fffbe8] sm:text-6xl md:text-7xl"
                  style={{
                    textShadow:
                      "0 2px 6px rgba(0,0,0,0.95), 0 0 18px rgba(255,205,110,0.7), 0 0 46px rgba(255,190,90,0.35)"
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
                  className="max-w-full break-words text-center text-[clamp(1.7rem,9vw,2.6rem)] leading-[1.12] text-[#fffbe8] sm:text-6xl md:text-7xl"
                  style={{
                    textShadow:
                      "0 2px 6px rgba(0,0,0,0.95), 0 0 18px rgba(255,205,110,0.7), 0 0 46px rgba(255,190,90,0.35)"
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



