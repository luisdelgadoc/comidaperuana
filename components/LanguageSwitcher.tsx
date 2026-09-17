"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/locales";

const ONE_YEAR = 60 * 60 * 24 * 365;

function pathWithLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || "/";
}

/**
 * Remembers the choice so a returning visitor is not sent back to English.
 * Written from the client because this is a preference, not a security
 * boundary, and it saves a round trip through a Server Action.
 */
function remember(locale: Locale) {
  document.cookie = `cp-locale=${locale}; max-age=${ONE_YEAR}; path=/; samesite=lax`;
}

export function LanguageSwitcher({
  current,
  tone = "dark",
}: {
  current: Locale;
  tone?: "dark" | "light";
}) {
  const pathname = usePathname();

  const activeClasses =
    tone === "light" ? "bg-ivory text-ink" : "bg-ink text-ivory";
  const idleClasses =
    tone === "light"
      ? "text-ivory/60 hover:text-ivory"
      : "text-ink/60 hover:text-ink";

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathWithLocale(pathname, locale)}
          onClick={() => remember(locale)}
          aria-current={locale === current ? "true" : undefined}
          className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 uppercase tracking-wide transition-colors ${
            locale === current ? activeClasses : idleClasses
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
