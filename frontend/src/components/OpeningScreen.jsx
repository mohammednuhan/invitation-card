import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenParticles from "./effects/GoldenParticles";
import { IslamicPattern } from "./effects/Ornaments";
import { playMusic, preloadMusic } from "../lib/music";

const HEART_PATH =
  "M50 88 C20 66 4 47 4 28 C4 12 16 3 28 3 C38 3 46 10 50 19 C54 10 62 3 72 3 C84 3 96 12 96 28 C96 47 80 66 50 88 Z";

const PETAL_COLORS = ["#eccb77", "#dfa890", "#f4e0ac", "#cc8f75", "#f7d9c4"];
const BALLOON_COLORS = ["#e3b54a", "#f4e0ac", "#dfa890", "#cc8f75", "#1d5945", "#eccb77"];

const curtainFabric = {
  backgroundImage: `
    radial-gradient(ellipse 130% 45% at 30% 8%, rgba(244,224,172,0.20) 0%, rgba(244,224,172,0) 62%),
    repeating-linear-gradient(
      90deg,
      rgba(0,0,0,0.56) 0px,
      rgba(0,0,0,0.30) 9px,
      rgba(240,212,138,0.10) 17px,
      rgba(240,212,138,0.26) 23px,
      rgba(0,0,0,0.34) 31px,
      rgba(0,0,0,0.56) 40px
    ),
    linear-gradient(180deg, #1a5741 0%, #123f30 42%, #061e15 100%)
  `,
  boxShadow:
    "inset 0 0 130px rgba(0,0,0,0.65), inset 0 0 46px rgba(227,181,74,0.10)"
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
      <path
        d="M8 40 L7 58 M12 40 L12 60 M16 40 L17 58"
        stroke="#e3b54a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartMotif({ size = 14, opacity = 0.55, color = "#e3b54a", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 92"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <path d={HEART_PATH} fill="none" stroke={color} strokeWidth="6" />
    </svg>
  );
}

function ArchFrame() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vh,620px)] w-[min(84vw,430px)] -translate-x-1/2 -translate-y-1/2">
      <svg viewBox="0 0 300 460" className="h-full w-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="gateArchGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7e7bd" />
            <stop offset="0.45" stopColor="#e3b54a" />
            <stop offset="1" stopColor="#8f5f22" />
          </linearGradient>
        </defs>

        {/* outer ogee arch */}
        <path
          d="M150 8 C104 42 22 94 22 194 V452"
          stroke="url(#gateArchGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M150 8 C196 42 278 94 278 194 V452"
          stroke="url(#gateArchGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* inner arch */}
        <path
          d="M150 40 C114 66 46 108 46 200 V452"
          stroke="url(#gateArchGold)"
          strokeWidth="1.1"
          opacity="0.65"
        />
        <path
          d="M150 40 C186 66 254 108 254 200 V452"
          stroke="url(#gateArchGold)"
          strokeWidth="1.1"
          opacity="0.65"
        />

        {/* beaded inner arch */}
        <path
          d="M150 96 C126 112 78 142 78 206 V452"
          stroke="#f4e0ac"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeDasharray="0.1 10"
          opacity="0.5"
        />
        <path
          d="M150 96 C174 112 222 142 222 206 V452"
          stroke="#f4e0ac"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeDasharray="0.1 10"
          opacity="0.5"
        />

        {/* apex heart */}
        <path d={HEART_PATH} transform="translate(136 0) scale(0.28)" fill="none" stroke="url(#gateArchGold)" strokeWidth="7" />

        {/* hanging lanterns */}
        {[44, 256].map((x) => (
          <g key={x}>
            <path d={`M${x} 236 v16`} stroke="#e3b54a" strokeWidth="1" opacity="0.8" />
            <path d={`M${x - 8} 252 h16 l-3 4 h-10 z`} fill="#e3b54a" opacity="0.65" />
            <ellipse
              cx={x}
              cy="268"
              rx="8.5"
              ry="12.5"
              fill="rgba(227,181,74,0.16)"
              stroke="url(#gateArchGold)"
              strokeWidth="1.1"
            />
            <ellipse cx={x} cy="268" rx="3.4" ry="6" fill="#f4e0ac" opacity="0.55" />
            <path d={`M${x} 280 v8`} stroke="#e3b54a" strokeWidth="0.9" opacity="0.7" />
          </g>
        ))}

        {/* gold nail heads along the posts */}
        {[300, 340, 380, 420].map((y) => (
          <g key={y}>
            <circle cx="22" cy={y} r="2.2" fill="#e3b54a" opacity="0.55" />
            <circle cx="278" cy={y} r="2.2" fill="#e3b54a" opacity="0.55" />
          </g>
        ))}
      </svg>

      {/* floral clusters at the foot of the gate */}
      <div className="absolute -bottom-2 -left-2">
        <div className="relative h-16 w-16">
          <Leaf className="absolute bottom-6 left-3" rotate={40} />
          <Flower size={30} rotate={-18} className="absolute bottom-0 left-0" />
          <Flower size={21} petal="#dfa890" rotate={28} className="absolute bottom-5 left-7" />
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2">
        <div className="relative h-16 w-16">
          <Leaf className="absolute bottom-6 right-3" rotate={140} />
          <Flower size={30} rotate={18} className="absolute bottom-0 right-0" />
          <Flower size={21} petal="#dfa890" rotate={-28} className="absolute bottom-5 right-7" />
        </div>
      </div>
    </div>
  );
}

