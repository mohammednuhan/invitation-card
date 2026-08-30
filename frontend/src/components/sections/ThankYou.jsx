import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../animations/gsap";
import GoldenParticles from "../effects/GoldenParticles";
import FallingPetals from "../effects/FallingPetals";
import FloatingHearts from "../effects/FloatingHearts";

export default function ThankYou({ data }) {
  const ref = useRef(null);
  const { couple } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll("[data-thank]"),
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.25,
          scrollTrigger: { trigger: ref.current, start: "top 70%" }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="thankyou"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950 py-16 text-center sm:py-24"
    >
      <GoldenParticles count={90} />
      <FallingPetals count={16} />
      <FloatingHearts count={10} />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          data-thank
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-400/60 text-2xl text-gold-300 shadow-glow sm:mb-8 sm:h-20 sm:w-20 sm:text-3xl"
        >
          {"\u2666"}
        </motion.div>

        <h2
          data-thank
          className="font-script text-5xl text-cream-50 drop-shadow-[0_0_40px_rgba(227,181,74,0.35)] sm:text-6xl md:text-8xl"
        >
          Thank You
        </h2>

        <p
          data-thank
          className="mt-6 font-serif text-xl italic leading-relaxed text-cream-200/85 md:text-2xl"
        >
          We are overwhelmed by your love and support.
          <br />
          We look forward to celebrating the most beautiful day of our lives
          with you.
        </p>

        <p
          data-thank
          className="mt-10 font-script text-4xl text-gold-300 md:text-5xl"
        >
          {couple.groom.name} {"\u2661"} {couple.bride.name}
        </p>

        <p
          data-thank
          className="mt-6 font-serif text-xs uppercase tracking-[0.4em] text-gold-400/70"
        >
          See you at our wedding
        </p>

        {/* <div data-thank className="mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400" />
          <span className="font-script text-2xl text-gold-300">{"\u2693"}</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400" />
        </div> */}
      </div>
    </section>
  );
}
