import { useEffect } from "react";
import { ScrollTrigger } from "../animations/gsap";

export function useLenis() {
  useEffect(() => {
    let lenis = null;
    let rafId = 0;
    let onLoad = null;

    const init = async () => {
      try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const Lenis = (await import("lenis")).default;

        lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          smoothTouch: false,
          syncTouch: false,
          wheelMultiplier: 1,
          autoRaf: false
        });

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const refresh = () => ScrollTrigger.refresh();
        onLoad = refresh;
        window.addEventListener("load", refresh);
        window.setTimeout(refresh, 600);
      } catch (e) {
        // lenis optional
      }
    };
    init();
    return () => {
      if (onLoad) window.removeEventListener("load", onLoad);
      lenis?.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
