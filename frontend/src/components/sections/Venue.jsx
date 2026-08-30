import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaDirections,
  FaLandmark
} from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { itemFadeUp, container } from "../../animations/variants";

const VENUES = {
  nikah: {
    name: "Nikah & Reception",
    venue: "The Royal Heritage Palace",
    address: "12, MG Road, Jaipur, Rajasthan 302001",
    landmark: "Opposite City Museum, near Central Park",
    mapEmbed: "https://www.google.com/maps?q=The+Royal+Heritage+Palace+Jaipur+Rajasthan&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Royal+Heritage+Palace+Jaipur+Rajasthan"
  },
  walima: {
    name: "Walima",
    venue: "Beekanahalli, Chikkamagaluru",
    address: "8QPW+CW, Beekanahalli (Rural), Chikkamagaluru, Karnataka 577102",
    landmark: "CN WINDSOR, Chikmagaluru",
    mapEmbed: "https://www.google.com/maps?q=8QPW%2BCW+Beekanahalli+Chikkamagaluru+Karnataka+577102&output=embed",
    mapsLink: "https://share.google/xAUqcNx4NCZhs0ltG"
  }
};

export default function Venue({ data }) {
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
          {Object.entries(VENUES).map(([key, v]) => (
            <motion.div
              key={key}
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
