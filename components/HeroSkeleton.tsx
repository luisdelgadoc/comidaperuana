/**
 * Shown while a dynamic page resolves. It mirrors the shape of the hero that
 * replaces it, so the layout does not jump when the real content arrives.
 */
export function HeroSkeleton({ label }: { label: string }) {
  return (
    <main className="flex min-h-dvh flex-col" aria-busy="true">
      <span className="sr-only" role="status">
        {label}
      </span>
      <div className="relative min-h-[70vh] animate-pulse bg-ink/10" />
      <div className="px-6 py-12 sm:px-10">
        <div className="h-3 w-24 animate-pulse rounded-full bg-ink/10" />
        <div className="mt-5 h-4 w-full max-w-xl animate-pulse rounded-full bg-ink/10" />
        <div className="mt-3 h-4 w-3/4 max-w-lg animate-pulse rounded-full bg-ink/10" />
      </div>
    </main>
  );
}
