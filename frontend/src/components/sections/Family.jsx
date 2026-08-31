import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { FaUserTie, FaUser, FaUserFriends, FaUserAstronaut, FaGraduationCap } from "react-icons/fa";
import { itemFadeUp, container } from "../../animations/variants";

const RELATION_ICON = {
  father: FaUserTie,
  mother: FaUser,
  brother: FaUserFriends,
  sister: FaUserAstronaut,
  education: FaGraduationCap
};

const getIcon = (rel) => {
  const r = (rel || "").toLowerCase();
  for (const key of Object.keys(RELATION_ICON)) {
    if (r.includes(key)) return RELATION_ICON[key];
  }
  return FaUser;
};

export default function Family({ data }) {
  const families = [data.family.groom, data.family.bride];

  return (
    <section
      id="family"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100 py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Our loved ones"
          title="Our Families"
          subtitle="None of this would be possible without the people we love the most."
        />

        <div className="grid gap-10 md:grid-cols-2">
          {families.map((family, fi) => (
            <motion.div
              key={fi}
              variants={container(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl gold-border luxury-shadow bg-white/60 p-8 backdrop-blur"
            >
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold">
                  {fi === 0 ? (
                    <span className="font-script text-2xl">{"\u2642"}</span>
                  ) : (
                    <span className="font-script text-2xl">{"\u2640"}</span>
                  )}
                </div>
                <h3 className="font-script text-4xl text-ink-900">
                  {family.name}
                </h3>
                <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {family.members.map((m, i) => {
                  const Icon = getIcon(m.relation);
                  return (
                    <motion.div
                      key={i}
                      variants={itemFadeUp}
                      whileHover={{ y: -4 }}
                      className="flex w-full flex-col items-center rounded-2xl border border-gold-200/60 bg-cream-50 p-5 text-center transition-shadow hover:shadow-gold sm:w-[calc(50%-0.5rem)]"
                    >
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.name}
                          className="mb-3 h-16 w-16 rounded-full object-cover ring-2 ring-gold-300"
                        />
                      ) : (
                        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                          <Icon size={22} />
                        </div>
                      )}
                      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-600">
                        {m.relation}
                      </p>
                      <p className="mt-1 font-serif text-base font-semibold text-ink-900">
                        {m.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
