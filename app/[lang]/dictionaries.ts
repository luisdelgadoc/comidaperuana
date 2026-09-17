import "server-only";
import type { Locale } from "@/lib/i18n/locales";

const loaders = {
  en: () => import("@/dictionaries/en").then((mod) => mod.default),
  es: () => import("@/dictionaries/es").then((mod) => mod.default),
} as const;

export const getDictionary = (locale: Locale) => loaders[locale]();
