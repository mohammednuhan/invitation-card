import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { Card, Field, inputCls, ImageUpload, ItemRow, Empty } from "./ui";

const BLANK = { title: "", date: "", text: "", image: "" };

export default function StoryManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    api
      .get("/story")
      .then((res) => setItems(res.data?.data || []))
      .catch(() => {});
  }, []);

  const save = async () => {
    if (!form.title || !form.text) return alert("Title and text required.");
    try {
      const res = await api.post("/story", form);
      setItems((s) => [...s, res.data?.data]);
      setForm(BLANK);
    } catch {
      alert("Save failed.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this story chapter?")) return;
    try {
      await api.delete(`/story/${id}`);
      setItems((s) => s.filter((i) => i._id !== id));
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <Card title="Our Story" subtitle="Add chapters to your love story timeline">
      <div className="mb-6 rounded-xl border border-gold-200/60 bg-cream-50 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Chapter title">
            <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="How We Met" />
          </Field>
          <Field label="Date">
            <input className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="March 2019" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Story text">
              <textarea rows={3} className={inputCls} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Write the story..." />
            </Field>
          </div>
          <div className="md:col-span-2">
            <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} label="Chapter photo" />
          </div>
        </div>
        <button onClick={save} className="btn-luxury mt-4 rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.25em]">
          Add Chapter
        </button>
      </div>

      {items.length === 0 ? (
        <Empty text="No story chapters yet." />
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <ItemRow key={it._id} onDelete={() => remove(it._id)}>
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gold-100">
                {it.image && <img src={it.image} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0">
                <p className="font-script text-2xl text-ink-900">{it.title}</p>
                <p className="font-sans text-xs uppercase tracking-wider text-gold-600">{it.date}</p>
                <p className="mt-1 truncate font-serif text-sm italic text-ink-800/70">{it.text}</p>
              </div>
            </ItemRow>
          ))}
        </div>
      )}
    </Card>
  );
}
