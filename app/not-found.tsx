import Link from "next/link";
import "./globals.css";

/**
 * Sits above app/[lang]/layout.tsx, so it must not render its own <html>:
 * Next already provides the shell here, and a second one breaks hydration.
 *
 * It also runs without a language param, because proxy.ts has not necessarily
 * resolved one for an unmatched URL, so it answers in both languages.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-center bg-ivory px-6 py-16 font-sans text-ink sm:px-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-coral">
        404
      </p>

      <h1 className="mt-4 max-w-3xl text-balance text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[1.02] tracking-tight">
        This page is off the menu.
      </h1>
      <p className="mt-3 max-w-3xl text-balance text-[clamp(1.5rem,4.5vw,2.5rem)] font-black leading-[1.05] tracking-tight text-ink/35">
        Esta página no está en la carta.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/en/explore"
          className="inline-flex min-h-11 items-center rounded-full bg-coral px-6 py-3 font-medium text-ivory transition-colors hover:bg-coral-dark"
        >
          Start exploring →
        </Link>
        <Link
          href="/es/explore"
          className="inline-flex min-h-11 items-center rounded-full bg-ink/5 px-6 py-3 font-medium text-ink transition-colors hover:bg-ink/10"
        >
          Empezar a explorar →
        </Link>
      </div>
    </main>
  );
}
