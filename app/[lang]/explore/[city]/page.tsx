import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { interpolate } from "@/lib/i18n/interpolate";
import { buildMetadata, socialImage } from "@/lib/metadata";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "../../dictionaries";
import { StepHeader } from "@/components/onboarding/StepHeader";
import { DistrictPicker } from "@/components/onboarding/DistrictPicker";
import {
  getActiveCities,
  getCityBySlug,
  getDistrictsByCity,
} from "@/lib/repositories";

export async function generateStaticParams() {
  const active = await getActiveCities();
  return active.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/explore/[city]">): Promise<Metadata> {
  const { lang, city: citySlug } = await params;
  if (!isLocale(lang)) return {};

  const city = await getCityBySlug(citySlug);
  if (!city) return {};

  const dict = await getDictionary(lang);
  const image = city.selectionImage ?? city.heroImage;

  return buildMetadata({
    lang,
    path: `/explore/${city.slug}`,
    title: interpolate(dict.menu.explore, { city: city.name[lang] }),
    description: dict.district.subtitle,
    image: socialImage(image.url),
    imageAlt: image.alt[lang],
  });
}

export default async function DistrictStepPage({
  params,
}: PageProps<"/[lang]/explore/[city]">) {
  const { lang, city: citySlug } = await params;
  if (!isLocale(lang)) notFound();

  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const dict = await getDictionary(lang);
  const available = await getDistrictsByCity(city.id);

  if (available.length === 0) notFound();

  return (
    <main className="flex min-h-dvh flex-col">
      <StepHeader
        backHref={`/${lang}/explore`}
        backLabel={dict.common.back}
        step={dict.district.step}
        question={dict.district.question}
        subtitle={dict.district.subtitle}
      />

      <div className="mt-10 flex flex-1 flex-col">
        <DistrictPicker
          districts={available}
          lang={lang}
          citySlug={city.slug}
          action={dict.district.action}
        />
      </div>
    </main>
  );
}
