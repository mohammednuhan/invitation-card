import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { gsap } from "../../animations/gsap";
import GoldenParticles from "../effects/GoldenParticles";
import FallingPetals from "../effects/FallingPetals";
import FloatingHearts from "../effects/FloatingHearts";

const GROOM_IG =
  "https://www.instagram.com/mhd_meehan?igsi=MXAydjhjYWN4NTFjMQ==";
const BRIDE_IG =
  "https://www.instagram.com/ari_ba02?igsi=MXZ3cHpwdmJ6bmVmaQ==";

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

        <div data-thank className="mt-10 flex items-end justify-center gap-5 sm:gap-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={couple.groom.image}
                alt={couple.groom.name}
                loading="lazy"
                decoding="async"
                className="h-28 w-24 rounded-t-full rounded-b-2xl border-2 border-gold-400/60 object-cover shadow-glow sm:h-32 sm:w-28"
                onError={(e) => {
                  e.target.src = "/images/groom.svg";
                }}
              />
            </div>
            <p className="mt-3 font-script text-lg text-gold-200 sm:text-xl">
              {couple.groom.name}
            </p>
            <a
              href={GROOM_IG}
              target="_blank"
              rel="noopener noreferrer"
              title="Groom on Instagram"
              aria-label="Groom on Instagram"
              className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 text-gold-300 transition hover:border-gold-300 hover:text-gold-100 active:scale-90"
            >
              <FaInstagram size={18} />
            </a>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={couple.bride.image}
                alt={couple.bride.name}
                loading="lazy"
                decoding="async"
                className="h-28 w-24 rounded-t-full rounded-b-2xl border-2 border-gold-400/60 object-cover shadow-glow sm:h-32 sm:w-28"
                onError={(e) => {
                  e.target.src = "/images/bride.svg";
                }}
              />
            </div>
            <p className="mt-3 font-script text-lg text-gold-200 sm:text-xl">
              {couple.bride.name}
            </p>
            <a
              href={BRIDE_IG}
              target="_blank"
              rel="noopener noreferrer"
              title="Bride on Instagram"
              aria-label="Bride on Instagram"
              className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 text-gold-300 transition hover:border-gold-300 hover:text-gold-100 active:scale-90"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <p data-thank className="mt-8 font-script text-3xl text-gold-300 sm:text-4xl">
          {couple.groom.name} {"\u2661"} {couple.bride.name}
        </p>

        <p
          data-thank
          className="mt-6 font-serif text-xs uppercase tracking-[0.4em] text-gold-400/70"
        >
          See you at our wedding
        </p>

        </div>
    </section>
  );
}
