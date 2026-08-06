import React, { useEffect, useRef } from "react";

const PETAL_COLORS = [
  "rgba(212,160,60,0.85)",
  "rgba(240,212,138,0.9)",
  "rgba(204,143,117,0.8)",
  "rgba(255,244,215,0.95)"
];

export default function FallingPetals({ count: countProp = 16, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const petals = [];
    const resize = () => {};

    const count =
      window.innerWidth < 768 ? Math.max(4, Math.ceil(countProp * 0.35)) : countProp;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      const size = 10 + Math.random() * 12;
      const startX = Math.random() * 100;
      const duration = 3.5 + Math.random() * 4;
      const delay = -Math.random() * duration;
      const color = PETAL_COLORS[i % PETAL_COLORS.length];

      petal.style.cssText = `
        position: absolute;
        top: -40px;
        left: ${startX}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle at 30% 30%, ${color}, ${color});
        border-radius: 80% 0 80% 0;
        opacity: 0;
        transform: rotate(${Math.random() * 360}deg);
        animation: petalFall ${duration}s linear ${delay}s infinite;
        pointer-events: none;
        z-index: 1;
      `;
      container.appendChild(petal);
      petals.push(petal);
    }

    return () => {
      petals.forEach((p) => p.remove());
      resize();
    };
  }, [countProp]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateZ(0);
            opacity: 0;
          }
          6% { opacity: 0.9; }
          85% { opacity: 0.7; }
          100% {
            transform: translateY(110vh) rotate(360deg) translateZ(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
