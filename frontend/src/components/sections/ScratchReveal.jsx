import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import GoldenParticles from "../effects/GoldenParticles";

const ARCH_PATH =
  "M0,1 L0,0.4 C0,0.08 0.12,0 0.25,0.15 C0.34,0.24 0.4,0.02 0.5,0.02 " +
  "C0.6,0.02 0.66,0.24 0.75,0.15 C0.88,0 1,0.08 1,0.4 L1,1 Z";

function traceArch(ctx, w, h) {
  ctx.save();
  ctx.scale(w, h);
  ctx.beginPath();
  ctx.moveTo(0, 1);
  ctx.lineTo(0, 0.4);
  ctx.bezierCurveTo(0, 0.08, 0.12, 0, 0.25, 0.15);
  ctx.bezierCurveTo(0.34, 0.24, 0.4, 0.02, 0.5, 0.02);
  ctx.bezierCurveTo(0.6, 0.02, 0.66, 0.24, 0.75, 0.15);
  ctx.bezierCurveTo(0.88, 0, 1, 0.08, 1, 0.4);
  ctx.lineTo(1, 1);
  ctx.closePath();
  ctx.restore();
}

function drawStar8(ctx, x, y, r, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.45;
    const px = Math.cos(a) * rad;
    const py = Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDiamond(ctx, x, y, s, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha ?? 1;
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.lineTo(s, 0);
  ctx.lineTo(0, s);
  ctx.lineTo(-s, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLantern(ctx, x, y, s) {
  ctx.save();
  ctx.translate(x, y);

  ctx.strokeStyle = "rgba(227,181,74,0.65)";
  ctx.lineWidth = Math.max(1, s * 0.06);
  ctx.beginPath();
  ctx.moveTo(0, -s * 2.4);
  ctx.lineTo(0, -s * 1.1);
  ctx.stroke();

  ctx.fillStyle = "#e3b54a";
  ctx.beginPath();
  ctx.moveTo(-s * 0.5, -s * 1.1);
  ctx.lineTo(s * 0.5, -s * 1.1);
  ctx.lineTo(s * 0.3, -s * 0.8);
  ctx.lineTo(-s * 0.3, -s * 0.8);
  ctx.closePath();
  ctx.fill();

  const glow = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s * 1.1);
  glow.addColorStop(0, "rgba(255,222,130,0.9)");
  glow.addColorStop(0.55, "rgba(240,168,60,0.5)");
  glow.addColorStop(1, "rgba(240,168,60,0)");
  ctx.beginPath();
  ctx.arc(0, 0, s * 1.1, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  ctx.fillStyle = "#f0d48a";
  ctx.beginPath();
  ctx.moveTo(-s * 0.55, -s * 0.45);
  ctx.lineTo(s * 0.55, -s * 0.45);
  ctx.lineTo(s * 0.42, s * 0.5);
  ctx.lineTo(0, s * 0.95);
  ctx.lineTo(-s * 0.42, s * 0.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(212,160,60,0.85)";
  ctx.beginPath();
  ctx.moveTo(-s * 0.34, -s * 0.15);
  ctx.lineTo(s * 0.34, -s * 0.15);
  ctx.lineTo(s * 0.24, s * 0.25);
  ctx.lineTo(-s * 0.24, s * 0.25);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#e3b54a";
  ctx.beginPath();
  ctx.moveTo(-s * 0.26, s * 0.95);
  ctx.lineTo(s * 0.26, s * 0.95);
  ctx.lineTo(s * 0.12, s * 1.18);
  ctx.lineTo(-s * 0.12, s * 1.18);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSeal(ctx, cx, cy, R, gInit, bInit) {
  const sealR = R * 0.33;

  ctx.save();

  const halo = ctx.createRadialGradient(cx, cy, sealR * 0.55, cx, cy, sealR * 1.4);
  halo.addColorStop(0, "rgba(227,181,74,0.24)");
  halo.addColorStop(1, "rgba(227,181,74,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, sealR * 1.4, 0, Math.PI * 2);
  ctx.fillStyle = halo;
  ctx.fill();

  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    drawDiamond(
      ctx,
      cx + Math.cos(a) * sealR * 1.3,
      cy + Math.sin(a) * sealR * 1.3,
      Math.max(1.5, sealR * 0.055),
      "#e3b54a",
      0.4
    );
  }

  const disc = ctx.createRadialGradient(cx, cy - sealR * 0.25, sealR * 0.1, cx, cy, sealR);
  disc.addColorStop(0, "#1a5741");
  disc.addColorStop(0.7, "#0d3a2b");
  disc.addColorStop(1, "#04180f");
  ctx.beginPath();
  ctx.arc(cx, cy, sealR, 0, Math.PI * 2);
  ctx.fillStyle = disc;
  ctx.fill();

  const ring = ctx.createLinearGradient(cx, cy - sealR, cx, cy + sealR);
  ring.addColorStop(0, "#f7e7bd");
  ring.addColorStop(0.5, "#e3b54a");
  ring.addColorStop(1, "#8f5f22");
  ctx.strokeStyle = ring;
  ctx.lineWidth = Math.max(1.5, sealR * 0.055);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, sealR * 0.84, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(227,181,74,0.45)";
  ctx.lineWidth = Math.max(1, sealR * 0.022);
  ctx.stroke();

  const textGrad = ctx.createLinearGradient(cx, cy - sealR * 0.5, cx, cy + sealR * 0.5);
  textGrad.addColorStop(0, "#fff8e1");
  textGrad.addColorStop(0.55, "#f0d48a");
  textGrad.addColorStop(1, "#c08f2e");

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${sealR * 0.52}px 'Playfair Display', Georgia, serif`;
  ctx.fillStyle = textGrad;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = sealR * 0.08;
  ctx.fillText(gInit, cx - sealR * 0.46, cy + sealR * 0.02);
  ctx.fillText(bInit, cx + sealR * 0.46, cy + sealR * 0.02);
  ctx.shadowBlur = 0;

  ctx.font = `italic ${sealR * 0.3}px 'Cormorant Garamond', Georgia, serif`;
  ctx.fillStyle = "#dfa890";
  ctx.fillText("\u0026", cx, cy + sealR * 0.08);

  ctx.restore();
}

function drawCover(ctx, w, h, couple) {
  const R = Math.min(w, h) / 2;
  const cx = w / 2;
  const groom = couple?.groom || {};
  const bride = couple?.bride || {};
  const gInit = (groom.name || "M").trim().charAt(0).toUpperCase();
  const bInit = (bride.name || "A").trim().charAt(0).toUpperCase();

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#124d36");
  grad.addColorStop(0.55, "#0a2e23");
  grad.addColorStop(1, "#03160e");

  traceArch(ctx, w, h);
  ctx.fillStyle = grad;
  ctx.fill();

  traceArch(ctx, w, h);
  ctx.strokeStyle = "rgba(227,181,74,0.95)";
  ctx.lineWidth = Math.max(2, w * 0.012);
  ctx.shadowColor = "rgba(227,181,74,0.55)";
  ctx.shadowBlur = R * 0.06;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.save();
  ctx.translate(cx, h / 2);
  ctx.scale(0.92, 0.94);
  ctx.translate(-cx, -h / 2);
  traceArch(ctx, w, h);
  ctx.restore();
  ctx.strokeStyle = "rgba(227,181,74,0.3)";
  ctx.lineWidth = Math.max(1, w * 0.004);
  ctx.stroke();

  drawLantern(ctx, cx, h * 0.16, R * 0.18);

  drawStar8(ctx, w * 0.14, h * 0.46, Math.max(7, w * 0.028), "rgba(227,181,74,0.45)");
  drawStar8(ctx, w * 0.86, h * 0.46, Math.max(7, w * 0.028), "rgba(227,181,74,0.45)");
  drawStar8(ctx, w * 0.22, h * 0.62, Math.max(5, w * 0.02), "rgba(240,212,138,0.35)");
  drawStar8(ctx, w * 0.78, h * 0.62, Math.max(5, w * 0.02), "rgba(240,212,138,0.35)");

  drawSeal(ctx, cx, h * 0.5, R, gInit, bInit);

  // Simple, clean prompt — one line of plain serif text.
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f5e5bb";
  ctx.font = `500 ${Math.max(18, w * 0.088)}px 'Playfair Display', Georgia, serif`;
  ctx.fillText("Scratch to Reveal", cx, h * 0.75);
}

export default function ScratchReveal({ data, onReveal }) {
  const canvasRef = useRef(null);
  const maskRef = useRef(null);
  const maskSampleRef = useRef(null);
  const sampleCanvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPoint = useRef(null);
  const percentRef = useRef(0);
  const touchedRef = useRef(false);
  const isScratching = useRef(false);
  const lastCheckRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const { couple } = data;

  const buildMask = (w, h) => {
    const m = document.createElement("canvas");
    m.width = w;
    m.height = h;
    const mc = m.getContext("2d");
    traceArch(mc, w, h);
    mc.fillStyle = "#fff";
    mc.fill();
    return m;
  };

  const scratchPercent = (ctx, w, h) => {
    const maskData = maskSampleRef.current;
    if (!maskData) return 0;

    // Sample a tiny downscaled copy instead of reading millions of pixels on
    // every scratch move — this keeps the reveal buttery smooth on phones.
    const SW = 120;
    const SH = 160;
    let sample = sampleCanvasRef.current;
    if (!sample) {
      sample = document.createElement("canvas");
      sample.width = SW;
      sample.height = SH;
      sampleCanvasRef.current = sample;
    }
    const sctx = sample.getContext("2d");
    sctx.clearRect(0, 0, SW, SH);
    sctx.drawImage(ctx.canvas, 0, 0, SW, SH);

    const px = sctx.getImageData(0, 0, SW, SH).data;
    let cleared = 0;
    let total = 0;
    for (let i = 0; i < px.length; i += 4) {
      if (maskData[i] > 128) {
        total++;
        if (px[i + 3] === 0) cleared++;
      }
    }
    return total ? cleared / total : 0;
  };

  const setupCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    maskRef.current = buildMask(w, h);

    const maskSample = document.createElement("canvas");
    maskSample.width = 120;
    maskSample.height = 160;
    const msctx = maskSample.getContext("2d");
    msctx.drawImage(maskRef.current, 0, 0, 120, 160);
    maskSampleRef.current = msctx.getImageData(0, 0, 120, 160).data;

    drawCover(ctx, rect.width, rect.height, couple);
  };

  useEffect(() => {
    setupCover();

    // Redraw once the display faces are actually available, otherwise the
    // canvas seal/title can fall back to Georgia.
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (cancelled || touchedRef.current) return;
        setupCover();
      });
    }

    const onResize = () => setupCover();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const eraseAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    const size = Math.max(36, Math.min(rect.width, rect.height) * 0.09) * dpr;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.rect((x - size / dpr) * dpr, (y - size / dpr) * dpr, size * 2, size * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const eraseLine = (from, to) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    const radius = (isMobile ? 48 : 36) + Math.min(rect.width, rect.height) * 0.08;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = radius * 2;
    ctx.lineCap = "square";
    ctx.lineJoin = "miter";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top
    };
  };

  const start = (e) => {
    e.preventDefault();
    touchedRef.current = true;
    isScratching.current = true;
    drawing.current = true;
    lastPoint.current = getPos(e);
    eraseAt(lastPoint.current.x, lastPoint.current.y);
    checkProgress();
  };

  const move = (e) => {
    if (!isScratching.current) return;
    e.preventDefault();
    const pt = getPos(e);
    if (lastPoint.current) eraseLine(lastPoint.current, pt);
    lastPoint.current = pt;
    eraseAt(pt.x, pt.y);
    checkProgress();
  };

  const end = (e) => {
    e.preventDefault();
    isScratching.current = false;
    drawing.current = false;
    lastPoint.current = null;
    checkProgress(true);
  };

  const checkProgress = (force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const now = performance.now();
    if (!force && now - lastCheckRef.current < 120) return;
    lastCheckRef.current = now;
    const ctx = canvas.getContext("2d");
    const pct = scratchPercent(ctx, canvas.width, canvas.height);
    percentRef.current = pct;
    setProgress(Math.min(100, Math.round(pct * 100)));
    if (pct > 0.15) {
      reveal();
    }
  };

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    onReveal?.();
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        startVelocity: 45,
        ticks: 60,
        gravity: 1.2,
        origin: { y: 0.55 },
        colors: ["#d4a03c", "#f0d48a", "#b9832c", "#0b2a20", "#f7f2e3"]
      });
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 50,
        startVelocity: 45,
        ticks: 60,
        gravity: 1.2,
        origin: { x: 0, y: 0.7 },
        colors: ["#e3b54a", "#f0d48a"]
      });
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 50,
        startVelocity: 45,
        ticks: 60,
        gravity: 1.2,
        origin: { x: 1, y: 0.7 },
        colors: ["#e3b54a", "#f0d48a"]
      });
    }, 350);
  };

  return (
    <section
      id="scratch"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-white to-cream-50 py-24"
    >
      <GoldenParticles count={18} />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center sm:mb-14"
        >
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-gold-600/80 sm:text-xs">
            A moment of magic
          </p>

          <h2 className="mt-4 font-display text-[2rem] font-medium leading-tight text-ink-900 sm:text-4xl md:text-5xl">
            Scratch to Reveal
          </h2>

          <p className="mx-auto mt-3 max-w-md font-serif text-sm leading-relaxed text-ink-700/75 sm:text-base">
            Run your finger across the golden arch to unlock a memory we treasure.
          </p>
        </motion.div>

        <div className="relative mx-auto" style={{ width: "min(80vw, 400px)", aspectRatio: "3/4" }}>
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
            <defs>
              <clipPath id="scratchArchClip" clipPathUnits="objectBoundingBox">
                <path d={ARCH_PATH} />
              </clipPath>
            </defs>
          </svg>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "url(#scratchArchClip)" }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#0f3f2d] via-[#0a2e23] to-[#03160e] px-4 text-center">
              <p className="font-script text-2xl text-gold-200 sm:text-3xl">
                {couple.groom.name}
              </p>
              <p className="my-2 font-serif text-sm uppercase tracking-[0.4em] text-gold-300">weds</p>
              <p className="font-script text-2xl text-gold-200 sm:text-3xl">
                {couple.bride.name}
              </p>
            </div>
          </div>

          <AnimatePresence>
            {!revealed && (
              <motion.div
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-20"
                style={{ clipPath: "url(#scratchArchClip)" }}
              >
                <canvas
                  ref={canvasRef}
                  className="h-full w-full cursor-pointer touch-none"
                  onPointerDown={start}
                  onPointerMove={move}
                  onPointerUp={end}
                  onPointerLeave={end}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <svg
            className="pointer-events-none absolute inset-0 z-30 h-full w-full drop-shadow-[0_0_12px_rgba(227,181,74,0.4)]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="archGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0d48a" />
                <stop offset="50%" stopColor="#e3b54a" />
                <stop offset="100%" stopColor="#b9832c" />
              </linearGradient>
            </defs>
            <path
              d={ARCH_PATH}
              fill="none"
              stroke="url(#archGold)"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {!revealed && (
          <div className="mt-6 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-600/70">
              {progress > 0 ? `Scratched ${progress}%` : "Tip: use your finger or mouse"}
            </p>
            <div className="mx-auto mt-3 h-1.5 w-64 overflow-hidden rounded-full bg-gold-200/60">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
