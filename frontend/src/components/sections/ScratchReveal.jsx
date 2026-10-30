import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaHandPointer } from "react-icons/fa";
import GoldenParticles from "../effects/GoldenParticles";

const ARCH_PATH =
  "M0,1 L0,0.4 C0,0.08 0.12,0 0.25,0.15 C0.34,0.24 0.4,0.02 0.5,0.02 " +
  "C0.6,0.02 0.66,0.24 0.75,0.15 C0.88,0 1,0.08 1,0.4 L1,1 Z";

// Inner mihrab (pointed niche) used on the revealed face, in a 300 x 400 box.
const INNER_ARCH = "M30 400 L30 162 Q34 96 150 36 Q266 96 270 162 L270 400";

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

const ARCH_SEGMENTS = [
  [[0, 0.4], [0, 0.08], [0.12, 0], [0.25, 0.15]],
  [[0.25, 0.15], [0.34, 0.24], [0.4, 0.02], [0.5, 0.02]],
  [[0.5, 0.02], [0.6, 0.02], [0.66, 0.24], [0.75, 0.15]],
  [[0.75, 0.15], [0.88, 0], [1, 0.08], [1, 0.4]]
];

function cubicAt(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]
  ];
}

// Points along the top of the arch, used to hang the floral garland on it.
function archCurve(w, h, steps = 150) {
  const pts = [];
  const per = Math.max(8, Math.round(steps / ARCH_SEGMENTS.length));
  for (const seg of ARCH_SEGMENTS) {
    for (let i = 0; i <= per; i++) {
      const [x, y] = cubicAt(seg[0], seg[1], seg[2], seg[3], i / per);
      pts.push({ x: x * w, y: y * h });
    }
  }
  return pts;
}

function drawLeafShape(ctx, x, y, len, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.45, -len * 0.4, len, 0);
  ctx.quadraticCurveTo(len * 0.45, len * 0.4, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBloomShape(ctx, x, y, r, petal, center) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = petal;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.ellipse(
      Math.cos(a) * r * 0.6,
      Math.sin(a) * r * 0.6,
      r * 0.52,
      r * 0.42,
      a,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.fillStyle = center;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Faint damask-like scatter so the flat cover has some texture.
function drawDamask(ctx, w, h) {
  const step = w * 0.15;
  ctx.save();
  ctx.globalAlpha = 0.075;
  let row = 0;
  for (let y = -step * 0.4; y < h + step; y += step * 0.82) {
    const off = row % 2 ? step * 0.5 : 0;
    for (let x = -step; x < w + step; x += step) {
      drawStar8(ctx, x + off, y, w * 0.024, "#f0d48a");
    }
    row++;
  }
  ctx.restore();
}

// Floral garland + bead line following the arch edge.
function drawGarland(ctx, w, h, R) {
  const pts = archCurve(w, h, 150);
  const n = pts.length;
  const palette = ["#f7e6c4", "#e8b9a4", "#f2d59c"];

  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const prev = pts[Math.max(0, i - 2)];
    const next = pts[Math.min(n - 1, i + 2)];
    let tx = next.x - prev.x;
    let ty = next.y - prev.y;
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;

    let nx = -ty;
    let ny = tx;
    if (nx * (w / 2 - p.x) + ny * (h * 0.55 - p.y) < 0) {
      nx = -nx;
      ny = -ny;
    }

    const inset = R * 0.05;
    const bx = p.x + nx * inset;
    const by = p.y + ny * inset;
    const ang = Math.atan2(ty, tx);

    if (i % 7 === 0) {
      const side = Math.floor(i / 7) % 2 === 0 ? 1 : -1;
      drawLeafShape(
        ctx,
        bx,
        by,
        R * 0.15,
        ang + side * 0.8,
        side > 0 ? "rgba(37,105,79,0.95)" : "rgba(23,76,56,0.95)"
      );
    }

    if (i % 26 === 13) {
      drawBloomShape(
        ctx,
        bx,
        by,
        R * 0.075,
        palette[Math.floor(i / 26) % palette.length],
        "#e3b54a"
      );
    }

    if (i % 5 === 0) {
      drawDiamond(ctx, bx, by, Math.max(1.2, R * 0.013), "#f0d48a", 0.45);
    }
  }
}

function drawDivider(ctx, cx, y, width) {
  const half = width / 2;
  const g = ctx.createLinearGradient(cx - half, y, cx + half, y);
  g.addColorStop(0, "rgba(227,181,74,0)");
  g.addColorStop(0.5, "rgba(227,181,74,0.9)");
  g.addColorStop(1, "rgba(227,181,74,0)");
  ctx.strokeStyle = g;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - half, y);
  ctx.lineTo(cx + half, y);
  ctx.stroke();
  drawDiamond(ctx, cx, y, width * 0.05, "#e3b54a", 0.95);
  drawDiamond(ctx, cx - half * 0.52, y, width * 0.024, "#e3b54a", 0.7);
  drawDiamond(ctx, cx + half * 0.52, y, width * 0.024, "#e3b54a", 0.7);
}

