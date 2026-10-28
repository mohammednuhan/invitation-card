import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useData } from "../context/DataContext";
import { useLenis } from "../hooks/useLenis";
import { useCountdown } from "../hooks/useCountdown";
import Loader from "../components/ui/Loader";
import OpeningScreen from "../components/OpeningScreen";
import Hero from "../components/sections/Hero";
import ScratchReveal from "../components/sections/ScratchReveal";
import Events from "../components/sections/Events";
import Family from "../components/sections/Family";
import Venue, { VALIMA_VENUE } from "../components/sections/Venue";
import ThankYou from "../components/sections/ThankYou";
import FloatingActions from "../components/ui/FloatingActions";
import InstallPrompt from "../components/ui/InstallPrompt";
import MusicToggle from "../components/ui/MusicToggle";
import LazySection from "../components/ui/LazySection";
import GoldenParticles from "../components/effects/GoldenParticles";
import { stopMusic } from "../lib/music";

function HeartDate({ n, className = "" }) {
  return (
    <span className={`relative flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9 ${className}`}>
      <svg
        viewBox="0 0 32 30"
        className="absolute inset-0 h-full w-full drop-shadow-[0_2px_7px_rgba(9,45,33,0.4)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="calHeart" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#17624a" />
            <stop offset="55%" stopColor="#0d3b2c" />
            <stop offset="100%" stopColor="#062018" />
          </linearGradient>
        </defs>
        <path
          d="M16 28.6C13.9 27 1.4 19.2 1.4 10.7 1.4 5.5 5.3 1.8 9.9 1.8c2.6 0 5 1.3 6.1 3.4 1.1-2.1 3.5-3.4 6.1-3.4 4.6 0 8.5 3.7 8.5 8.9 0 8.5-12.5 16.3-14.6 17.9z"
          fill="url(#calHeart)"
          stroke="#e3b54a"
          strokeWidth="1.1"
        />
      </svg>
      <span className="relative font-display text-[10px] font-bold leading-none text-gold-200 sm:text-[11px]">
        {n}
      </span>
    </span>
  );
}

