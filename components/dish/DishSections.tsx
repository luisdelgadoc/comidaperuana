import { CalendarDays, Clock, MapPin, Quote } from "lucide-react";
import type { ReactNode } from "react";

export function DishIntro({
  whatIsItLabel,
  whatIsIt,
  whyTryItLabel,
  whyTryIt,
  note,
}: {
  whatIsItLabel: string;
  whatIsIt: string;
  whyTryItLabel: string;
  whyTryIt: string;
  note?: string;
}) {
  return (
    <section className="px-6 py-12 sm:px-10">
      {note && (
        <p className="mb-10 border-l-2 border-coral pl-4 text-base leading-relaxed text-ink/70">
          {note}
        </p>
      )}

      <Block title={whatIsItLabel}>{whatIsIt}</Block>
      <div className="mt-10">
        <Block title={whyTryItLabel}>{whyTryIt}</Block>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-ink/40">
        {title}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-ink/80">{children}</p>
    </div>
  );
}

export function DishFacts({
  facts,
  ingredientsLabel,
  ingredients,
}: {
  facts: { label: string; value: string; kind: "origin" | "season" | "moment" }[];
  ingredientsLabel: string;
  ingredients: string[];
}) {
  const icons = {
    origin: MapPin,
    season: CalendarDays,
    moment: Clock,
  } as const;

  return (
    <section className="border-y border-ink/10 px-6 py-10 sm:px-10">
      <dl className="flex flex-wrap gap-x-12 gap-y-6">
        {facts.map((fact) => {
          const Icon = icons[fact.kind];
          return (
            <div key={fact.label}>
              <dt className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink/40">
                <Icon size={14} aria-hidden />
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-base font-medium">{fact.value}</dd>
            </div>
          );
        })}
      </dl>

      {ingredients.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ink/40">
            {ingredientsLabel}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-full bg-ink/5 px-3 py-1.5 text-sm text-ink/75"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function LocalTip({ label, tip }: { label: string; tip: string }) {
  return (
    <section className="px-6 py-12 sm:px-10">
      <div className="max-w-2xl rounded-2xl bg-ink px-6 py-8 text-ivory">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ivory/50">
          <Quote size={14} aria-hidden />
          {label}
        </p>
        <p className="mt-4 text-lg leading-relaxed">{tip}</p>
      </div>
    </section>
  );
}