function drawFloralCluster(ctx, x, y, s, dir) {
  ctx.save();
  ctx.translate(x, y);
  drawLeafShape(ctx, 0, 0, s * 1.6, -0.4 * dir, "rgba(30,92,69,0.95)");
  drawLeafShape(ctx, s * 0.25, s * 0.2, s * 1.25, 0.3 * dir, "rgba(37,105,79,0.9)");
  drawLeafShape(ctx, -s * 0.15, s * 0.35, s * 1.1, -1.0 * dir, "rgba(23,76,56,0.9)");
  drawBloomShape(ctx, s * 0.2, -s * 0.15, s * 0.6, "#f7e6c4", "#e3b54a");
  drawBloomShape(ctx, -s * 0.3, s * 0.4, s * 0.45, "#e8b9a4", "#e3b54a");
  drawBloomShape(ctx, s * 0.6, s * 0.32, s * 0.38, "#f2d59c", "#e3b54a");
  ctx.restore();
}

function drawSprig(ctx, cx, y, s) {
  ctx.save();
  ctx.strokeStyle = "rgba(240,212,138,0.5)";
  ctx.lineWidth = Math.max(1, s * 0.05);
  ctx.beginPath();
  ctx.moveTo(cx - s * 2.2, y + s * 0.1);
  ctx.quadraticCurveTo(cx - s * 1.05, y - s * 0.15, cx - s * 0.55, y - s * 0.55);
  ctx.moveTo(cx + s * 2.2, y + s * 0.1);
  ctx.quadraticCurveTo(cx + s * 1.05, y - s * 0.15, cx + s * 0.55, y - s * 0.55);
  ctx.stroke();
  drawDiamond(ctx, cx, y, Math.max(2.2, s * 0.26), "#e3b54a", 0.95);
  drawDiamond(ctx, cx - s * 1.45, y, Math.max(1.3, s * 0.095), "#f0d48a", 0.6);
  drawDiamond(ctx, cx + s * 1.45, y, Math.max(1.3, s * 0.095), "#f0d48a", 0.6);
  ctx.restore();
}

