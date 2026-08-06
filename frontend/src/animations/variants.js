export const container = (stagger = 0.15, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay }
  }
});

export const itemFadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
};

export const itemFadeScale = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export const itemBlur = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export const itemFromLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export const itemFromRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export const pageTransition = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(8px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const textReveal = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
  }
};

export const stagger = (count = 1) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: count } }
});
