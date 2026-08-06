import React, { useState } from "react";
import api from "../../lib/api";
import { useData } from "../../context/DataContext";
import { Card, Field, inputCls, ImageUpload } from "./ui";

const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};

export default function CoupleManager() {
  const { data, setData, refresh } = useData();
  const [form, setForm] = useState({
    slug: data.slug,
    brideName: data.couple.bride.name,
    brideFullName: data.couple.bride.fullName,
    brideFather: data.couple.bride.father,
    brideImage: data.couple.bride.image,
    groomName: data.couple.groom.name,
    groomFullName: data.couple.groom.fullName,
    groomFather: data.couple.groom.father,
    groomImage: data.couple.groom.image,
    date: toLocalInput(data.couple.date),
    venueName: data.couple.venueName,
    venueAddress: data.couple.venueAddress,
    themeWord: data.couple.themeWord
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const u = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const payload = {
        slug: form.slug,
        bride: {
          name: form.brideName,
          fullName: form.brideFullName,
          father: form.brideFather,
          image: form.brideImage
        },
        groom: {
          name: form.groomName,
          fullName: form.groomFullName,
          father: form.groomFather,
          image: form.groomImage
        },
        date: form.date,
        venueName: form.venueName,
        venueAddress: form.venueAddress,
        themeWord: form.themeWord
      };
      await api.put("/couple", payload);
      setData("couple", payload);
      setMsg("Couple details saved successfully.");
      refresh();
    } catch {
      setMsg("Save failed. Check server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Couple" subtitle="Bride & groom names, photos and wedding date">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-gold-200/60 bg-cream-50 p-4">
          <h4 className="font-script text-2xl text-gold-700">Bride</h4>
          <Field label="Display name">
            <input className={inputCls} value={form.brideName} onChange={u("brideName")} />
          </Field>
          <Field label="Full name">
            <input className={inputCls} value={form.brideFullName} onChange={u("brideFullName")} />
          </Field>
          <Field label="Father's name">
            <input className={inputCls} value={form.brideFather} onChange={u("brideFather")} />
          </Field>
          <ImageUpload value={form.brideImage} onChange={(v) => setForm((f) => ({ ...f, brideImage: v }))} label="Bride photo" />
        </div>

        <div className="space-y-4 rounded-xl border border-gold-200/60 bg-cream-50 p-4">
          <h4 className="font-script text-2xl text-gold-700">Groom</h4>
          <Field label="Display name">
            <input className={inputCls} value={form.groomName} onChange={u("groomName")} />
          </Field>
          <Field label="Full name">
            <input className={inputCls} value={form.groomFullName} onChange={u("groomFullName")} />
          </Field>
          <Field label="Father's name">
            <input className={inputCls} value={form.groomFather} onChange={u("groomFather")} />
          </Field>
          <ImageUpload value={form.groomImage} onChange={(v) => setForm((f) => ({ ...f, groomImage: v }))} label="Groom photo" />
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Invitation slug (URL)">
          <input className={inputCls} value={form.slug} onChange={u("slug")} />
        </Field>
        <Field label="Wedding date/time">
          <input type="datetime-local" className={inputCls} value={form.date} onChange={u("date")} />
        </Field>
        <Field label="Venue name">
          <input className={inputCls} value={form.venueName} onChange={u("venueName")} />
        </Field>
        <Field label="Venue address">
          <input className={inputCls} value={form.venueAddress} onChange={u("venueAddress")} />
        </Field>
        <Field label="Theme word">
          <input className={inputCls} value={form.themeWord} onChange={u("themeWord")} />
        </Field>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="btn-luxury rounded-full px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Couple"}
        </button>
        {msg && (
          <span className="font-serif text-sm italic text-gold-700">{msg}</span>
        )}
      </div>
    </Card>
  );
}
