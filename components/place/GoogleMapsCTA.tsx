import { MapPin } from "lucide-react";

/**
 * The product's primary conversion (spec §19, §33): the moment curiosity turns
 * into a real-world visit. Phase 9 turns this into a Client Component to fire
 * the google_maps_click event; until then it stays a plain link with no
 * handler, so there is no dead instrumentation sitting here.
 */
export function GoogleMapsCTA({
  href,
  label,
  note,
}: {
  href: string;
  label: string;
  note: string;
}) {
  return (
    <section className="px-6 pb-20 pt-4 sm:px-10">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-lg font-medium text-ivory transition-colors hover:bg-coral"
      >
        <MapPin size={20} aria-hidden />
        {label}
      </a>
      <p className="mt-3 text-center text-xs text-ink/40">{note}</p>
    </section>
  );
}
