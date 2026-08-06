import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiShare, FiX } from "react-icons/fi";

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isStandalone) return;

    const shown = sessionStorage.getItem("wedding-install-shown");
    if (shown) return;

    let t;
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
      t = setTimeout(() => setVisible(true), 4000);
    };

    const onAppInstalled = () => {
      setVisible(false);
      sessionStorage.setItem("wedding-install-shown", "1");
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    if (isIOS()) {
      setIos(true);
      t = setTimeout(() => setVisible(true), 4000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      clearTimeout(t);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("wedding-install-shown", "1");
  };

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      setVisible(false);
      sessionStorage.setItem("wedding-install-shown", "1");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fa-install glass fixed bottom-24 left-4 right-4 z-[90] rounded-2xl border-gold-400/40 p-4 shadow-luxury md:left-auto md:right-6 md:max-w-sm"
        >
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 text-ink-900/50 transition hover:text-ink-900"
          >
            <FiX size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-ink-900 shadow-gold">
              {ios ? <FiShare size={20} /> : <FiDownload size={20} />}
            </div>
            <div className="min-w-0">
              <p className="font-sans text-sm font-semibold text-ink-900">
                Add this invitation to your phone
              </p>
              <p className="mt-0.5 font-serif text-xs italic text-ink-900/70">
                {ios
                  ? "Tap Share, then \u201cAdd to Home Screen\u201d to open it as an app."
                  : "Install it to get the full app experience and open it offline."}
              </p>
            </div>
          </div>
          {!ios && (
            <button
              onClick={install}
              className="btn-luxury mt-3 w-full rounded-full py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Install App
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
