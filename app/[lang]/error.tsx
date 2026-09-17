"use client";

import { useEffect } from "react";

/**
 * Error boundaries must be Client Components, so the copy cannot come from the
 * server dictionaries. Both languages are inlined here rather than shipping a
 * dictionary to the client for a screen that should almost never render.
 */
const COPY = {
  en: {
    title: "Something did not load.",
    body: "Sorry about that. Try again, and if it keeps happening the problem is on our side.",
    retry: "Try again",
  },
  es: {
    title: "Algo no cargó.",
    body: "Disculpa. Intenta de nuevo, y si sigue pasando el problema es nuestro.",
    retry: "Intentar de nuevo",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const lang =
    typeof document !== "undefined" && document.documentElement.lang === "es"
      ? "es"
      : "en";
  const copy = COPY[lang];

  return (
    <main className="flex min-h-dvh flex-col justify-center px-6 py-16 sm:px-10">
      <h1 className="max-w-3xl text-balance text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05] tracking-tight">
        {copy.title}
      </h1>
      <p className="mt-6 max-w-md text-lg text-ink/60">{copy.body}</p>
      <div className="mt-10">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-coral px-6 py-3 text-base font-medium text-ivory transition-colors hover:bg-coral-dark"
        >
          {copy.retry}
        </button>
      </div>
    </main>
  );
}
