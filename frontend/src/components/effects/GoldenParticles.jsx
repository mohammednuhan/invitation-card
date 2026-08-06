import React, { useEffect, useRef } from "react";

export default function GoldenParticles({
  count = 60,
  className = "",
  speed = 0.4
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    const size = { width: 0, height: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size.width = rect.width;
      size.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#d4a03c", "#f0d48a", "#b9832c", "#ffe9a8"];

    const createParticle = (init = false) => ({
      x: Math.random() * size.width,
      y: init
        ? Math.random() * size.height
        : size.height + Math.random() * 40,
      size: 0.6 + Math.random() * 2.4,
      vy: -(0.15 + Math.random() * speed),
      vx: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.4 + Math.random() * 0.6,
      twinkle: Math.random() * Math.PI * 2
    });

    particles = Array.from(
      { length: window.innerWidth < 768 ? Math.max(8, Math.ceil(count * 0.35)) : count },
      () => createParticle(true)
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.02;
        p.alpha =
          (0.4 + Math.random() * 0.4) * (0.7 + 0.3 * Math.sin(p.twinkle));

        if (p.y < -10 || p.x < -10 || p.x > size.width + 10) {
          particles[i] = createParticle();
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "24px serif";
      ctx.fillStyle = "#d4a03c";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("\u2666", size.width / 2, size.height / 2);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
