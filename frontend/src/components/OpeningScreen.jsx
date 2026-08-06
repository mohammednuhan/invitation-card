import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenParticles from "./effects/GoldenParticles";
import FallingPetals from "./effects/FallingPetals";
import { IslamicPattern } from "./effects/Ornaments";

const STEPS = {
  BISMILLAH: "bismillah",
  PATTERNS: "patterns",
  COUPLE: "couple"
};

export default function OpeningScreen({ data, onOpen }) {
  const [step, setStep] = useState(STEPS.BISMILLAH);
  const [showButton, setShowButton] = useState(false);
  const { couple } = data;

  useEffect(() => {
    const t1 = setTimeout(() => setStep(STEPS.PATTERNS), 2600);
    const t2 = setTimeout(() => setStep(STEPS.COUPLE), 5200);
    const t3 = setTimeout(() => setShowButton(true), 8000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  return (
    <motion.div
      exit={{ scale: 1.4, opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950"
    >
      <GoldenParticles count={90} />
      <FallingPetals count={14} />

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <IslamicPattern variant="arch" className="h-full w-full" color="#f0d48a" />
      </div>

      <AnimatePresence mode="wait">
        {step === STEPS.BISMILLAH && (
          <motion.div
            key="bismillah"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.3 }}
            >
              <p className="font-script text-6xl text-gold-300 md:text-7xl">
                {"\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650"}
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              className="mt-6 font-serif text-sm uppercase tracking-[0.5em] text-cream-200/80 md:text-base"
            >
              In the Name of Allah
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 1] }}
              transition={{ duration: 1.6, delay: 2 }}
              className="mt-2 font-serif text-xs italic tracking-widest text-gold-400/70"
            >
              The Most Gracious, The Most Merciful
            </motion.p>
          </motion.div>
        )}

        {step === STEPS.PATTERNS && (
          <motion.div
            key="patterns"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-40 w-40 text-gold-400"
            >
              <IslamicPattern variant="star" className="h-full w-full" color="#f0d48a" />
            </motion.div>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4 }}
              className="-mt-6 h-24 w-64 text-gold-500"
            >
              <IslamicPattern variant="arch" className="h-full w-full" color="#e3b54a" />
            </motion.div>
          </motion.div>
        )}

        {step === STEPS.COUPLE && (
          <motion.div
            key="couple"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="font-serif text-xs uppercase text-gold-300/90 md:text-sm"
            >
              Together With Their Families
            </motion.p>

            <div className="mt-10">
              <h2 className="font-script text-6xl leading-tight text-cream-50 drop-shadow-[0_0_30px_rgba(227,181,74,0.35)] md:text-8xl">
                {couple.groom.name}
              </h2>
              <div className="my-4 flex items-center justify-center gap-4">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-400" />
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="font-serif text-2xl text-gold-300 md:text-3xl"
                >
                  {"\u2661"}
                </motion.span>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-400" />
              </div>
              <h2 className="font-script text-6xl leading-tight text-cream-50 drop-shadow-[0_0_30px_rgba(227,181,74,0.35)] md:text-8xl">
                {couple.bride.name}
              </h2>
            </div>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleOpen}
                  className="btn-luxury mt-12 rounded-full px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.35em] md:px-16 md:text-base"
                >
                  Open Invitation
                </motion.button>
              )}
            </AnimatePresence>

            {!showButton && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12 font-serif text-sm italic tracking-widest text-gold-400/70"
              >
                With the blessings of Allah
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
