import React from "react";
import { motion } from "framer-motion";
import { container, itemBlur } from "../../animations/variants";

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
  className = ""
}) {
  return (
    <motion.div
      variants={container(0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`mb-14 text-center ${className}`}
    >
      {eyebrow && (
        <motion.p
          variants={itemBlur}
          className={`mb-3 font-sans text-xs font-medium uppercase tracking-[0.35em] ${
            light ? "text-gold-300" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={itemBlur}
        className={`font-script text-5xl md:text-6xl ${
          light ? "text-cream-100" : "gold-text"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={itemBlur}
        className="mt-6 flex items-center justify-center gap-3"
      >
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/70 md:w-24" />
        <span className="block h-2 w-2 rotate-45 bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold" />
        <span className="font-script text-2xl leading-none text-gold-500">
          {"\u2665"}
        </span>
        <span className="block h-2 w-2 rotate-45 bg-gradient-to-br from-gold-300 to-gold-600 shadow-gold" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/70 md:w-24" />
      </motion.div>
      {subtitle && (
        <motion.p
          variants={itemBlur}
          className={`mx-auto mt-5 max-w-2xl font-serif text-lg italic ${
            light ? "text-cream-200/80" : "text-ink-800/70"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
