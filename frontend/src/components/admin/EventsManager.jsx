import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { Card, Field, inputCls, ItemRow, Empty } from "./ui";

const BLANK = {
  title: "",
  icon: "rings",
  date: "",
  time: "",
  venue: "",
  dressCode: ""
};

const ICONS = ["rings", "glass", "flower", "hand", "plate"];

export default function EventsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    api
      .get("/events")
      .then((res) => setItems(res.data?.data || []))
      .catch(() => {});
  }, []);

  const save = async () => {
    if (!form.title) return alert("Title required.");
    try {
      const res = await api.post("/events", form);
      setItems((s) => [...s, res.data?.data]);
      setForm(BLANK);
    } catch {
      alert("Save failed.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setItems((s) => s.filter((i) => i._id !== id));
    } catch {
      alert("Delete failed.");
    }
  };

  const u = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Card title="Wedding Events" subtitle="Nikah, reception, and everything in between">
      <div className="mb-6 rounded-xl border border-gold-200/60 bg-cream-50 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Event name">
            <input className={inputCls} value={form.title} onChange={u("title")} placeholder="Nikah" />
          </Field>
          <Field label="Icon">
            <select className={inputCls} value={form.icon} onChange={u("icon")}>
              {ICONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input className={inputCls} value={form.date} onChange={u("date")} placeholder="20 Dec 2026" />
          </Field>
          <Field label="Time">
            <input className={inputCls} value={form.time} onChange={u("time")} placeholder="12:00 PM" />
          </Field>
          <Field label="Venue">
            <input className={inputCls} value={form.venue} onChange={u("venue")} placeholder="Venue name" />
          </Field>
          <Field label="Dress code">
            <input className={inputCls} value={form.dressCode} onChange={u("dressCode")} placeholder="Formal" />
          </Field>
        </div>
        <button onClick={save} className="btn-luxury mt-4 rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.25em]">
          Add Event
        </button>
      </div>

      {items.length === 0 ? (
        <Empty text="No events yet." />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((it) => (
            <ItemRow key={it._id} onDelete={() => remove(it._id)}>
              <div className="min-w-0 flex-1">
                <p className="font-script text-2xl text-ink-900">{it.title}</p>
                <p className="mt-1 font-sans text-xs text-ink-800/70">
                  {it.date} {"\u2022"} {it.time}
                </p>
                <p className="font-serif text-sm italic text-ink-800/60">
                  {it.venue} {"\u2022"} {it.dressCode}
                </p>
              </div>
            </ItemRow>
          ))}
        </div>
      )}
    </Card>
  );
}
