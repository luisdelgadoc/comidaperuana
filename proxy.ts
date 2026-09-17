import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/locales";

const LOCALE_COOKIE = "cp-locale";

/**
 * Everyone starts in English, including visitors whose browser is set to
 * Spanish: the product is written for foreign travellers, and the Spanish
 * version exists for them to switch into, not to be dropped into.
 *
 * The one exception is a returning visitor who already chose a language —
 * sending them back to English every time would ignore an explicit decision.
 */
function resolveLocale(request: NextRequest) {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  return chosen && isLocale(chosen) ? chosen : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return;

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
