import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/locales";

/**
 * Canonical and OpenGraph URLs must be absolute. The origin comes from the
 * environment so it follows the deployment: it is set to https://laperuvian.food
 * in Vercel, and falls back to the dev server locally. Without it, production
 * would advertise localhost as the canonical home of every page.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3005";

export const SITE_NAME = "Laperuvian.food";

/**
 * `path` is the route without the language prefix, e.g. "/dishes/ceviche".
 * Every page declares both language versions so search engines pair them
 * instead of treating them as duplicates.
 */
export function buildMetadata({
  lang,
  path,
  title,
  description,
  image,
  imageAlt,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const canonical = `${siteUrl}/${lang}${path}`;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])
  );

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: lang,
      type: "website",
      images: image
        ? [{ url: image, alt: imageAlt ?? title, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** Unsplash resizes for free, so social images cost us no transformations. */
export function socialImage(url: string) {
  return `${url}?w=1200&h=630&fit=crop&q=80`;
}
