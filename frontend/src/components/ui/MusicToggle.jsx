import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaVolumeMute } from "react-icons/fa";
import { isMusicPlaying, subscribeMusic, toggleMusic } from "../../lib/music";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(isMusicPlaying());

  useEffect(() => subscribeMusic(setPlaying), []);

  return (
    <motion.button
      type="button"
      onClick={toggleMusic}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Mute background music" : "Play background music"}
      title={playing ? "Mute music" : "Play music"}
      className="fixed bottom-4 left-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/50 bg-[#062018]/85 text-gold-200 shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition active:scale-95"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {playing && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-gold-300/40"
          animate={{ scale: [1, 1.28], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <span className="relative flex items-center justify-center">
        {playing ? <FaMusic size={15} /> : <FaVolumeMute size={15} />}
      </span>
    </motion.button>
  );
}
