import React, { useState } from "react";
import api from "../../lib/api";
import { useData } from "../../context/DataContext";
import { Card, Field, inputCls } from "./ui";

export default function VenueManager() {
  const { data, setData, refresh } = useData();
  const [form, setForm] = useState({
    name: data.venue.name,
    address: data.venue.address,
    landmark: data.venue.landmark,
    parking: data.venue.parking,
    mapEmbed: data.venue.mapEmbed,
    mapsLink: data.venue.mapsLink
  });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const u = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await api.put("/venue", form);
      setData("venue", form);
      setMsg("Venue saved.");
      refresh();
    } catch {
      setMsg("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Venue" subtitle="Location, map and directions">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Venue name">
          <input className={inputCls} value={form.name} onChange={u("name")} />
        </Field>
        <Field label="Address">
          <input className={inputCls} value={form.address} onChange={u("address")} />
        </Field>
        <Field label="Landmark">
          <input className={inputCls} value={form.landmark} onChange={u("landmark")} />
        </Field>
        <Field label="Parking info">
          <input className={inputCls} value={form.parking} onChange={u("parking")} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Google Maps embed URL">
            <input className={inputCls} value={form.mapEmbed} onChange={u("mapEmbed")} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Google Maps navigation link">
            <input className={inputCls} value={form.mapsLink} onChange={u("mapsLink")} />
          </Field>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-luxury rounded-full px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] disabled:opacity-60">
          {saving ? "Saving..." : "Save Venue"}
        </button>
        {msg && <span className="font-serif text-sm italic text-gold-700">{msg}</span>}
      </div>
    </Card>
  );
}
