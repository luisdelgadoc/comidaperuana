import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Utensils } from "lucide-react";
import { interpolate } from "@/lib/i18n/interpolate";
import type { RecommendationView } from "@/lib/recommendations";
import type { Locale } from "@/lib/i18n/locales";

function priceLabel(level?: number) {
  return level ? "$".repeat(level) : null;
}

function compactCount(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function RestaurantCard({
  place,
  lang,
  labels,
}: {
  place: RecommendationView;
  lang: Locale;
  labels: {
    localPick: string;
    reviews: string;
    walk: string;
    distance: string;
    seeWhy: string;
  };
}) {
  const price = priceLabel(place.priceLevel);

  // Spec §30: when Google data is missing the row disappears entirely.
  // Printing a zero rating would be worse than printing nothing.
  const hasRating = typeof place.rating === "number";

  const meta = [place.cuisine, place.districtName, price]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/${lang}/places/${place.slug}`}
      className="group flex gap-4 rounded-2xl border border-ink/10 bg-ivory p-3 transition-colors hover:border-ink/25"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink/5">
        {place.imageUrl ? (
          <Image
            src={`${place.imageUrl}?w=400&q=80`}
            alt={place.imageAlt ?? place.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/25">
            <Utensils size={22} aria-hidden />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold leading-tight">{place.name}</h3>
          <ChevronRight
            size={18}
            className="mt-1 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </div>

        {hasRating && (
          <p className="mt-1 flex items-center gap-1.5 text-sm">
            <Star
              size={14}
              className="fill-gold text-gold"
              aria-hidden
            />
            <span className="font-semibold">{place.rating!.toFixed(1)}</span>
            {place.reviewCount !== undefined && (
              <span className="text-ink/50">
                {interpolate(labels.reviews, {
                  count: compactCount(place.reviewCount, lang),
                })}
              </span>
            )}
          </p>
        )}

        <p className="mt-1 truncate text-sm text-ink/55">{meta}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {place.localPick && (
            <span className="rounded-full bg-coral/15 px-2.5 py-0.5 text-xs font-medium text-coral-dark">
              {labels.localPick}
            </span>
          )}
          {place.proximity && (
            <span className="text-xs text-ink/45">
              {place.proximity.kind === "walk"
                ? interpolate(labels.walk, {
                    minutes: place.proximity.minutes,
                  })
                : interpolate(labels.distance, { km: place.proximity.km })}
            </span>
          )}
          <span className="ml-auto text-xs font-medium text-coral-dark">
            {labels.seeWhy} →
          </span>
        </div>
      </div>
    </Link>
  );
}
