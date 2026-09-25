import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenParticles from "./effects/GoldenParticles";
import FallingPetals from "./effects/FallingPetals";
import { IslamicPattern } from "./effects/Ornaments";

export default function OpeningScreen({ data, onOpen }) {
  const { couple } = data;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showInnerContent, setShowInnerContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setShowInnerContent(true);
    }, 1000);
    setTimeout(() => {
      setShowButton(true);
    }, 4500);
  };

  return (
    <motion.div
      exit={{ scale: 1.2, opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-950 via-ink-800 to-ink-950" />
      
      <AnimatePresence>
        {isUnlocked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <GoldenParticles count={90} />
            <FallingPetals count={14} />
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
              <IslamicPattern variant="arch" className="h-full w-full" color="#f0d48a" />
            </div>

            <AnimatePresence>
              {showInnerContent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-20 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.4, delay: 0.2 }}
                  >
                    <p className="font-script text-4xl text-gold-300 sm:text-6xl md:text-7xl">
                      {"\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650"}
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, letterSpacing: "0.45em" }}
                    transition={{ duration: 1.4, delay: 1.2 }}
                    className="mt-10 font-serif text-xs uppercase text-gold-300/90 md:text-sm"
                  >
                    Together With Their Families
                  </motion.p>

                  <div className="mt-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.8 }}
                      className="font-script text-4xl leading-tight text-cream-50 drop-shadow-[0_0_30px_rgba(227,181,74,0.35)] sm:text-6xl md:text-8xl"
                    >
                      {couple.groom.name}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 2.2 }}
                      className="my-3 flex items-center justify-center gap-3 sm:my-4 sm:gap-4"
                    >
                      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400 sm:w-14" />
                      <motion.span
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="font-serif text-xl text-gold-300 sm:text-2xl md:text-3xl"
                      >
                        {"\u2661"}
                      </motion.span>
                      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400 sm:w-14" />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 1.8 }}
                      className="font-script text-4xl leading-tight text-cream-50 drop-shadow-[0_0_30px_rgba(227,181,74,0.35)] sm:text-6xl md:text-8xl"
                    >
                      {couple.bride.name}
                    </motion.h2>
                  </div>

                  <AnimatePresence>
                    {showButton && (
                      <motion.button
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onOpen}
                        className="btn-luxury mt-12 rounded-full px-12 py-4 font-sans text-sm font-medium uppercase tracking-[0.35em] md:px-16 md:text-base"
                      >
                        Open Invitation
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute inset-0 z-30 flex pointer-events-none">
        <motion.div
          animate={isUnlocked ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="relative h-full w-1/2 bg-gradient-to-br from-ink-800 to-ink-950 border-r border-gold-500/30 shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
        >
          <div className="absolute inset-0 opacity-10">
            <IslamicPattern variant="arch" className="h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/4" color="#f0d48a" />
          </div>
          <div className="absolute top-1/2 w-full h-12 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 -translate-y-1/2 shadow-lg" />
        </motion.div>

        <motion.div
          animate={isUnlocked ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="relative h-full w-1/2 bg-gradient-to-bl from-ink-800 to-ink-950 border-l border-gold-500/30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
        >
          <div className="absolute inset-0 opacity-10">
            <IslamicPattern variant="arch" className="h-[200%] w-[200%] translate-x-0 -translate-y-1/4" color="#f0d48a" />
          </div>
          <div className="absolute top-1/2 w-full h-12 bg-gradient-to-l from-gold-600 via-gold-400 to-gold-600 -translate-y-1/2 shadow-lg" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute z-40 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleUnlock}
          >
            <motion.div
              animate={{ 
                boxShadow: ["0 0 20px rgba(227,181,74,0.3)", "0 0 50px rgba(227,181,74,0.6)", "0 0 20px rgba(227,181,74,0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 p-1 shadow-2xl sm:h-32 sm:w-32"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full border border-gold-300/50 bg-ink-900">
                <span className="font-script text-3xl text-gold-400 sm:text-5xl">
                  {couple.groom.name[0]} &amp; {couple.bride.name[0]}
                </span>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 font-sans text-xs uppercase tracking-[0.4em] text-gold-300/80 sm:text-sm"
            >
              Tap to unwrap
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