function HeartCrest({ groomInitial, brideInitial, unlocking }) {
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
      {/* floral halo */}
      <div className="pointer-events-none absolute inset-0">
        {[-150, -120, -90, -60, -30].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const r = 50;
          const x = 50 + Math.cos(rad) * r;
          const y = 50 + Math.sin(rad) * r * 0.92;
          return (
            <span
              key={deg}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.span
                animate={{ rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
                transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="block"
              >
                <Flower
                  size={i === 2 ? 26 : 21}
                  petal={i % 2 === 0 ? "#eccb77" : "#dfa890"}
                  rotate={i * 37}
                />
              </motion.span>
            </span>
          );
        })}
      </div>

      <svg
        viewBox="0 0 100 92"
        className="absolute inset-0 h-full w-full drop-shadow-[0_0_26px_rgba(227,181,74,0.55)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crest-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4e0ac" />
            <stop offset="50%" stopColor="#d4a03c" />
            <stop offset="100%" stopColor="#946427" />
          </linearGradient>
          <linearGradient id="crest-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(26,87,65,0.96)" />
            <stop offset="100%" stopColor="rgba(6,32,24,0.98)" />
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
      </svg>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center px-3 text-center"
      >
        <div className="flex items-center justify-center gap-1.5 sm:gap-3">
          <span
            className="font-display text-[clamp(2.4rem,12vw,4rem)] font-semibold uppercase leading-none tracking-[0.02em] text-[#fff3d2]"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.65), 0 0 20px rgba(255,214,140,0.6), 0 0 38px rgba(227,181,74,0.35)"
            }}
          >
            {groomInitial}
          </span>

          <span
            className="font-serif text-[clamp(1.1rem,5vw,1.8rem)] italic leading-none text-rosegold-300"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 14px rgba(223,168,144,0.6)" }}
          >
            {"\u0026"}
          </span>

          <span
            className="font-display text-[clamp(2.4rem,12vw,4rem)] font-semibold uppercase leading-none tracking-[0.02em] text-[#fff3d2]"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.65), 0 0 20px rgba(255,214,140,0.6), 0 0 38px rgba(227,181,74,0.35)"
            }}
          >
            {brideInitial}
          </span>
        </div>

        <span className="mt-3 flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-gold-300/60 to-gold-300/85" />
          <span className="h-1 w-1 rotate-45 bg-gold-300/70" />
          <span className="h-px w-8 bg-gradient-to-l from-transparent via-gold-300/60 to-gold-300/85" />
        </span>

        <span className="mt-1.5 font-sans text-[clamp(6.5px,2.2vw,9px)] uppercase tracking-[0.5em] text-gold-200/90">
          Wedding
        </span>
      </motion.div>

      <div className="pointer-events-none absolute -left-4 -top-2 sm:-left-6">
        <Flower size={30} rotate={-18} />
      </div>
      <div className="pointer-events-none absolute -right-4 -top-2 sm:-right-6">
        <Flower size={25} petal="#dfa890" rotate={24} />
      </div>
      <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2">
        <Flower size={23} petal="#f4e0ac" rotate={8} />
      </div>
      <Leaf className="pointer-events-none absolute -left-7 top-10 sm:-left-9" rotate={-30} />
      <Leaf className="pointer-events-none absolute -right-7 top-10 sm:-right-9" rotate={210} />
      <Leaf className="pointer-events-none absolute -bottom-5 left-4" rotate={40} />
      <Leaf className="pointer-events-none absolute -bottom-5 right-4" rotate={140} />

      {/* jewel drop */}
      <motion.span
        animate={{ y: [0, 4, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-7 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-gradient-to-br from-gold-200 to-gold-600 shadow-[0_0_14px_rgba(227,181,74,0.8)]"
      />
    </motion.div>
  );
}

function CurtainPanel({ side, unlocked }) {
  const isLeft = side === "left";
  return (
    <motion.div
      animate={unlocked ? { scaleX: 0.12, x: isLeft ? "-6%" : "6%" } : { scaleX: 1, x: "0%" }}
      transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      style={{ ...curtainFabric, transformOrigin: isLeft ? "left center" : "right center" }}
      className={`relative h-full w-1/2 will-change-transform ${
        isLeft ? "border-r" : "border-l"
      } border-gold-500/40`}
    >
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/50 via-black/15 to-transparent" />

      {/* embroidered arch */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${isLeft ? "" : "-scale-x-100"}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14 100 V40 C14 22 30 10 50 8"
          stroke="#e3b54a"
          strokeWidth="0.5"
          opacity="0.35"
        />
        <path
          d="M26 100 V46 C26 32 36 22 50 20"
          stroke="#f4e0ac"
          strokeWidth="0.3"
          opacity="0.22"
        />
        <path
          d="M14 100 V40 C14 22 30 10 50 8"
          stroke="#f4e0ac"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="0.1 6"
          opacity="0.3"
        />
      </svg>

      {/* embroidered hearts down the inner edge */}
      {[34, 50, 66].map((top, i) => (
        <div
          key={top}
          className={`absolute ${isLeft ? "right-8 sm:right-12" : "left-8 sm:left-12"}`}
          style={{ top: `${top}%` }}
        >
          <HeartMotif size={12 - i} opacity={0.5 - i * 0.1} />
        </div>
      ))}

      {/* gathered rosette tie-back */}
      <div
        className={`absolute top-[58%] ${isLeft ? "right-2 sm:right-3" : "left-2 sm:left-3"}`}
        style={{ transform: "translateY(-50%)" }}
      >
        <Flower size={26} petal="#eccb77" rotate={isLeft ? -12 : 12} />
      </div>

      {/* beaded gold trim on the inner edge */}
      <div
        className={`absolute inset-y-0 ${isLeft ? "right-0" : "left-0"} w-[3px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700`}
      />
      <div
        className={`absolute inset-y-0 ${isLeft ? "right-[5px]" : "left-[5px]"} w-[9px] opacity-80`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #f4e0ac 0 1.6px, #946427 1.6px 2.4px, transparent 2.4px)",
          backgroundSize: "9px 12px"
        }}
      />
      {/* hem shadow */}
      <div
        className={`absolute bottom-0 ${isLeft ? "right-0" : "left-0"} h-16 w-full bg-gradient-to-t from-black/55 to-transparent`}
      />
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700" />
    </motion.div>
  );
}

function SwagRow({ count = 9 }) {
  return (
    <div className="absolute inset-x-0 -bottom-6 flex justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative h-8 flex-1 sm:h-10">
          <div
            className="h-full w-full rounded-b-[100%] border-b-2 border-gold-400/60"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #1b5a41 0%, #0d3a2b 55%, #04180f 100%)",
              boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.6)"
            }}
          />
          <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rotate-45 bg-gold-300/80" />
          <span className="absolute bottom-0 left-1/2 h-[7px] w-[7px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-300 shadow-[0_0_10px_rgba(227,181,74,0.9)]" />
        </div>
      ))}
    </div>
  );
}

