import React from "react";
import { FaTimes } from "react-icons/fa";

export function Card({ title, subtitle, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gold-200/60 bg-white p-6 shadow-luxury ${className}`}>
      {(title || subtitle) && (
        <div className="mb-5 border-b border-gold-200/50 pb-4">
          {title && (
            <h3 className="font-script text-3xl text-ink-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 font-serif text-sm italic text-ink-800/60">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-gold-300/40 bg-cream-50 px-3 py-2.5 font-sans text-sm text-ink-900 placeholder:text-ink-800/40 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-300/40";

export function ImageUpload({ value, onChange, label = "Image" }) {
  const [preview, setPreview] = React.useState(value || "");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("Image too large. Max 4MB.");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await import("../../lib/api").then((m) =>
        m.default.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
      );
      const url = res.data?.data?.url || res.data?.url;
      setPreview(url);
      onChange(url);
    } catch {
      alert("Upload failed. Make sure the server is running.");
    }
  };

  return (
    <div>
      <span className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gold-300/40 bg-cream-100">
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <span className="font-script text-2xl text-gold-400">+</span>
          )}
        </div>
        <label className="btn-luxury cursor-pointer rounded-lg px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider">
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      </div>
    </div>
  );
}

export function ItemRow({ children, onDelete }) {
  return (
    <div className="relative flex items-start gap-4 rounded-xl border border-gold-200/60 bg-cream-50 p-4">
      {children}
      <button
        onClick={onDelete}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
        title="Delete"
      >
        <FaTimes size={12} />
      </button>
    </div>
  );
}

export function Empty({ text }) {
  return (
    <p className="py-8 text-center font-serif text-base italic text-ink-800/50">
      {text}
    </p>
  );
}
