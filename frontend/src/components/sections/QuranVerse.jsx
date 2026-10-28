import React from "react";
import { motion } from "framer-motion";
import GoldenParticles from "../effects/GoldenParticles";

const ARABIC_VERSE =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ";

const MEANING =
  "Allah created spouses for you from among yourselves so that you may find tranquillity in them, and He placed love and mercy between you.";

function Divider({ className = "" }) {
  return (
    <svg viewBox="0 0 160 20" className={className} fill="none" aria-hidden="true">
      <path d="M4 10h44M112 10h44" stroke="rgba(227,181,74,0.4)" strokeWidth="0.9" />
      <path
        d="M48 10c6 0 8-4.5 12-4.5s6 4.5 12 4.5"
        stroke="rgba(227,181,74,0.45)"
        strokeWidth="0.9"
      />
      <path
        d="M112 10c-6 0-8-4.5-12-4.5s-6 4.5-12 4.5"
        stroke="rgba(227,181,74,0.45)"
        strokeWidth="0.9"
      />
      <path d="M80 2l2.6 5.4L88 10l-5.4 2.6L80 18l-2.6-5.4L72 10l5.4-2.6z" fill="#e3b54a" />
      <circle cx="58" cy="10" r="1.3" fill="rgba(240,212,138,0.7)" />
      <circle cx="102" cy="10" r="1.3" fill="rgba(240,212,138,0.7)" />
    </svg>
  );
}

function CornerFlourish({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M1 31V13C1 6.4 6.4 1 13 1h18"
        stroke="rgba(227,181,74,0.5)"
        strokeWidth="0.9"
      />
      <path
        d="M6 31V14c0-4.4 3.6-8 8-8h17"
        stroke="rgba(227,181,74,0.22)"
        strokeWidth="0.7"
      />
      <circle cx="13" cy="13" r="1.5" fill="rgba(240,212,138,0.65)" />
    </svg>
  );
}

export default function QuranVerse() {
  return (
    <section
      id="verse"
      className="relative overflow-hidden bg-[#04180f] py-12 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 45%, rgba(23,105,75,0.45) 0%, rgba(4,24,15,0) 72%)"
        }}
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="verseGirih" width="64" height="64" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#f0d48a" strokeWidth="0.55">
              <rect x="14" y="14" width="36" height="36" />
              <rect x="14" y="14" width="36" height="36" transform="rotate(45 32 32)" />
              <circle cx="32" cy="32" r="6.5" />
              <circle cx="0" cy="0" r="2.2" />
              <circle cx="64" cy="0" r="2.2" />
              <circle cx="0" cy="64" r="2.2" />
              <circle cx="64" cy="64" r="2.2" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#verseGirih)" />
      </svg>

      <GoldenParticles count={14} />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative rounded-[1.4rem] bg-gradient-to-b from-gold-300/70 via-gold-500/25 to-gold-700/45 p-[1.2px] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)]">
            <div className="relative overflow-hidden rounded-[1.32rem] bg-gradient-to-b from-[#0e4132] via-[#082a1f] to-[#04150e] px-5 py-8 sm:px-10 sm:py-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[7px] rounded-[1.05rem] border border-gold-400/12"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[24%] h-[42%]"
              style={{
                background:
                  "radial-gradient(ellipse 58% 60% at 50% 50%, rgba(46,160,116,0.3) 0%, rgba(4,21,14,0) 72%)"
              }}
            />

            <CornerFlourish className="pointer-events-none absolute left-2.5 top-2.5 h-6 w-6" />
            <CornerFlourish className="pointer-events-none absolute right-2.5 top-2.5 h-6 w-6 rotate-90" />
            <CornerFlourish className="pointer-events-none absolute bottom-2.5 right-2.5 h-6 w-6 rotate-180" />
            <CornerFlourish className="pointer-events-none absolute bottom-2.5 left-2.5 h-6 w-6 -rotate-90" />

            <div className="relative flex justify-center">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-gold-400/45" />
                <span className="absolute inset-[3px] rounded-full border border-gold-400/20" />
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                  <path
                    d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"
                    fill="#e3b54a"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-center font-sans text-[9px] font-medium uppercase tracking-[0.46em] text-gold-400/85 sm:text-[10px]">
              Surah Ar-Rum
            </p>

            <p className="mt-1.5 text-center font-serif text-[9px] uppercase tracking-[0.34em] text-gold-200/65 sm:text-[10px]">
              Chapter 30 &middot; Verse 21
            </p>

            <Divider className="mx-auto mt-4 w-36 sm:w-44" />

            <p
              dir="rtl"
              lang="ar"
              className="mx-auto mt-4 max-w-xl bg-gradient-to-b from-[#fffaea] via-gold-200 to-gold-500 bg-clip-text text-center font-arabic text-[clamp(1.15rem,4.7vw,1.6rem)] leading-[2.35] text-transparent drop-shadow-[0_2px_12px_rgba(227,181,74,0.22)] sm:mt-5"
            >
              {ARABIC_VERSE}
            </p>

            <Divider className="mx-auto mt-4 w-36 sm:mt-5 sm:w-44" />

            <p className="mx-auto mt-4 max-w-lg text-center font-serif text-[13px] italic leading-relaxed text-cream-200/85 sm:text-[15px]">
              &ldquo;{MEANING}&rdquo;
            </p>

            <p className="mt-4 text-center font-sans text-[8px] uppercase tracking-[0.38em] text-gold-400/70 sm:text-[9px]">
              Love, peace and mercy in marriage
            </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
