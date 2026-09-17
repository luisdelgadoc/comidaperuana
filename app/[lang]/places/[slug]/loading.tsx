import { lang as rootLang } from "next/root-params";
import { defaultLocale, isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { HeroSkeleton } from "@/components/HeroSkeleton";

export default async function Loading() {
  const value = await rootLang();
  const locale = value && isLocale(value) ? value : defaultLocale;
  const dict = await getDictionary(locale);

  return <HeroSkeleton label={dict.loading.label} />;
}
