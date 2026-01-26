import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ro from "@/locales/ro/translation.json";
import ru from "@/locales/ru/translation.json";

type SupportedLng = "ro" | "ru";

const detectInitialLanguage = (): SupportedLng => {
  if (typeof window === "undefined") return "ro";

  const stored = window.localStorage.getItem("lng");
  if (stored === "ro" || stored === "ru") return stored;

  // Default to Romanian on first load.
  return "ro";
};

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      ru: { translation: ru },
    },
    lng: detectInitialLanguage(),
    fallbackLng: "ro",
    interpolation: { escapeValue: false },
  });

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (lng) => {
    try {
      window.localStorage.setItem("lng", lng);
    } catch {
      // ignore
    }

    if (document?.documentElement) {
      document.documentElement.lang = lng;
    }
  });

  // Ensure lang is set on first load
  document.documentElement.lang = i18n.language;
}

export default i18n;
