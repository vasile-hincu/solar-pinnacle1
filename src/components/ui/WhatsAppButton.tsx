import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const WhatsAppButton = () => {
  const location = useLocation();

  const whatsappUrl = useMemo(() => "https://wa.me/37378901362", []);
  const callUrl = useMemo(() => "tel:+37378901362", []);
  const nudgeStorageKey = useMemo(() => "wa_nudge_dismissed_v1", []);

  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    setShowNudge(false);

    try {
      if (sessionStorage.getItem(nudgeStorageKey) === "1") return;
    } catch {
      // ignore storage errors
    }

    const timeoutId = window.setTimeout(() => {
      setShowNudge(true);
    }, 30_000);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, nudgeStorageKey]);

  const dismissNudge = () => {
    try {
      sessionStorage.setItem(nudgeStorageKey, "1");
    } catch {
      // ignore storage errors
    }
    setShowNudge(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showNudge && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-16 right-0 w-[280px] rounded-xl border border-white/10 bg-background/95 backdrop-blur shadow-xl"
            role="dialog"
            aria-label="Contact rapid"
          >
            <div className="flex items-start gap-3 p-4">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/15">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-5">Vrei o ofertă rapidă?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sună acum sau cere o consultație pe WhatsApp.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={callUrl}
                    onClick={dismissNudge}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-accent/10"
                  >
                    <Phone className="h-4 w-4" />
                    Sună acum
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={dismissNudge}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:brightness-95"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissNudge}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                aria-label="Închide"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-background/95" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismissNudge}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-shadow duration-300 hover:shadow-xl"
        aria-label="Deschide WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent animate-ping" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent" />
      </motion.a>
    </div>
  );
};
