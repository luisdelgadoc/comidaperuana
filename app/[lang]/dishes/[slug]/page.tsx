import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/locales";
import { interpolate } from "@/lib/i18n/interpolate";
import { buildMetadata, socialImage } from "@/lib/metadata";
import { getDictionary } from "../../dictionaries";
import { getDishContext } from "@/lib/recommendations";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import {
  DishFacts,
  DishIntro,
  LocalTip,
} from "@/components/dish/DishSections";
import { RestaurantRecommendationList } from "@/components/dish/RestaurantRecommendationList";
import { getActiveDishes, getDishBySlug } from "@/lib/repositories";

/**
 * Every valid slug is known, so unknown ones are rejected by the router before
 * rendering starts. Throwing notFound() inside the page would arrive after the
 * loading boundary began streaming, which sends 200 and produces a soft 404.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const active = await getActiveDishes();
  return locales.flatMap((lang) =>
    active.map((dish) => ({ lang, slug: dish.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/dishes/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const dish = await getDishBySlug(slug);
  if (!dish) return {};

  const dict = await getDictionary(lang);

  return buildMetadata({
    lang,
    path: `/dishes/${dish.slug}`,
    title: interpolate(dict.seo.dishTitle, { dish: dish.name[lang] }),
    description: dish.shortDescription[lang],
    image: socialImage(dish.heroImage.url),
    imageAlt: dish.heroImage.alt[lang],
  });
}

export default async function DishPage({
  params,
}: PageProps<"/[lang]/dishes/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const dish = await getDishBySlug(slug);
  if (!dish) notFound();

  const dict = await getDictionary(lang);
  const context = await getDishContext(dish, lang);
  if (!context) notFound();

  const facts = [
    dish.origin && {
      label: dict.dish.origin,
      value: dish.origin[lang],
      kind: "origin" as const,
    },
    dish.season && {
      label: dict.dish.season,
      value: dish.season[lang],
      kind: "season" as const,
    },
    dish.bestMoment && {
      label: dict.dish.bestMoment,
      value: dish.bestMoment[lang],
      kind: "moment" as const,
    },
  ].filter((fact) => fact !== undefined);

  return (
    <main className="flex min-h-dvh flex-col">
      <section className="relative flex min-h-[78vh] flex-col justify-between overflow-hidden bg-ink">
        <Image
          src={`${dish.heroImage.url}?w=1920&q=80`}
          alt={dish.heroImage.alt[lang]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/90" />

        {/* Explicit target: a visitor arriving from search has no history to
            go back to, so router.back() would leave the site. */}
        <SiteHeader
          lang={lang}
          tone="light"
          backHref={
            context.district
              ? `/${lang}/explore/${context.city.slug}/${context.district.slug}`
              : `/${lang}/explore/${context.city.slug}`
          }
        />

        <div className="relative z-10 px-6 pb-12 sm:px-10">
          <Reveal>
            {dish.label && (
              <span className="inline-block rounded-full bg-coral px-3 py-1 text-xs font-medium text-ivory">
                {dish.label[lang]}
              </span>
            )}
            <h1 className="mt-4 text-[clamp(2.5rem,9vw,5.5rem)] font-black leading-[0.95] tracking-tight text-ivory">
              {dish.name[lang]}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ivory/80">
              {dish.shortDescription[lang]}
            </p>
          </Reveal>
        </div>
      </section>

      <DishIntro
        whatIsItLabel={dict.dish.whatIsIt}
        whatIsIt={dish.description[lang]}
        whyTryItLabel={dict.dish.whyTryIt}
        whyTryIt={dish.whyTryIt[lang]}
        note={context.localDescription}
      />

      <DishFacts
        facts={facts}
        ingredientsLabel={dict.dish.ingredients}
        ingredients={dish.ingredients.map((item) => item[lang])}
      />

      {dish.localTip && (
        <LocalTip label={dict.dish.localTip} tip={dish.localTip[lang]} />
      )}

      <RestaurantRecommendationList
        places={context.recommendations}
        lang={lang}
        title={dict.dish.whereTitle}
        subtitle={dict.dish.whereSubtitle}
        emptyLabel={dict.dish.noPlaces}
        labels={{
          localPick: dict.dish.localPick,
          reviews: dict.dish.reviews,
          walk: dict.common.walk,
          distance: dict.common.distance,
          seeWhy: dict.dish.seeWhy,
        }}
      />
    </main>
  );
}