// Scalloped lace hem along the bottom of the arch.
function drawLace(ctx, w, h) {
  const y = h * 0.955;
  const r = w * 0.027;
  const x0 = w * 0.075;
  const x1 = w * 0.925;

  ctx.save();
  ctx.strokeStyle = "rgba(240,212,138,0.4)";
  ctx.lineWidth = Math.max(1, w * 0.0035);
  ctx.beginPath();
  for (let x = x0; x + r * 2 <= x1 + 0.01; x += r * 2) {
    ctx.moveTo(x, y);
    ctx.arc(x + r, y, r, Math.PI, Math.PI * 2);
  }
  ctx.stroke();

  ctx.fillStyle = "rgba(240,212,138,0.45)";
  for (let x = x0; x + r * 2 <= x1 + 0.01; x += r * 2) {
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.9, w * 0.0032), 0, Math.PI * 2);
    ctx.fill();
  }
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
  grad.addColorStop(0, "#155c41");
  grad.addColorStop(0.5, "#0a2e23");
  grad.addColorStop(1, "#02120b");

  traceArch(ctx, w, h);
  ctx.fillStyle = grad;
  ctx.fill();

  // Everything decorative is clipped to the arch so nothing spills outside.
  ctx.save();
  traceArch(ctx, w, h);
  ctx.clip();

  drawDamask(ctx, w, h);

  const centreGlow = ctx.createRadialGradient(cx, h * 0.5, R * 0.05, cx, h * 0.5, R * 1.15);
  centreGlow.addColorStop(0, "rgba(28,120,86,0.55)");
  centreGlow.addColorStop(0.55, "rgba(15,70,50,0.18)");
  centreGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = centreGlow;
  ctx.fillRect(0, 0, w, h);

  const vignette = ctx.createRadialGradient(cx, h * 0.48, R * 0.55, cx, h * 0.48, R * 1.45);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  drawGarland(ctx, w, h, R);

  drawLantern(ctx, cx, h * 0.215, R * 0.155);
  drawLantern(ctx, w * 0.2, h * 0.28, R * 0.088);
  drawLantern(ctx, w * 0.8, h * 0.28, R * 0.088);

  ctx.restore();

  // Outer gold arch.
  traceArch(ctx, w, h);
  ctx.strokeStyle = "rgba(227,181,74,0.95)";
  ctx.lineWidth = Math.max(2, w * 0.012);
  ctx.shadowColor = "rgba(227,181,74,0.55)";
  ctx.shadowBlur = R * 0.06;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Inset hairline.
  ctx.save();
  ctx.translate(cx, h / 2);
  ctx.scale(0.955, 0.965);
  ctx.translate(-cx, -h / 2);
  traceArch(ctx, w, h);
  ctx.restore();
  ctx.strokeStyle = "rgba(227,181,74,0.32)";
  ctx.lineWidth = Math.max(1, w * 0.004);
  ctx.stroke();

  drawSeal(ctx, cx, h * 0.5, R, gInit, bInit);

  drawDivider(ctx, cx, h * 0.655, w * 0.5);

  // Simple, clean prompt — one line of plain serif text.
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f5e5bb";
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = R * 0.03;
  ctx.font = `500 ${Math.max(18, w * 0.082)}px 'Playfair Display', Georgia, serif`;
  ctx.fillText("Scratch to Reveal", cx, h * 0.755);
  ctx.shadowBlur = 0;

  drawSprig(ctx, cx, h * 0.835, R * 0.11);

  drawFloralCluster(ctx, w * 0.14, h * 0.905, R * 0.145, 1);
  drawFloralCluster(ctx, w * 0.86, h * 0.905, R * 0.145, -1);

  drawLace(ctx, w, h);
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
  const [showHint, setShowHint] = useState(true);
  const { couple } = data;
  const groomInitial = (couple?.groom?.name || "M").trim().charAt(0).toUpperCase();
  const brideInitial = (couple?.bride?.name || "A").trim().charAt(0).toUpperCase();

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
    setShowHint(false);
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
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#155c41] via-[#0a2e23] to-[#02120b] px-4 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 62% 46% at 50% 46%, rgba(46,160,116,0.55) 0%, rgba(10,46,35,0) 72%)"
                }}
              />
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 300 400"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="girihLattice" width="64" height="64" patternUnits="userSpaceOnUse">
                    <g fill="none" stroke="rgba(240,212,138,0.85)" strokeWidth="0.55">
                      <rect x="14" y="14" width="36" height="36" />
                      <rect
                        x="14"
                        y="14"
                        width="36"
                        height="36"
                        transform="rotate(45 32 32)"
                      />
                      <circle cx="32" cy="32" r="6.5" />
                      <circle cx="0" cy="0" r="2.2" />
                      <circle cx="64" cy="0" r="2.2" />
                      <circle cx="0" cy="64" r="2.2" />
                      <circle cx="64" cy="64" r="2.2" />
                    </g>
                  </pattern>
                  <linearGradient id="nicheGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f7e7bd" />
                    <stop offset="55%" stopColor="#e3b54a" />
                    <stop offset="100%" stopColor="#8f5f22" />
                  </linearGradient>
                  <radialGradient id="nicheGlow" cx="50%" cy="40%" r="66%">
                    <stop offset="0%" stopColor="#2aa277" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#03160e" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="pendantGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffe08a" stopOpacity="0" />
                  </radialGradient>
                  <pattern id="frieze" width="18" height="12" patternUnits="userSpaceOnUse">
                    <path d="M9 1.6l2.4 4.4L9 10.4 6.6 6z" fill="rgba(240,212,138,0.55)" />
                    <circle cx="0" cy="6" r="0.9" fill="rgba(240,212,138,0.35)" />
                  </pattern>
                </defs>

                <rect width="300" height="400" fill="url(#girihLattice)" opacity="0.12" />

                <path d={INNER_ARCH} fill="url(#nicheGlow)" />
                <path
                  d={INNER_ARCH}
                  fill="none"
                  stroke="url(#nicheGold)"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
                <path
                  d={INNER_ARCH}
                  fill="none"
                  stroke="rgba(240,212,138,0.55)"
                  strokeWidth="0.7"
                  transform="translate(150 200) scale(0.945) translate(-150 -200)"
                />
                <path
                  d={INNER_ARCH}
                  fill="none"
                  stroke="rgba(240,212,138,0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="2 4.5"
                  transform="translate(150 200) scale(0.895) translate(-150 -200)"
                />

                {/* hanging pendant under the apex */}
                <circle cx="150" cy="72" r="24" fill="url(#pendantGlow)" />
                <path d="M150 37v19" stroke="rgba(240,212,138,0.6)" strokeWidth="0.9" />
                <path d="M141 56h18l-2 5h-14z" fill="#e3b54a" />
                <path d="M142 61h16l-3 13h-10z" fill="rgba(247,231,189,0.92)" />
                <path d="M146 74h8l-2 5h-4z" fill="#e3b54a" />
                <circle cx="150" cy="67" r="4.2" fill="#fff3cf" opacity="0.85" />

                {/* small stars where the arch springs */}
                <path
                  d="M40 160l3 6.4L49.4 169l-6.4 3-3 6.4-3-6.4-6.4-3 6.4-2.6z"
                  fill="#e3b54a"
                  opacity="0.45"
                />
                <path
                  d="M260 160l3 6.4L269.4 169l-6.4 3-3 6.4-3-6.4-6.4-3 6.4-2.6z"
                  fill="#e3b54a"
                  opacity="0.45"
                />

                {/* arabesque frieze near the foot */}
                <path d="M38 358h224" stroke="rgba(240,212,138,0.35)" strokeWidth="0.6" />
                <rect x="38" y="358" width="224" height="12" fill="url(#frieze)" />
                <path d="M38 370h224" stroke="rgba(240,212,138,0.35)" strokeWidth="0.6" />
              </svg>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 72% at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%)"
                }}
              />

              <div className="relative">
                <p className="font-script text-[clamp(1.35rem,7.4vw,1.9rem)] leading-tight text-gold-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-3xl">
                  {couple.groom.name}
                </p>

                <div className="my-3 flex items-center justify-center gap-2.5">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/70" />
                  <svg width="34" height="12" viewBox="0 0 34 12" aria-hidden="true">
                    <path
                      d="M1 6h8M25 6h8"
                      stroke="rgba(227,181,74,0.65)"
                      strokeWidth="0.9"
                    />
                    <path
                      d="M17 1.6l1.7 2.9L22 6l-3.3 1.5L17 10.4l-1.7-2.9L12 6l3.3-1.5z"
                      fill="#e3b54a"
                    />
                  </svg>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70" />
                </div>

                <p className="font-script text-[clamp(1.35rem,7.4vw,1.9rem)] leading-tight text-gold-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-3xl">
                  {couple.bride.name}
                </p>
              </div>

              {/* Monogram of the couple's initials + the closing line */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[15%] flex flex-col items-center">
                <div
                  className={`relative transition-all duration-[850ms] ease-out ${
                    revealed
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-3 scale-90 opacity-0"
                  }`}
                  style={{ transitionDelay: revealed ? "450ms" : "0ms" }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute -inset-4 rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(240,212,138,0.45) 0%, rgba(240,212,138,0) 70%)"
                    }}
                    animate={revealed ? { opacity: [0.2, 0.65, 0.2] } : { opacity: 0.2 }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative flex items-center gap-2">
                    <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold-400/60" />

                    <div className="relative flex items-center gap-1.5 overflow-hidden rounded-full border border-gold-400/55 bg-[#04180f]/85 px-3 py-1 shadow-[0_0_20px_rgba(227,181,74,0.22)]">
                      <span className="font-display text-[12px] font-medium leading-none tracking-[0.08em] text-gold-200 sm:text-[13px]">
                        {groomInitial}
                      </span>
                      <span className="font-script text-[12px] leading-none text-gold-400 sm:text-[13px]">
                        {"\u0026"}
                      </span>
                      <span className="font-display text-[12px] font-medium leading-none tracking-[0.08em] text-gold-200 sm:text-[13px]">
                        {brideInitial}
                      </span>

                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={revealed ? { x: ["-140%", "340%"] } : { x: "-140%" }}
                        transition={{
                          duration: 3.4,
                          repeat: Infinity,
                          repeatDelay: 1.4,
                          ease: "easeInOut"
                        }}
                      />
                    </div>

                    <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold-400/60" />
                  </div>

                  <motion.span
                    aria-hidden="true"
                    className="absolute -left-1 -top-1 h-1.5 w-1.5 rotate-45 bg-gold-200"
                    animate={
                      revealed
                        ? { opacity: [0, 1, 0], scale: [0.5, 1.15, 0.5] }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 h-1 w-1 rotate-45 bg-gold-300"
                    animate={
                      revealed
                        ? { opacity: [0, 0.9, 0], scale: [0.5, 1, 0.5] }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  />
                </div>

                <p
                  className={`mt-2.5 font-serif text-[8.5px] uppercase tracking-[0.32em] text-gold-200/75 transition-all duration-700 ease-out sm:text-[10px] ${
                    revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: revealed ? "650ms" : "0ms" }}
                >
                  We are getting married
                </p>
              </div>
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

          <AnimatePresence>
            {!revealed && showHint && (
              <motion.div
                key="scratch-hint"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[25] overflow-hidden"
                style={{ clipPath: "url(#scratchArchClip)" }}
              >
                <div className="scratch-hint">
                  <div className="scratch-hint-motion">
                    <span className="scratch-hint-glow" />
                    <span className="scratch-hint-ring" />
                    <span className="scratch-hint-ring scratch-hint-ring--late" />
                    <FaHandPointer className="scratch-hint-hand" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <svg
            className="pointer-events-none absolute inset-0 z-30 h-full w-full drop-shadow-[0_0_12px_rgba(227,181,74,0.4)]"
            viewBox="0 0 1 1"
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
            <path
              d={ARCH_PATH}
              fill="none"
              stroke="rgba(240,212,138,0.45)"
              strokeWidth="1.1"
              strokeDasharray="0.014 0.024"
              vectorEffect="non-scaling-stroke"
              transform="translate(0.5 0.5) scale(0.92 0.94) translate(-0.5 -0.5)"
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
