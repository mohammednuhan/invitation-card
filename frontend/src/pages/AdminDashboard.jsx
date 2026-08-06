import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaHeart,
  FaBookOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaTachometerAlt
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CoupleManager from "../components/admin/CoupleManager";
import StoryManager from "../components/admin/StoryManager";
import EventsManager from "../components/admin/EventsManager";
import VenueManager from "../components/admin/VenueManager";

const TABS = [
  { id: "couple", label: "Couple", icon: FaHeart, comp: CoupleManager },
  { id: "story", label: "Story", icon: FaBookOpen, comp: StoryManager },
  { id: "events", label: "Events", icon: FaCalendarAlt, comp: EventsManager },
  { id: "venue", label: "Venue", icon: FaMapMarkerAlt, comp: VenueManager }
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("couple");
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const Active = TABS.find((t) => t.id === tab)?.comp;

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-40 border-b border-gold-200/60 bg-cream-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-gold">
              <FaTachometerAlt />
            </div>
            <div>
              <h1 className="font-script text-2xl text-ink-900 md:text-3xl">
                Wedding Dashboard
              </h1>
              <p className="hidden font-sans text-xs text-ink-800/60 md:block">
                {admin?.username || "Administrator"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/nuhan"
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-gold-300 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-gold-700 transition hover:bg-gold-100"
            >
              <FaExternalLinkAlt /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-red-600 transition hover:bg-red-500 hover:text-white"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row">
        <nav className="flex shrink-0 gap-2 overflow-x-auto md:w-56 md:flex-col">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 font-sans text-sm font-medium transition ${
                  active
                    ? "btn-luxury"
                    : "text-ink-800/70 hover:bg-gold-100"
                }`}
              >
                <Icon />
                {t.label}
              </button>
            );
          })}
        </nav>

        <motion.main
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="min-w-0 flex-1"
        >
          {Active && <Active />}
        </motion.main>
      </div>
    </div>
  );
}
