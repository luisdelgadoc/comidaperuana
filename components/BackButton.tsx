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

  const className = `inline-flex min-h-11 items-center gap-2 rounded-full pl-3 pr-4 text-sm font-medium transition-colors ${
    tone === "light"
      ? "bg-ivory/15 text-ivory backdrop-blur hover:bg-ivory/25"
      : "bg-ink/5 text-ink hover:bg-ink/10"
  }`;

  const content = (
    <>
      <ArrowLeft size={18} strokeWidth={2.25} aria-hidden />
      <span>{label}</span>
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
