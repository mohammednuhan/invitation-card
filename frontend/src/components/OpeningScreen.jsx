import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenParticles from "./effects/GoldenParticles";
import { IslamicPattern } from "./effects/Ornaments";

const HEART_PATH =
  "M50 88 C20 66 4 47 4 28 C4 12 16 3 28 3 C38 3 46 10 50 19 C54 10 62 3 72 3 C84 3 96 12 96 28 C96 47 80 66 50 88 Z";

const curtainFabric = {
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      rgba(0,0,0,0.58) 0px,
      rgba(0,0,0,0.4) 7px,
      rgba(240,212,138,0.10) 15px,
      rgba(240,212,138,0.22) 21px,
      rgba(0,0,0,0.36) 29px,
      rgba(0,0,0,0.58) 36px
    ),
    linear-gradient(180deg, #164734 0%, #0f3527 42%, #062018 100%)
  `,
  boxShadow: "inset 0 0 90px rgba(0,0,0,0.6)"
};

function Flower({ size = 20, petal = "#eccb77", core = "#d4a03c", className = "", rotate = 0 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="20"
          cy="10"
          rx="6.4"
          ry="9.6"
          fill={petal}
          opacity="0.95"
          transform={`rotate(${a} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="5.2" fill={core} />
      <circle cx="20" cy="20" r="2.4" fill="#fff6df" opacity="0.85" />
    </svg>
  );
}

