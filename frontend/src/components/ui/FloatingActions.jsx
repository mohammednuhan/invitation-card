import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaShareAlt,
  FaLink,
  FaCalendarPlus,
  FaRegCalendarAlt,
  FaCheck
} from "react-icons/fa";
import { useData } from "../../context/DataContext";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data } = useData();
  const inviteUrl = window.location.href;
  const waPhone = (data.rsvp?.whatsapp || "917019536523").replace(/[^0-9]/g, "");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = inviteUrl;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const msg = `You are cordially invited to the wedding of ${data.couple.bride.name} & ${data.couple.groom.name}!\n\nJoin us to celebrate our special day.\n\n${inviteUrl}`;
    const url = waPhone
      ? `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation - ${data.couple.bride.name} & ${data.couple.groom.name}`,
          text: `You are cordially invited to the wedding of ${data.couple.bride.name} & ${data.couple.groom.name}!`,
          url: inviteUrl
        });
        return;
      } catch {}
    }
    shareWhatsApp();
  };

  const hasValidDate = (() => {
    const t = new Date(data.couple.date).getTime();
    return !Number.isNaN(t);
  })();

  const googleCal = () => {
    if (!hasValidDate) return;
    const start = new Date(data.couple.date);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Wedding of ${data.couple.bride.name} & ${data.couple.groom.name}`,
      dates: `${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${end
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0]}Z`,
      details: `Join us to celebrate the wedding of ${data.couple.bride.name} & ${data.couple.groom.name} at ${data.venue.name}, ${data.venue.address}`,
      location: data.venue.address
    });
    window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank");
  };

  const downloadIcs = () => {
    if (!hasValidDate) return;
    const start = new Date(data.couple.date);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const fmt = (d) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Luxury Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@mywedding.com`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Wedding of ${data.couple.bride.name} & ${data.couple.groom.name}`,
      `DESCRIPTION:Join us to celebrate at ${data.venue.name}`,
      `LOCATION:${data.venue.address}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-reminder.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <a
        href={`https://wa.me/${waPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fa-whatsapp fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg transition active:scale-90"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={26} />
      </a>

      <div
        className="fa-stack fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2 md:bottom-24 md:right-6"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-1 flex flex-col items-end gap-2"
            >
              <button
                onClick={googleCal}
                className="glass-dark flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-cream-100 shadow-luxury transition active:scale-95"
              >
                <FaCalendarPlus /> Google Calendar
              </button>
              <button
                onClick={downloadIcs}
                className="glass-dark flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-cream-100 shadow-luxury transition active:scale-95"
              >
                <FaRegCalendarAlt /> Reminder (.ics)
              </button>
              <button
                onClick={copyLink}
                className="glass-dark flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-cream-100 shadow-luxury transition active:scale-95"
              >
                {copied ? <FaCheck /> : <FaLink />}
                {copied ? "Link copied!" : "Copy link"}
              </button>
              <button
                onClick={share}
                className="btn-luxury flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider active:scale-95"
              >
                <FaShareAlt /> Share
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((o) => !o)}
          className="btn-luxury flex h-14 w-14 items-center justify-center rounded-2xl"
          title="Share invitation"
        >
          <FaShareAlt size={20} />
        </motion.button>
      </div>
    </>
  );
}
