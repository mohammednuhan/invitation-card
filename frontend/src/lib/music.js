// Background music controller.
//
// A single <audio> instance is shared by the whole app so playback survives
// route/section re-renders. Playback must be started from a real user gesture
// (the gate tap) or mobile browsers will block it.

const TRACK = "/music/wedding-theme.mp3";
const TARGET_VOLUME = 0.55;

let audio = null;
let playing = false;
let userMuted = false;
let fadeTimer = null;
const listeners = new Set();

function emit() {
  listeners.forEach((fn) => {
    try {
      fn(playing);
    } catch (e) {
      // ignore subscriber errors
    }
  });
}

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(TRACK);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = TARGET_VOLUME;
    audio.setAttribute("playsinline", "");

    audio.addEventListener("play", () => {
      playing = true;
      emit();
    });
    audio.addEventListener("pause", () => {
      playing = false;
      emit();
    });
    audio.addEventListener("ended", () => {
      // loop is on, but some mobile browsers still fire ended
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  }
  return audio;
}

function fadeTo(target, duration = 1200) {
  const a = getAudio();
  if (!a) return;
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
  const start = a.volume;
  const steps = 24;
  const stepTime = Math.max(16, duration / steps);
  let i = 0;
  fadeTimer = setInterval(() => {
    i += 1;
    const next = start + ((target - start) * i) / steps;
    a.volume = Math.min(1, Math.max(0, next));
    if (i >= steps) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }, stepTime);
}

export function preloadMusic() {
  const a = getAudio();
  if (!a) return;
  try {
    a.load();
  } catch (e) {
    // ignore
  }
}

export function playMusic() {
  const a = getAudio();
  if (!a) return;
  userMuted = false;
  if (a.paused) {
    a.volume = 0;
    const p = a.play();
    if (p && typeof p.then === "function") {
      p.then(() => fadeTo(TARGET_VOLUME)).catch(() => {
        a.volume = TARGET_VOLUME;
      });
    } else {
      fadeTo(TARGET_VOLUME);
    }
  }
}

export function pauseMusic() {
  const a = getAudio();
  if (!a) return;
  fadeTo(0, 400);
  window.setTimeout(() => {
    if (audio && audio.volume <= 0.01) audio.pause();
  }, 420);
}

export function toggleMusic() {
  if (playing) {
    userMuted = true;
    pauseMusic();
  } else {
    userMuted = false;
    playMusic();
  }
}

export function isMusicPlaying() {
  return playing;
}

export function stopMusic() {
  userMuted = true;
  const a = getAudio();
  if (!a) return;
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
  a.pause();
  a.volume = TARGET_VOLUME;
}

export function subscribeMusic(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Mobile browsers pause audio when the tab is backgrounded. Resume it when the
// guest comes back, unless they muted it themselves.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden || userMuted || !audio || !audio.paused) return;
    audio.volume = TARGET_VOLUME;
    audio.play().catch(() => {});
  });
}
