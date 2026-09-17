import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";

type Tone = "dark" | "light";

/**
 * Below `sm` the header shows the bowl alone. The full lockup would have to
 * shrink to about 32px tall to fit beside the back button and the menu, and at
 * that height the wordmark stops being readable — a logo nobody can read is
 * worse than no wordmark at all.
 *
 * Two colour variants rather than a CSS filter: red on pale backgrounds, white
 * over photography, both cut from the same artwork so the edges match.
 */
export function Logo({
  lang,
  tone = "light",
  size = "header",
}: {
  lang: Locale;
  tone?: Tone;
  size?: "header" | "hero";
}) {
  const light = tone === "light";
  const lockup = light ? "/brand/logo-white-800.png" : "/brand/logo-red-800.png";
  const mark = light ? "/brand/mark-white-256.png" : "/brand/mark-red-256.png";

  const markClass =
    size === "hero"
      ? "h-12 w-auto sm:hidden"
      : "h-8 w-auto sm:hidden";

  const lockupClass =
    size === "hero"
      ? "hidden h-auto w-auto sm:block sm:h-[72px] lg:h-[104px]"
      : "hidden h-auto w-auto sm:block sm:h-9 lg:h-11";

  return (
    <Link
      href={`/${lang}`}
      aria-label="Laperuvian.food"
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={mark}
        alt=""
        width={256}
        height={256}
        priority
        sizes="64px"
        className={markClass}
        aria-hidden
      />
      <Image
        src={lockup}
        alt="Laperuvian.food"
        width={614}
        height={320}
        priority
        sizes="(min-width: 1024px) 200px, 140px"
        className={lockupClass}
      />
    </Link>
  );
}
