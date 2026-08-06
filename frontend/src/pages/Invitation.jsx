import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useData } from "../context/DataContext";
import { useLenis } from "../hooks/useLenis";
import Loader from "../components/ui/Loader";
import OpeningScreen from "../components/OpeningScreen";
import Hero from "../components/sections/Hero";
import ScratchReveal from "../components/sections/ScratchReveal";
import Story from "../components/sections/Story";
import Events from "../components/sections/Events";
import Countdown from "../components/sections/Countdown";
import Family from "../components/sections/Family";
import Venue from "../components/sections/Venue";
import ThankYou from "../components/sections/ThankYou";
import FloatingActions from "../components/ui/FloatingActions";
import InstallPrompt from "../components/ui/InstallPrompt";
import LazySection from "../components/ui/LazySection";
import GoldenParticles from "../components/effects/GoldenParticles";

export default function Invitation() {
  const { data } = useData();
  const [opened, setOpened] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useLenis();

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = useCallback(() => {
    setOpened(true);
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
            <ScratchReveal data={data} />
            <LazySection>
              <Story data={data} />
            </LazySection>
            <LazySection>
              <Events data={data} />
            </LazySection>
            <LazySection>
              <Countdown data={data} />
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
              <p className="relative z-10 font-script text-2xl text-gold-300">
                Made with {"\u2665"} for our forever
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
