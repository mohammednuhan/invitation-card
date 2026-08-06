import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaDirections,
  FaParking,
  FaLandmark
} from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { itemFadeUp, container } from "../../animations/variants";

export default function Venue({ data }) {
  const v = data.venue;

  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Where we celebrate"
          title="Venue"
          subtitle="We would be honoured to welcome you to our celebration."
        />

        <motion.div
          variants={container(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          <motion.div
            variants={itemFadeUp}
            className="overflow-hidden rounded-3xl gold-border luxury-shadow"
          >
            <div className="relative h-full min-h-[380px] w-full">
              <iframe
                title="Wedding venue map"
                src={v.mapEmbed}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemFadeUp}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold">
                <FaMapMarkerAlt size={22} />
              </div>
              <h3 className="font-script text-4xl text-ink-900 md:text-5xl">
                {v.name}
              </h3>
              <p className="mt-2 font-serif text-lg italic text-ink-800/80">
                {v.address}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-4 rounded-2xl border border-gold-200/60 bg-white/60 p-4">
                <FaParking className="mt-1 text-gold-600" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-600">
                    Parking
                  </p>
                  <p className="font-serif text-base text-ink-800">{v.parking}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-gold-200/60 bg-white/60 p-4">
                <FaLandmark className="mt-1 text-gold-600" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-600">
                    Landmark
                  </p>
                  <p className="font-serif text-base text-ink-800">{v.landmark}</p>
                </div>
              </div>
            </div>

            <a
              href={v.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.25em]"
            >
              <FaDirections />
              Get Directions
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
