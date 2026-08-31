import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaDirections,
  FaLandmark
} from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { itemFadeUp, container } from "../../animations/variants";
import { DEFAULT_DATA } from "../../data/defaults";

const WALIMA_VENUE = {
  name: "Walima",
  venue: "C.N Conventional Hall",
  address: "Beekanahalli, Chikkamagaluru, Karnataka, India",
  landmark: "CN WINDSOR, Chikmagaluru",
  mapEmbed:
    "https://www.google.com/maps?q=C.N+Conventional+Hall,+Beekanahalli,+Chikkamagaluru,+Karnataka&output=embed",
  mapsLink: "https://maps.app.goo.gl/zhiJudu6TQiQjW5L9"
};

export default function Venue({ data }) {
  const nikah = {
    name: "Nikah & Reception",
    venue: data.venue.name || DEFAULT_DATA.venue.name,
    address: data.venue.address || DEFAULT_DATA.venue.address,
    landmark: data.venue.landmark || DEFAULT_DATA.venue.landmark,
    mapEmbed: data.venue.mapEmbed || DEFAULT_DATA.venue.mapEmbed,
    mapsLink: data.venue.mapsLink || DEFAULT_DATA.venue.mapsLink
  };

  const cards = [nikah, WALIMA_VENUE];

  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Where we celebrate"
          title="Venues"
          subtitle="We would be honoured to welcome you to our celebrations."
        />

        <motion.div
          variants={container(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {cards.map((v) => (
            <motion.div
              key={v.name}
              variants={itemFadeUp}
              className="overflow-hidden rounded-3xl gold-border luxury-shadow bg-white/70 backdrop-blur"
            >
              <div className="relative h-[280px] w-full">
                <iframe
                  title={`${v.name} venue map`}
                  src={v.mapEmbed}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h3 className="font-script text-3xl text-ink-900">{v.name}</h3>
                    <p className="font-serif text-sm italic text-ink-800/80">{v.venue}</p>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-start gap-3 rounded-xl border border-gold-200/60 bg-white/60 p-3">
                    <FaLandmark className="mt-0.5 text-gold-600" />
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-600">Address</p>
                      <p className="font-serif text-sm text-ink-800">{v.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-gold-200/60 bg-white/60 p-3">
                    <FaLandmark className="mt-0.5 text-gold-600" />
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold-600">Landmark</p>
                      <p className="font-serif text-sm text-ink-800">{v.landmark}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={v.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  <FaDirections />
                  Get Directions
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
