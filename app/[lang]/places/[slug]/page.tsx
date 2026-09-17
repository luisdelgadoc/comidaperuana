import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/locales";
import { interpolate } from "@/lib/i18n/interpolate";
import { buildMetadata, socialImage } from "@/lib/metadata";
import { getDictionary } from "../../dictionaries";
import { getDestination } from "@/lib/destination";
import { proximityBetween } from "@/lib/distance";
import { googleMapsUrl } from "@/lib/maps";
import { PlaceHero } from "@/components/place/PlaceHero";
import {
  IdealFor,
  PlaceEditorial,
  WhatToOrder,
} from "@/components/place/PlaceEditorial";
import { GoogleMapsCTA } from "@/components/place/GoogleMapsCTA";
import {
  getActiveRestaurants,
  getCityById,
  getDistrictById,
  getDistrictBySlug,
  getRestaurantBySlug,
} from "@/lib/repositories";

/** See the dish route: unknown slugs must 404 before streaming begins. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const active = await getActiveRestaurants();
  return locales.flatMap((lang) =>
    active.map((place) => ({ lang, slug: place.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/places/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const place = await getRestaurantBySlug(slug);
  if (!place) return {};

  const dict = await getDictionary(lang);
  const home = await getDistrictById(place.districtId);

  return buildMetadata({
    lang,
    path: `/places/${place.slug}`,
    title: interpolate(dict.seo.placeTitle, {
      place: place.name,
      district: home ? home.name[lang] : "",
    }),
    description: place.editorialDescription[lang],
    image: place.heroImage ? socialImage(place.heroImage.url) : undefined,
    imageAlt: place.heroImage?.alt[lang],
  });
}

export default async function PlacePage({
  params,
}: PageProps<"/[lang]/places/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const place = await getRestaurantBySlug(slug);
  if (!place) notFound();

  const dict = await getDictionary(lang);
  const city = await getCityById(place.cityId);
  const home = await getDistrictById(place.districtId);

  const destination = await getDestination();
  const origin = destination?.district
    ? await getDistrictBySlug(place.cityId, destination.district)
    : null;

  const meta = [
    place.cuisine?.[lang],
    home?.name[lang],
    place.priceLevel ? "$".repeat(place.priceLevel) : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  // A visitor arriving from search has no history, so back needs a real target.
  const backHref = origin
    ? `/${lang}/explore/${city?.slug}/${origin.slug}`
    : city
      ? `/${lang}/explore/${city.slug}`
      : `/${lang}/explore`;

  return (
    <main className="flex min-h-dvh flex-col">
      <PlaceHero
        lang={lang}
        backHref={backHref}
        name={place.name}
        meta={meta}
        image={place.heroImage}
        rating={place.rating}
        reviewCount={place.reviewCount}
        proximity={origin ? proximityBetween(origin, place) : null}
        labels={{
          ratingOn: dict.place.ratingOn,
          reviews: dict.place.reviews,
          walk: dict.common.walk,
          distance: dict.common.distance,
        }}
      />

      <PlaceEditorial
        whyLabel={dict.place.whyWeRecommend}
        why={place.whyWeRecommend[lang]}
        description={place.editorialDescription[lang]}
      />

      <WhatToOrder
        label={dict.place.whatToOrder}
        items={place.recommendedItems.map((item) => item[lang])}
      />

      <IdealFor
        label={dict.place.idealFor}
        tags={place.tags.map((tag) => tag[lang])}
      />

      <GoogleMapsCTA
        href={googleMapsUrl(place, home?.name[lang], city?.name[lang])}
        label={dict.place.openInMaps}
        note={dict.place.mapsNote}
      />
    </main>
  );
}
