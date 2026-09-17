import { UtensilsCrossed } from "lucide-react";

export function PlaceEditorial({
  whyLabel,
  why,
  description,
}: {
  whyLabel: string;
  why: string;
  description: string;
}) {
  return (
    <section className="px-6 py-12 sm:px-10">
      <div className="max-w-2xl">
        <p className="text-lg leading-relaxed text-ink/70">{description}</p>

        <h2 className="mt-10 text-xs font-semibold uppercase tracking-widest text-ink/40">
          {whyLabel}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">{why}</p>
      </div>
    </section>
  );
}

export function WhatToOrder({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-y border-ink/10 px-6 py-10 sm:px-10">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/40">
        <UtensilsCrossed size={14} aria-hidden />
        {label}
      </h2>

      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={item} className="flex items-baseline gap-4">
            <span className="text-sm tabular-nums text-ink/30">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xl font-bold tracking-tight">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function IdealFor({
  label,
  tags,
}: {
  label: string;
  tags: string[];
}) {
  if (tags.length === 0) return null;

  return (
    <section className="px-6 py-10 sm:px-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-ink/40">
        {label}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-ink/5 px-3 py-1.5 text-sm text-ink/75"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
