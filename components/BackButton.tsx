"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * `href` is used where the parent screen is unambiguous (onboarding steps).
 * Dish URLs are global and carry no city context, so there it falls back to
 * history — reading the destination cookie would opt those pages out of
 * prerendering.
 */
export function BackButton({
  label,
  href,
  tone = "dark",
}: {
  label: string;
  href?: string;
  tone?: "dark" | "light";
}) {
  const router = useRouter();

  // Icon only on small screens: the logo needs the room beside it.
  const className = `inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full px-0 text-sm font-medium transition-colors sm:min-w-0 sm:justify-start sm:pl-3 sm:pr-4 ${
    tone === "light"
      ? "bg-ivory/15 text-ivory backdrop-blur hover:bg-ivory/25"
      : "bg-ink/5 text-ink hover:bg-ink/10"
  }`;

  const content = (
    <>
      <ArrowLeft size={18} strokeWidth={2.25} aria-hidden />
      <span className="sr-only sm:not-sr-only">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      {content}
    </button>
  );
}
