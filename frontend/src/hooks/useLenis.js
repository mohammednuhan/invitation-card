import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let lenis = null;
    let rafId = 0;
    const init = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          lerp: 0.12,
          smoothWheel: true,
          smoothTouch: false,
          autoRaf: false
        });
        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // lenis optional
      }
    };
    init();
    return () => {
      lenis?.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