function Leaf({ className = "", rotate = 0 }) {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path d="M1 6 C6 0 16 0 21 6 C16 12 6 12 1 6 Z" fill="#1d5945" />
      <path d="M2 6 H20" stroke="#0b2a20" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

function Tassel({ className = "" }) {
  return (
    <svg width="26" height="64" viewBox="0 0 26 64" className={className} aria-hidden="true">
      <path d="M13 0 V26" stroke="#d4a03c" strokeWidth="2" />
      <circle cx="13" cy="30" r="5" fill="#e3b54a" />
      <path d="M6 34 H20 L17 40 H9 Z" fill="#b9832c" />
      <path d="M8 40 L7 58 M12 40 L12 60 M16 40 L17 58" stroke="#e3b54a" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function ArchFrame() {
  return (
    <svg
      viewBox="0 0 300 460"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vh,620px)] w-[min(84vw,430px)] -translate-x-1/2 -translate-y-1/2"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gateArchGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4e0ac" />
          <stop offset="0.5" stopColor="#e3b54a" />
          <stop offset="1" stopColor="#946427" />
        </linearGradient>
      </defs>
      <path
        d="M18 452 V176 C18 96 78 44 150 8 C222 44 282 96 282 176 V452"
        stroke="url(#gateArchGold)"
        strokeWidth="2.6"
      />
      <path
        d="M34 452 V182 C34 108 88 60 150 28 C212 60 266 108 266 182 V452"
        stroke="url(#gateArchGold)"
        strokeWidth="1.3"
        opacity="0.7"
      />
      <path
        d="M50 452 V188 C50 120 98 76 150 48 C202 76 250 120 250 188 V452"
        stroke="url(#gateArchGold)"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <path d="M150 0 l10 14 -10 14 -10 -14 Z" fill="url(#gateArchGold)" />
      <circle cx="150" cy="60" r="3.4" fill="#e3b54a" />
      <circle cx="34" cy="250" r="3" fill="#d4a03c" opacity="0.8" />
      <circle cx="266" cy="250" r="3" fill="#d4a03c" opacity="0.8" />
      <circle cx="34" cy="330" r="2.4" fill="#d4a03c" opacity="0.6" />
      <circle cx="266" cy="330" r="2.4" fill="#d4a03c" opacity="0.6" />
    </svg>
  );
}

function HeartCrest({ initials, unlocking }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72 }}
      animate={
        unlocking
          ? { opacity: 0, scale: 1.5, filter: "blur(14px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: unlocking ? 0.7 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-[clamp(9.5rem,min(44vw,34vh),16rem)] w-[clamp(9.5rem,min(44vw,34vh),16rem)] items-center justify-center"
    >
      <motion.svg
        viewBox="0 0 100 92"
        className="absolute inset-0 h-full w-full"
        animate={
          unlocking
            ? {}
            : {
                filter: [
                  "drop-shadow(0 0 16px rgba(227,181,74,0.35))",
                  "drop-shadow(0 0 44px rgba(227,181,74,0.8))",
                  "drop-shadow(0 0 16px rgba(227,181,74,0.35))"
                ]
              }
        }
        transition={{ duration: 2.4, repeat: Infinity }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crest-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4e0ac" />
            <stop offset="50%" stopColor="#d4a03c" />
            <stop offset="100%" stopColor="#946427" />
          </linearGradient>
          <linearGradient id="crest-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(22,71,52,0.95)" />
            <stop offset="100%" stopColor="rgba(6,32,24,0.97)" />
          </linearGradient>
        </defs>
        <path d={HEART_PATH} fill="url(#crest-fill)" stroke="url(#crest-gold)" strokeWidth="2.8" />
        <path
          d={HEART_PATH}
          fill="none"
          stroke="#f4e0ac"
          strokeWidth="0.8"
          opacity="0.55"
          transform="translate(4 4) scale(0.92)"
        />
      </motion.svg>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center px-4 text-center"
      >
        <span className="font-display text-[clamp(2rem,10vw,3.6rem)] font-semibold uppercase leading-none tracking-[0.14em] text-gold-300 drop-shadow-[0_0_18px_rgba(227,181,74,0.65)]">
          {initials}
        </span>
        <span className="mt-2.5 h-px w-12 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
        <span className="mt-2 font-sans text-[clamp(7px,2.4vw,10px)] uppercase tracking-[0.4em] text-gold-200/80">
          Wedding
        </span>
      </motion.div>

      <div className="pointer-events-none absolute -left-3 -top-1 sm:-left-5">
        <Flower size={32} rotate={-18} />
      </div>
      <div className="pointer-events-none absolute -right-3 -top-1 sm:-right-5">
        <Flower size={27} petal="#dfa890" rotate={24} />
      </div>
      <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2">
        <Flower size={25} petal="#f4e0ac" rotate={8} />
      </div>
      <Leaf className="pointer-events-none absolute -left-6 top-9 sm:-left-8" rotate={-30} />
      <Leaf className="pointer-events-none absolute -right-6 top-9 sm:-right-8" rotate={210} />
      <Leaf className="pointer-events-none absolute -bottom-4 left-4" rotate={40} />
      <Leaf className="pointer-events-none absolute -bottom-4 right-4" rotate={140} />
    </motion.div>
  );
}

function PetalBurst({ active }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.25;
        const dist = 120 + Math.random() * 160;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist + 130,
          rot: Math.random() * 360 - 180,
          scale: 0.8 + Math.random() * 0.4,
          color: ["#eccb77", "#dfa890", "#f4e0ac", "#cc8f75"][i % 4],
          delay: Math.random() * 0.25
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {active &&
          petals.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [0, 1, 1, 0],
                scale: [0.3, p.scale, p.scale],
                rotate: p.rot
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
              className="absolute h-3 w-3 rounded-[80%_0_80%_0]"
              style={{ background: p.color }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

function Valance({ lifting }) {
  return (
    <motion.div
      animate={lifting ? { y: "-110%" } : { y: "0%" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
      className="absolute inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)]"
    >
      <div
        className="relative w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.52) 0px, rgba(0,0,0,0.34) 8px, rgba(240,212,138,0.12) 16px, rgba(240,212,138,0.24) 22px, rgba(0,0,0,0.34) 30px, rgba(0,0,0,0.52) 38px), linear-gradient(180deg, #164734 0%, #0b2a20 100%)`,
          boxShadow: "0 20px 44px rgba(0,0,0,0.6)"
        }}
      >
        <div className="relative h-14 w-full sm:h-[4.5rem]">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700" />
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700" />

          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-around px-3 sm:px-8">
            {Array.from({ length: 11 }).map((_, i) => (
              <React.Fragment key={i}>
                {i % 2 === 0 ? (
                  <Flower
                    size={i === 5 ? 36 : 24}
                    rotate={(i * 41) % 360}
                    petal={i % 4 === 0 ? "#eccb77" : "#dfa890"}
                  />
                ) : (
                  <Leaf rotate={i % 4 === 1 ? -22 : 202} />
                )}
              </React.Fragment>
            ))}
          </div>

          <Tassel className="absolute left-4 top-full -translate-x-1/2 sm:left-8" />
          <Tassel className="absolute right-4 top-full translate-x-1/2 sm:right-8" />
        </div>

        <div className="absolute inset-x-0 -bottom-4 flex justify-between px-0.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="block h-7 w-7 rounded-full sm:h-8 sm:w-8"
              style={{
                background: "radial-gradient(circle at 50% 0%, #164734 0%, #0b2a20 72%)",
                boxShadow: "inset 0 -5px 9px rgba(0,0,0,0.55)"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function OpeningScreen({ data, onOpening, onOpen }) {
  const { couple } = data;
  const [isUnlocked, setIsUnlocked] = useState(false);

  const initials = `${(couple.groom.name || "M").charAt(0)} & ${(couple.bride.name || "A").charAt(
    0
  )}`.toUpperCase();

  const handleUnlock = () => {
    if (isUnlocked) return;
    setIsUnlocked(true);
    onOpening?.();
    setTimeout(() => onOpen?.(), 2400);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleUnlock}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation gate"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleUnlock();
      }}
      className="fixed inset-0 z-[80] flex touch-manipulation select-none items-center justify-center overflow-hidden bg-ink-950"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 50% 45%, rgba(227,181,74,0.22) 0%, rgba(227,181,74,0) 70%)"
        }}
      />
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.07]">
        <IslamicPattern variant="star" className="h-full w-full" color="#f0d48a" />
      </div>
      <div className="absolute inset-0 z-[1] opacity-70">
        <GoldenParticles count={55} />
      </div>

      {/* arch frame stays while the curtains part */}
      <div className="absolute inset-0 z-[25] flex items-center justify-center">
        <ArchFrame />
      </div>

      <PetalBurst active={isUnlocked} />

      {/* curtains */}
      <div className="pointer-events-none absolute inset-0 z-30 flex">
        <motion.div
          animate={isUnlocked ? { scaleX: 0.12, x: "-6%" } : { scaleX: 1, x: "0%" }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          style={{ ...curtainFabric, transformOrigin: "left center" }}
          className="relative h-full w-1/2 border-r border-gold-500/40"
        >
          <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700" />
          <div className="absolute bottom-0 right-0 h-12 w-full bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>

        <motion.div
          animate={isUnlocked ? { scaleX: 0.12, x: "6%" } : { scaleX: 1, x: "0%" }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          style={{ ...curtainFabric, transformOrigin: "right center" }}
          className="relative h-full w-1/2 border-l border-gold-500/40"
        >
          <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700" />
          <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>

        <Valance lifting={isUnlocked} />
      </div>

      {/* crest + hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isUnlocked ? 0 : 1 }}
        transition={{ duration: isUnlocked ? 0.7 : 0.9, delay: isUnlocked ? 0 : 0.35 }}
        style={{ pointerEvents: isUnlocked ? "none" : "auto" }}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 pb-[env(safe-area-inset-bottom)]"
      >
        <HeartCrest initials={initials} unlocking={isUnlocked} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 flex flex-col items-center gap-2.5 sm:mt-8"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold-300 sm:text-xs"
          >
            Tap to Open
          </motion.span>

          <motion.span
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/60 bg-ink-900/50 sm:h-12 sm:w-12"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11V6.5a2 2 0 1 1 4 0V11m0-1.5a2 2 0 1 1 4 0V12m0-1a2 2 0 1 1 4 0v4a6 6 0 0 1-6 6h-2.2a5 5 0 0 1-3.6-1.5L5 16.5a2.1 2.1 0 0 1 3-3l1 1"
                stroke="#eccb77"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>

          <span className="h-px w-24 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