function CountdownTiles({ date }) {
  const countdown = useCountdown(date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 sm:mt-16"
    >
      <p className="mb-4 font-serif text-xs uppercase tracking-[0.4em] text-gold-600 sm:text-sm">
        Counting down to forever
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
        {[
          { label: "Days", value: countdown.days },
          { label: "Hours", value: countdown.hours },
          { label: "Minutes", value: countdown.minutes },
          { label: "Seconds", value: countdown.seconds }
        ].map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
            className="relative flex flex-col items-center"
          >
            <div className="flex h-20 w-16 flex-col items-center justify-center rounded-2xl glass-dark shadow-luxury sm:h-28 sm:w-24 sm:rounded-3xl md:h-36 md:w-32">
              <span className="font-display text-3xl font-bold text-gold-300 sm:text-5xl md:text-6xl">
                {String(t.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-sans text-[8px] uppercase tracking-[0.2em] text-cream-200/70 sm:mt-2 sm:text-[11px] sm:tracking-[0.3em]">
                {t.label}
              </span>
            </div>
            {i < 3 && (
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 font-display text-lg text-gold-400/60 sm:-right-4 sm:text-2xl md:-right-6 md:text-3xl">
                :
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DateReveal({ data }) {
  const { couple } = data;
  const weddingDate = new Date(couple.date);
  const validDate = !Number.isNaN(weddingDate.getTime());

  const year = validDate ? weddingDate.getFullYear() : 2026;
  const month = validDate ? weddingDate.getMonth() : 11;
  const day = validDate ? weddingDate.getDate() : 20;
  const valimaDay = day + 1;

  const monthName = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long" });
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const fmtWeekday = (d) =>
    new Date(year, month, d).toLocaleDateString("en-US", { weekday: "long" });
  const fmtShortWeekday = (d) =>
    new Date(year, month, d).toLocaleDateString("en-US", { weekday: "short" });

  const initialsRow = [
    {
      label: "Nikah",
      day,
      time: data.events?.find((e) => e.title === "Nikah")?.time || "11:30 AM",
      venue: couple.venueName,
      address: couple.venueAddress,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        couple.venueAddress || couple.venueName || "Bantara Bhavana, Koppa"
      )}`
    },
    {
      label: "Valima",
      day: valimaDay,
      time: data.events?.find((e) => e.title === "Valima")?.time || "01:00 PM",
      venue: VALIMA_VENUE.venue,
      address: VALIMA_VENUE.address,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        VALIMA_VENUE.address
      )}`
    }
  ];

  const cells = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-white to-cream-50 py-16 sm:py-24">
      <GoldenParticles count={22} />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p className="mb-3 font-sans text-[9px] font-light uppercase tracking-[0.55em] text-gold-700 sm:text-[11px]">
            We are getting married
          </p>

          <h2 className="bg-gradient-to-b from-gold-700 via-gold-500 to-gold-700 bg-clip-text font-script text-5xl text-transparent drop-shadow-[0_2px_14px_rgba(212,160,60,0.35)] sm:text-6xl md:text-7xl">
            Save the Date
          </h2>

          <div className="my-6 flex items-center gap-3 sm:my-8">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400 sm:w-20" />
            <span className="block h-2 w-2 rotate-45 bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold" />
            <span className="font-script text-2xl text-gold-500">{"\u2665"}</span>
            <span className="block h-2 w-2 rotate-45 bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400 sm:w-20" />
          </div>

          {/* Date strips: weekday | day | month / year | time — tap for directions */}
          <div className="flex w-full max-w-xl flex-col gap-3.5">
            {initialsRow.map((row) => (
              <a
                key={row.label}
                href={row.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open directions to the ${row.label} venue`}
                className="group block rounded-[1.6rem] bg-gradient-to-b from-gold-300 via-gold-500/80 to-gold-700 p-[1.5px] shadow-[0_14px_45px_-14px_rgba(12,40,30,0.4)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-stretch overflow-hidden rounded-[1.5rem] bg-[radial-gradient(ellipse_at_top,#fffdf6_0%,#faf4e4_55%,#f3e9d2_100%)]">
                  <div className="flex w-20 flex-col items-center justify-center border-r border-gold-400/30 bg-gradient-to-b from-emerald-900/[0.07] to-emerald-900/[0.02] px-1 py-3 sm:w-28">
                    <span className="font-sans text-[7px] uppercase tracking-[0.24em] text-gold-700/80 sm:text-[8px]">
                      {fmtShortWeekday(row.day)}
                    </span>
                    <span className="mt-0.5 font-display text-[12px] font-medium italic text-ink-900 sm:text-[15px]">
                      {fmtWeekday(row.day)}
                    </span>
                  </div>

                  <div className="flex flex-1 items-center justify-center gap-2.5 py-3">
                    <span className="font-script text-4xl leading-none text-ink-900 sm:text-5xl">
                      {row.day}
                    </span>
                    <span className="text-left leading-tight">
                      <span className="block font-serif text-[11px] uppercase tracking-[0.26em] text-gold-700 sm:text-xs">
                        {monthName}
                      </span>
                      <span className="block font-sans text-[10px] font-light tracking-[0.3em] text-ink-800/60 sm:text-[11px]">
                        {year}
                      </span>
                    </span>
                  </div>

                  <div className="flex w-24 flex-col items-center justify-center gap-0.5 border-l border-gold-400/30 bg-gradient-to-b from-emerald-900/[0.05] to-emerald-900/[0.01] px-1 py-3 sm:w-32">
                    <span className="font-serif text-[10px] uppercase tracking-[0.24em] text-gold-700 sm:text-[11px]">
                      {row.label}
                    </span>
                    <span className="font-sans text-[11px] font-light text-ink-800 sm:text-xs">
                      {row.time}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 font-sans text-[7px] uppercase tracking-[0.14em] text-gold-700/70 transition-colors group-hover:text-gold-800 sm:text-[8px]">
                      Directions
                      <span aria-hidden="true">{"\u2197"}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* December calendar */}
          <div className="relative mt-9 w-full max-w-sm rounded-[2rem] bg-gradient-to-b from-gold-300 via-gold-500/80 to-gold-700 p-[1.5px] shadow-[0_18px_55px_-18px_rgba(12,40,30,0.45)]">
            <div className="rounded-[1.9rem] bg-[radial-gradient(ellipse_at_top,#fffdf7_0%,#faf4e4_58%,#f2e7cd_100%)] p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[8px] font-light uppercase tracking-[0.34em] text-gold-700/70">
                  {year}
                </span>
                <p className="font-script text-2xl leading-none text-ink-900 sm:text-[28px]">
                  {monthName}
                </p>
                <span className="text-[10px] text-gold-600">{"\u2665"}</span>
              </div>

              <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

              <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span
                    key={`${d}-${i}`}
                    className="font-serif text-[9px] font-medium uppercase tracking-[0.1em] text-gold-700/70 sm:text-[10px]"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="mt-1.5 grid grid-cols-7 gap-1 text-center">
                {cells.map((d, i) => {
                  const isEvent = d === day || d === valimaDay;
                  return (
                    <span key={i} className="flex aspect-square items-center justify-center">
                      {d &&
                        (isEvent ? (
                          <HeartDate n={d} />
                        ) : (
                          <span className="font-serif text-[11px] text-ink-800/75 sm:text-xs">
                            {d}
                          </span>
                        ))}
                    </span>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-center gap-5 border-t border-gold-400/25 pt-3">
                {initialsRow.map((row) => (
                  <span
                    key={row.label}
                    className="flex items-center gap-1.5 font-serif text-[9px] uppercase tracking-[0.18em] text-ink-800/70 sm:text-[10px]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0f3f2d] ring-1 ring-gold-400/70" />
                    {row.label} {row.day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Venue lines */}
          <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-6">
            {initialsRow.map((row) => (
              <div key={row.label} className="flex flex-col items-center">
                <span className="font-sans text-[8px] font-light uppercase tracking-[0.42em] text-gold-700">
                  {row.label}
                </span>
                <span className="mt-1.5 font-display text-base font-medium italic text-ink-900 sm:text-lg">
                  {row.label === "Nikah" ? couple.venueName : VALIMA_VENUE.venue}
                </span>
                <span className="mt-1 font-serif text-[13px] leading-relaxed tracking-[0.05em] text-ink-800/70 sm:text-sm">
                  {row.address}
                </span>
                <span className="mt-3 flex items-center gap-2 text-gold-500/80">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/70" />
                  <span className="text-[9px]">{"\u2665"}</span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/70" />
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <CountdownTiles date={couple.date} />
      </div>
    </section>
  );
}

export default function Invitation() {
  const { data } = useData();
  const [gateState, setGateState] = useState("closed");
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1300);
    return () => clearTimeout(t);
  }, []);

  // Stop the music if the guest leaves the invitation (e.g. opens admin).
  useEffect(() => () => stopMusic(), []);

  // Pre-mount the invitation behind the gate so tapping "Open" doesn't have to
  // build the whole page (Hero canvas, scratch canvas, etc.) in the same frame.
  useEffect(() => {
    if (showLoader) return;
    const t = setTimeout(() => setContentReady(true), 120);
    return () => clearTimeout(t);
  }, [showLoader]);

  useEffect(() => {
    if (gateState === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gateState]);

  const handleOpening = useCallback(() => {
    setGateState((s) => (s === "closed" ? "opening" : s));
  }, []);

  const handleOpen = useCallback(() => {
    setGateState("done");
  }, []);

  const handleScratchReveal = useCallback(() => {
    setScratchRevealed(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {data.couple.bride.name} &amp; {data.couple.groom.name} | Wedding
          Invitation
        </title>
        <meta
          name="description"
          content={`You are cordially invited to the wedding of ${data.couple.bride.name} & ${data.couple.groom.name} on ${data.couple.date}. Join us for the celebration.`}
        />
        <meta property="og:title" content={`${data.couple.bride.name} & ${data.couple.groom.name} Wedding`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Together with their families, we invite you to celebrate our wedding." />
        <meta property="og:image" content={`${window.location.origin}${data.couple.bride.image || "/images/bride.jpg"}`} />
        <meta name="theme-color" content={data.theme?.primary || "#d4a03c"} />
      </Helmet>

      <AnimatePresence>
        {showLoader && <Loader key="loader" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {gateState !== "done" && !showLoader && (
          <OpeningScreen
            key="opening"
            data={data}
            onOpening={handleOpening}
            onOpen={handleOpen}
          />
        )}
      </AnimatePresence>

      {contentReady && (
        <div
          className="relative"
          aria-hidden={gateState !== "done"}
          style={{ pointerEvents: gateState === "done" ? "auto" : "none" }}
        >
            <Hero data={data} paused={gateState !== "done"} />

            <ScratchReveal data={data} onReveal={handleScratchReveal} />

            <AnimatePresence>
              {scratchRevealed && (
                <motion.div
                  key="date-reveal"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DateReveal data={data} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {scratchRevealed && (
                <>
                  <motion.div
                    key="events-reveal"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  >
                    <LazySection>
                      <Events data={data} />
                    </LazySection>
                  </motion.div>
                  <motion.div
                    key="family-reveal"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  >
                    <LazySection>
                      <Family data={data} />
                    </LazySection>
                  </motion.div>
                  <motion.div
                    key="venue-reveal"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  >
                    <LazySection>
                      <Venue data={data} />
                    </LazySection>
                  </motion.div>
                  <motion.div
                    key="thanks-reveal"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  >
                    <LazySection>
                      <ThankYou data={data} />
                    </LazySection>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <FloatingActions />

            {gateState === "done" && <InstallPrompt />}
            {gateState === "done" && <MusicToggle />}

            <footer className="relative overflow-hidden bg-ink-900 py-10 text-center">
              <GoldenParticles count={20} />
              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6">
                <p className="font-script text-2xl text-gold-300">
                  Made with {"\u2665"} for our forever
                </p>
                <p className="mt-6 max-w-xl border-t border-gold-400/15 pt-5 font-serif text-sm italic leading-relaxed text-cream-200/80 sm:text-base">
                  Your duas are precious to us. May Allah bless our union in this
                  Dunya and reunite us in Jannatul Firdaus.
                </p>
              </div>
            </footer>
        </div>
      )}
    </>
  );
}
