import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { interpolate } from "@/lib/i18n/interpolate";
import { buildMetadata, socialImage } from "@/lib/metadata";
import { getDictionary } from "../../../dictionaries";
import { DestinationHero } from "@/components/destination/DestinationHero";
import { DishFeed } from "@/components/destination/DishFeed";
import { toDishCardView, type CategoryView } from "@/lib/views";
import {
  getCategories,
  getCityBySlug,
  getDishesByCity,
  getDistrictBySlug,
} from "@/lib/repositories";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/explore/[city]/[district]">): Promise<Metadata> {
  const { lang, city: citySlug, district: districtSlug } = await params;
  if (!isLocale(lang)) return {};

  const city = await getCityBySlug(citySlug);
  const district = city ? await getDistrictBySlug(city.id, districtSlug) : null;
  if (!city || !district) return {};

  const dict = await getDictionary(lang);
  const image = district.image ?? city.heroImage;

  return buildMetadata({
    lang,
    path: `/explore/${city.slug}/${district.slug}`,
    title: interpolate(dict.seo.destinationTitle, {
      district: district.name[lang],
      city: city.name[lang],
    }),
    description: dict.destination.subtitle,
    image: socialImage(image.url),
    imageAlt: image.alt[lang],
  });
}

export default async function DestinationPage({
  params,
}: PageProps<"/[lang]/explore/[city]/[district]">) {
  const { lang, city: citySlug, district: districtSlug } = await params;
  if (!isLocale(lang)) notFound();

  const city = await getCityBySlug(citySlug);
  const district = city ? await getDistrictBySlug(city.id, districtSlug) : null;
  if (!city || !district) notFound();

  const dict = await getDictionary(lang);

  const categories = await getCategories();
  const cityDishes = (await getDishesByCity(city.id)).map((dish) =>
    toDishCardView(dish, categories, lang)
  );

  // Only categories actually present here: a filter that returns nothing is a bug.
  const presentIds = new Set(cityDishes.map((dish) => dish.categoryId));
  const visibleCategories: CategoryView[] = categories
    .filter((category) => presentIds.has(category.id))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => ({ id: category.id, name: category.name[lang] }));

  return (
    <main className="flex min-h-dvh flex-col">
      <DestinationHero
        eyebrow={`${city.name[lang]} · ${district.name[lang]}`}
        title={interpolate(dict.destination.question, {
          district: district.name[lang],
        })}
        subtitle={dict.destination.subtitle}
        image={district.image ?? city.heroImage}
        lang={lang}
        backHref={`/${lang}/explore/${city.slug}`}
      />

      <DishFeed
        dishes={cityDishes}
        categories={visibleCategories}
        allLabel={dict.destination.all}
        discoverLabel={dict.destination.discover}
        sectionTitle={dict.destination.sectionTitle}
        lang={lang}
      />
    </main>
  );
}
