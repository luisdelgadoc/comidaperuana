import type { RecommendationView } from "@/lib/recommendations";
import type { Locale } from "@/lib/i18n/locales";
import { RestaurantCard } from "./RestaurantCard";

export function RestaurantRecommendationList({
  places,
  lang,
  title,
  subtitle,
  emptyLabel,
  labels,
}: {
  places: RecommendationView[];
  lang: Locale;
  title: string;
  subtitle: string;
  emptyLabel: string;
  labels: {
    localPick: string;
    reviews: string;
    walk: string;
    distance: string;
    seeWhy: string;
  };
}) {
  return (
    <section className="px-6 pb-20 sm:px-10">
      <h2 className="max-w-2xl text-balance text-[clamp(1.75rem,5vw,3rem)] font-black leading-[1.05] tracking-tight">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-ink/55">{subtitle}</p>

      {places.length === 0 ? (
        <p className="mt-8 text-ink/50">{emptyLabel}</p>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {places.map((place) => (
            <RestaurantCard
              key={place.slug}
              place={place}
              lang={lang}
              labels={labels}
            />
          ))}
        </div>
      )}
    </section>
  );
}
