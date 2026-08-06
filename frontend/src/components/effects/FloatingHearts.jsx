import React, { useEffect, useRef } from "react";

export default function FloatingHearts({ count: countProp = 12, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const count =
      window.innerWidth < 768 ? Math.max(3, Math.ceil(countProp * 0.35)) : countProp;

    const hearts = [];
    for (let i = 0; i < count; i++) {
      const h = document.createElement("div");
      const size = 10 + Math.random() * 14;
      const duration = 8 + Math.random() * 10;
      const delay = -Math.random() * duration;

      h.style.cssText = `
        position: absolute;
        bottom: -30px;
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        font-size: ${size}px;
        line-height: 1;
        content: "♥";
        color: rgba(212,160,60,0.35);
        opacity: 0;
        animation: heartFloat ${duration}s ease-in ${delay}s infinite;
        pointer-events: none;
      `;
      h.textContent = "\u2665";
      container.appendChild(h);
      hearts.push(h);
    }

    return () => hearts.forEach((h) => h.remove());
  }, [countProp]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) scale(0.6) rotate(-10deg);
            opacity: 0;
          }
          15% { opacity: 0.5; }
          50% { opacity: 0.4; transform: translateY(-50vh) scale(1) rotate(8deg); }
          85% { opacity: 0.25; }
          100% {
            transform: translateY(-105vh) scale(0.8) rotate(-6deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
