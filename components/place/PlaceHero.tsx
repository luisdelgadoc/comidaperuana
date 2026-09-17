import Image from "next/image";
import { Star, Utensils } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";
import type { ImageAsset } from "@/types/content";
import type { Proximity } from "@/lib/distance";

export function PlaceHero({
  lang,
  backHref,
  name,
  meta,
  image,
  rating,
  reviewCount,
  proximity,
  labels,
}: {
  lang: Locale;
  backHref: string;
  name: string;
  meta: string;
  image?: ImageAsset;
  rating?: number;
  reviewCount?: number;
  proximity: Proximity | null;
  labels: {
    ratingOn: string;
    reviews: string;
    walk: string;
    distance: string;
  };
}) {
  // Spec §30: if Google has not given us a rating, the whole block is absent.
  const hasRating = typeof rating === "number";

  const proximityLabel = proximity
    ? proximity.kind === "walk"
      ? interpolate(labels.walk, { minutes: proximity.minutes })
      : interpolate(labels.distance, { km: proximity.km })
    : null;

  return (
    <section className="relative flex min-h-[64vh] flex-col justify-between overflow-hidden bg-ink">
      {image ? (
        <Image
          src={`${image.url}?w=1920&q=80`}
          alt={image.alt[lang]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/90 text-ivory/20">
          <Utensils size={64} aria-hidden />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/90" />

      <SiteHeader lang={lang} tone="light" backHref={backHref} />

      <div className="relative z-10 px-6 pb-12 sm:px-10">
        <Reveal>
          <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] font-black leading-[0.95] tracking-tight text-ivory">
            {name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-ivory/75">
            <span>{meta}</span>
            {proximityLabel && (
              <>
                <span aria-hidden>·</span>
                <span>{proximityLabel}</span>
              </>
            )}
          </div>

          {hasRating && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ivory/85">
              <Star size={16} className="fill-gold text-gold" aria-hidden />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-ivory/60">{labels.ratingOn}</span>
              {reviewCount !== undefined && (
                <>
                  <span aria-hidden className="text-ivory/40">
                    ·
                  </span>
                  <span className="text-ivory/60">
                    {interpolate(labels.reviews, {
                      count: new Intl.NumberFormat(lang).format(reviewCount),
                    })}
                  </span>
                </>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
