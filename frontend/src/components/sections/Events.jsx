import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { CornerOrnament } from "../effects/Ornaments";
import {
  FaRing,
  FaGlassCheers,
  FaSeedling,
  FaHandHoldingHeart,
  FaUtensils,
  FaMapMarkerAlt,
  FaDirections
} from "react-icons/fa";
import { itemFadeUp, container } from "../../animations/variants";

const ICON_MAP = {
  rings: FaRing,
  glass: FaGlassCheers,
  flower: FaSeedling,
  hand: FaHandHoldingHeart,
  plate: FaUtensils
};

const LOCATION_MAP = {
  Nikah: {
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.5!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1234567890",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Royal+Heritage+Palace+Jaipur+Rajasthan"
  },
  Walima: {
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.5!2d75.5646!3d13.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDE4JzU0LjciTiA3NcKwMzMnNTIuNiJF!5e0!3m2!1sen!2sin!4v1234567890",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Beekanahalli+Chikkamagaluru+Karnataka+577102"
  }
};

export default function Events({ data }) {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-cream-50 py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <img src="/images/floral-bg.png" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Mark your calendar"
          title="Wedding Events"
          subtitle="Five beautiful ceremonies to celebrate our union."
        />

        <motion.div
          variants={container(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.events.map((ev, i) => {
            const Icon = ICON_MAP[ev.icon] || FaGlassCheers;
            const loc = LOCATION_MAP[ev.title];
            return (
              <motion.div
                key={i}
                variants={itemFadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl gold-border luxury-shadow bg-white/70 backdrop-blur"
              >
                <CornerOrnament
                  color="#d4a03c"
                  className="pointer-events-none absolute -left-2 -top-2 h-14 w-14 text-gold-400/40"
                />
                <CornerOrnament
                  color="#d4a03c"
                  className="pointer-events-none absolute -bottom-2 -right-2 h-14 w-14 rotate-180 text-gold-400/40"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-center">
                  <span className="h-1.5 w-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
                  <span className="absolute top-[3px] h-2 w-2 rotate-45 bg-gold-600 shadow-gold" />
                </div>
                <div className="p-8">
                  <div className="relative mb-6 inline-flex">
                    <motion.div
                      whileHover={{ rotate: 12 }}
                      className="relative flex h-20 w-16 items-start justify-center overflow-hidden rounded-t-full rounded-b-xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 pt-5 text-white shadow-gold"
                    >
                      <Icon size={24} />
                      <span className="absolute bottom-2 h-2 w-2 rotate-45 bg-white/40" />
                    </motion.div>
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[10px] font-semibold text-gold-300 ring-1 ring-gold-400/40">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-script text-4xl text-ink-900">{ev.title}</h3>

                  <div className="mt-4 space-y-2 font-serif text-base text-ink-800/80">
                    <p className="flex items-center gap-3">
                      <span className="font-sans text-xs text-gold-600">DATE</span>
                      {ev.date}
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="font-sans text-xs text-gold-600">TIME</span>
                      {ev.time}
                    </p>
                    <p className="flex items-start gap-3">
                      <FaMapMarkerAlt className="mt-1 shrink-0 text-gold-500" />
                      <span>{ev.venue}</span>
                    </p>
                  </div>

                  {loc && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-gold-200/60">
                      <iframe
                        title={`${ev.title} location`}
                        src={loc.mapEmbed}
                        className="h-36 w-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 border-t border-gold-200/60 pt-4">
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-700/80">
                        Dress code
                      </span>
                      <span className="rounded-full bg-gold-100 px-3 py-1 font-serif text-sm text-gold-800">
                        {ev.dressCode}
                      </span>
                    </div>
                    {loc && (
                      <a
                        href={loc.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto mt-4 flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-gold-700 transition hover:bg-gold-100"
                      >
                        <FaDirections />
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            variants={itemFadeUp}
            className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 p-8 text-center text-white shadow-gold"
          >
            <p className="font-script text-5xl">{"\u2666"}</p>
            <h3 className="mt-3 font-script text-4xl text-white">
              Save the Date
            </h3>
            <p className="mt-2 font-serif italic text-white/90">
              Your presence is the greatest gift of all.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