function Valance({ lifting }) {
  return (
    <motion.div
      animate={lifting ? { y: "-112%" } : { y: "0%" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
      className="absolute inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)] will-change-transform"
    >
      <div
        className="relative w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.52) 0px, rgba(0,0,0,0.34) 8px, rgba(240,212,138,0.12) 16px, rgba(240,212,138,0.24) 22px, rgba(0,0,0,0.34) 30px, rgba(0,0,0,0.52) 38px), linear-gradient(180deg, #1a5741 0%, #0d3a2b 52%, #061e15 100%)`,
          boxShadow: "0 20px 44px rgba(0,0,0,0.6)"
        }}
      >
        <div className="relative h-16 w-full sm:h-20">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700" />
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700" />

          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-around px-2 opacity-80 sm:px-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <React.Fragment key={i}>
                {i % 3 === 1 ? (
                  <Leaf rotate={i % 2 ? -22 : 202} />
                ) : (
                  <Flower
                    size={i === 4 ? 28 : 19}
                    rotate={(i * 41) % 360}
                    petal={i % 3 === 0 ? "#dfa890" : "#eccb77"}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* central heart medallion */}
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/70 bg-ink-950/70 shadow-[0_0_22px_rgba(227,181,74,0.45)] sm:h-16 sm:w-16">
            <svg width="54%" height="54%" viewBox="0 0 100 92" fill="none" aria-hidden="true">
              <path d={HEART_PATH} fill="rgba(227,181,74,0.14)" stroke="#f4e0ac" strokeWidth="5" />
            </svg>
          </div>

          <Tassel className="absolute left-3 top-full -translate-x-1/2 sm:left-8" />
          <Tassel className="absolute right-3 top-full translate-x-1/2 sm:right-8" />
        </div>

        <SwagRow count={9} />
      </div>
    </motion.div>
  );
}

function CelebrationBurst({ active }) {
  const { petals, flowers } = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const petals = Array.from({ length: isMobile ? 14 : 26 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 26 + Math.random() * 0.3;
      const dist = 120 + Math.random() * 180;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist + 140,
        rot: Math.random() * 540 - 270,
        scale: 0.7 + Math.random() * 0.6,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        delay: Math.random() * 0.22,
        duration: 1.3 + Math.random() * 0.5
      };
    });

    const flowers = Array.from({ length: isMobile ? 6 : 12 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 12 - Math.PI / 2;
      const dist = 110 + Math.random() * 80;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 16 + Math.random() * 14,
        rot: Math.random() * 320 - 160,
        petal: i % 3 === 0 ? "#dfa890" : "#eccb77",
        delay: Math.random() * 0.18,
        duration: 1.4 + Math.random() * 0.4
      };
    });

    return { petals, flowers };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[45] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {active && (
          <>
            {flowers.map((f) => (
              <motion.span
                key={`f-${f.id}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
                animate={{
                  x: f.x,
                  y: f.y,
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1, 0.9],
                  rotate: f.rot
                }}
                transition={{ duration: f.duration, delay: f.delay, ease: "easeOut" }}
                className="absolute"
              >
                <Flower size={f.size} petal={f.petal} />
              </motion.span>
            ))}
            {petals.map((p) => (
              <motion.span
                key={`p-${p.id}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, p.scale, p.scale],
                  rotate: p.rot
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
                className="absolute h-3 w-3 rounded-[80%_0_80%_0]"
                style={{ background: p.color }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Balloon({ color, size }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" aria-hidden="true">
      <ellipse cx="20" cy="19" rx="15" ry="18" fill={color} />
      <ellipse cx="14.5" cy="12.5" rx="4.2" ry="6.4" fill="#ffffff" opacity="0.38" />
      <ellipse cx="25" cy="26" rx="3" ry="5" fill="#000000" opacity="0.12" />
      <path d="M20 37.5 l-3.4 5.2 h6.8 z" fill={color} />
      <path
        d="M20 43 C15 47 25 50 19.5 57"
        stroke="#f4e0ac"
        strokeWidth="0.9"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}

function Balloons({ active }) {
  const balloons = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    return Array.from({ length: isMobile ? 8 : 16 }, (_, i) => ({
      id: i,
      left: 3 + Math.random() * 94,
      size: 24 + Math.random() * 26,
      delay: Math.random() * 0.35,
      duration: 1.35 + Math.random() * 0.55,
      sway: (Math.random() - 0.5) * 70,
      tilt: (Math.random() - 0.5) * 16,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length]
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[34] overflow-hidden">
      <AnimatePresence>
        {active &&
          balloons.map((b) => (
            <motion.div
              key={b.id}
              className="absolute bottom-[-18%]"
              style={{ left: `${b.left}%` }}
              initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
              animate={{ y: "-122vh", x: [0, b.sway, 0], opacity: [0, 1, 1, 0.9], rotate: [b.tilt, -b.tilt] }}
              transition={{ duration: b.duration, delay: b.delay, ease: "easeOut" }}
            >
              <Balloon color={b.color} size={b.size} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

function FlowerRain({ active }) {
  const flowers = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    return Array.from({ length: isMobile ? 10 : 22 }, (_, i) => ({
      id: i,
      left: 2 + Math.random() * 96,
      size: 13 + Math.random() * 16,
      delay: Math.random() * 0.3,
      duration: 1.35 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 60,
      rot: 180 + Math.random() * 360,
      petal: PETAL_COLORS[i % PETAL_COLORS.length]
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[44] overflow-hidden">
      <AnimatePresence>
        {active &&
          flowers.map((f) => (
            <motion.div
              key={f.id}
              className="absolute top-[-12%]"
              style={{ left: `${f.left}%` }}
              initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
              animate={{ y: "118vh", x: [0, f.drift, 0], opacity: [0, 1, 1, 0.85], rotate: f.rot }}
              transition={{ duration: f.duration, delay: f.delay, ease: "easeIn" }}
            >
              <Flower size={f.size} petal={f.petal} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default function OpeningScreen({ data, onOpening, onOpen }) {
  const { couple } = data;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  // Warm the audio cache while the guest is looking at the gate, so the track
  // starts instantly on the tap.
  useEffect(() => {
    preloadMusic();
  }, []);

  // Let the curtain start moving before mounting dozens of animated props,
  // otherwise the tap frame does all the work at once and stutters on phones.
  useEffect(() => {
    if (!isUnlocked) return;
    const t = setTimeout(() => setCelebrate(true), 120);
    return () => clearTimeout(t);
  }, [isUnlocked]);

  const groomInitial = (couple.groom.name || "M").trim().charAt(0).toUpperCase();
  const brideInitial = (couple.bride.name || "A").trim().charAt(0).toUpperCase();

  const handleUnlock = () => {
    if (isUnlocked) return;
    // Must happen inside the tap handler: mobile browsers only allow audio
    // to start from a real user gesture.
    playMusic();
    setIsUnlocked(true);
    onOpening?.();
    setTimeout(() => onOpen?.(), 2400);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_42%,#123f30_0%,#0a2e23_48%,#041a12_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 50% 45%, rgba(240,212,138,0.26) 0%, rgba(240,212,138,0) 70%)"
        }}
      />
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.07]">
        <IslamicPattern variant="star" className="h-full w-full" color="#f0d48a" />
      </div>
      <div className="absolute inset-0 z-[1] opacity-70">
        <GoldenParticles count={30} />
      </div>

      {/* gate frame stays while the curtains part */}
      <div className="absolute inset-0 z-[25] flex items-center justify-center">
        <ArchFrame />
      </div>

      <Balloons active={celebrate} />
      <FlowerRain active={celebrate} />

      {/* golden flash on unlock */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-[33] bg-[radial-gradient(circle_at_50%_45%,rgba(255,235,185,0.75)_0%,rgba(255,225,160,0.18)_34%,transparent_62%)]"
          />
        )}
      </AnimatePresence>

      {/* curtains */}
      <div className="pointer-events-none absolute inset-0 z-30 flex">
        <CurtainPanel side="left" unlocked={isUnlocked} />
        <CurtainPanel side="right" unlocked={isUnlocked} />
        <Valance lifting={isUnlocked} />
      </div>

      <CelebrationBurst active={celebrate} />

      {/* crest + hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isUnlocked ? 0 : 1 }}
        transition={{ duration: isUnlocked ? 0.7 : 0.9, delay: isUnlocked ? 0 : 0.35 }}
        style={{ pointerEvents: isUnlocked ? "none" : "auto" }}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6 pb-[env(safe-area-inset-bottom)]"
      >
        <HeartCrest
          groomInitial={groomInitial}
          brideInitial={brideInitial}
          unlocking={isUnlocked}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-7 flex flex-col items-center gap-2.5 sm:mt-9"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold-300 sm:text-xs"
          >
            Tap to Open
          </motion.span>

          <motion.span
            animate={{ scale: [1, 1.32, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/60 bg-ink-900/50 shadow-[0_0_20px_rgba(227,181,74,0.35)] sm:h-12 sm:w-12"
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
            <span className="absolute -right-1 -top-1 text-[9px] text-gold-300/90">{"\u2665"}</span>
          </motion.span>

          <span className="flex items-center gap-2">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
            <span className="text-[8px] text-gold-300/80">{"\u2665"}</span>
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
