import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let lenis = null;
    const init = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        autoRaf: false
      });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };
    init();
    return () => {
      lenis?.destroy();
    };
  }, []);
}
