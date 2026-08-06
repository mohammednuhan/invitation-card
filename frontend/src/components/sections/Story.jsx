import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { itemFromLeft, itemFromRight, itemFadeScale } from "../../animations/variants";
import { FaHeart, FaRing, FaPrayingHands, FaGlassCheers, FaEnvelopeOpen } from "react-icons/fa";

const ICONS = {
  heart: FaHeart,
  ring: FaRing,
  pray: FaPrayingHands,
  glass: FaGlassCheers,
  open: FaEnvelopeOpen
};

const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("met") || t.includes("proposal")) return ICONS.heart;
  if (t.includes("engage")) return ICONS.ring;
  if (t.includes("nikah") || t.includes("nikkah")) return ICONS.pray;
  if (t.includes("walima") || t.includes("wedding") || t.includes("reception"))
    return ICONS.glass;
  return ICONS.open;
};

export default function Story({ data }) {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-ink-900 py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <img src="/images/islamic-bg.png" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionTitle
          light
          eyebrow="Our journey"
          title="Our Story"
          subtitle="Every love story is beautiful, but ours is my favorite."
        />

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold-400/60 via-gold-400/30 to-transparent md:left-1/2" />

          {data.story.map((item, i) => {
            const Icon = getIcon(item.title);
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`relative mb-16 flex flex-col gap-4 pl-14 md:flex-row md:items-center md:gap-0 ${
                  left ? "" : "md:flex-row-reverse"
                }`}
              >
                <motion.div
                  variants={itemFadeScale}
                  className="absolute left-5 top-4 z-10 -translate-x-1/2 md:left-1/2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold-400 bg-ink-900 text-gold-300 shadow-glow">
                    <Icon size={16} />
                  </div>
                </motion.div>

                <motion.div
                  variants={left ? itemFromLeft : itemFromRight}
                  className="md:w-[46%]"
                >
                  <div className="group relative overflow-hidden rounded-2xl gold-border luxury-shadow bg-cream-50 transition-transform duration-500 hover:-translate-y-1 hover:shadow-glow">
                    {item.image && (
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => (e.target.src = "/images/story-1.jpg")}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-600">
                        {item.date}
                      </p>
                      <h3 className="mt-2 font-script text-3xl text-ink-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-serif text-base italic leading-relaxed text-ink-800/80">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="hidden md:block md:w-[46%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
