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
import Story from "../components/sections/Story";
import Events from "../components/sections/Events";
import Family from "../components/sections/Family";
import Venue from "../components/sections/Venue";
import ThankYou from "../components/sections/ThankYou";
import FloatingActions from "../components/ui/FloatingActions";
import InstallPrompt from "../components/ui/InstallPrompt";
import LazySection from "../components/ui/LazySection";
import GoldenParticles from "../components/effects/GoldenParticles";

function DateReveal({ data }) {
  const { couple } = data;
  const countdown = useCountdown(couple.date);

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
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50 py-16 sm:py-24">
      <GoldenParticles count={40} />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p className="mb-3 font-serif text-xs uppercase tracking-[0.5em] text-gold-600 sm:text-sm">
            We are getting married
          </p>

          <h2 className="font-script text-4xl text-ink-900 sm:text-5xl md:text-6xl">
            Save the Date
          </h2>

          <div className="my-6 flex items-center gap-3 sm:my-8">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400 sm:w-20" />
            <span className="block h-2 w-2 rotate-45 bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold" />
            <span className="font-script text-2xl text-gold-500">{"\u2665"}</span>
            <span className="block h-2 w-2 rotate-45 bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400 sm:w-20" />
          </div>

          <p className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl md:text-4xl">
            {fmtDate(couple.date)}
          </p>

          <p className="mt-3 font-serif text-base italic text-ink-800/70 sm:text-lg">
            {couple.venueName}
          </p>

          <p className="mt-2 font-serif text-sm text-ink-800/50">
            {couple.venueAddress}
          </p>
        </motion.div>

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
      </div>
    </section>
  );
}

export default function Invitation() {
  const { data } = useData();
  const [opened, setOpened] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = useCallback(() => {
    setOpened(true);
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

      <AnimatePresence>
        {!opened && !showLoader && (
          <OpeningScreen key="opening" data={data} onOpen={handleOpen} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <Hero data={data} />

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

            <LazySection>
              <Story data={data} />
            </LazySection>
            <LazySection>
              <Events data={data} />
            </LazySection>
            <LazySection>
              <Family data={data} />
            </LazySection>
            <LazySection>
              <Venue data={data} />
            </LazySection>
            <LazySection>
              <ThankYou data={data} />
            </LazySection>

            <FloatingActions />

            <InstallPrompt />

            <footer className="relative overflow-hidden bg-ink-900 py-10 text-center">
              <GoldenParticles count={20} />
              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6">
                <p className="font-script text-2xl text-gold-300">
                  Made with {"\u2665"} for our forever
                </p>
                <p className="mt-6 border-t border-gold-400/15 pt-5 font-sans text-[11px] uppercase tracking-[0.25em] text-cream-200/50">
                  Managed by Mohammed Nuhan
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
