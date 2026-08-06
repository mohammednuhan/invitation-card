import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeUp = (el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" }
    }
  );
};

export const fadeScale = (el) => {
  gsap.fromTo(
    el,
    { opacity: 0, scale: 0.85 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" }
    }
  );
};

export const blurReveal = (el) => {
  gsap.fromTo(
    el,
    { opacity: 0, filter: "blur(14px)", y: 30 },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    }
  );
};

export const parallax = (el, strength = 100) => {
  gsap.to(el, {
    yPercent: strength,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

export const revealLine = (el) => {
  const lines = el.querySelectorAll(".reveal-line");
  gsap.fromTo(
    lines,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%" }
    }
  );
};

export const initScrollAnimations = () => {
  gsap.utils.toArray("[data-fade-up]").forEach((el) => fadeUp(el));
  gsap.utils.toArray("[data-fade-scale]").forEach((el) => fadeScale(el));
  gsap.utils.toArray("[data-blur-reveal]").forEach((el) => blurReveal(el));
  gsap.utils.toArray("[data-parallax]").forEach((el) => parallax(el));
};

export { gsap, ScrollTrigger };
