import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "../dictionaries";
import { StepHeader } from "@/components/onboarding/StepHeader";
import { CityCard } from "@/components/onboarding/CityCard";
import { getActiveCities } from "@/lib/repositories";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return buildMetadata({
    lang,
    path: "/explore",
    title: dict.seo.exploreTitle,
    description: dict.city.subtitle,
  });
}

export default async function CityStepPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const available = await getActiveCities();

  return (
    <main className="flex min-h-dvh flex-col">
      <StepHeader
        backHref={`/${lang}`}
        backLabel={dict.common.back}
        step={dict.city.step}
        question={dict.city.question}
        subtitle={dict.city.subtitle}
      />

      <div className="mt-10 flex flex-col gap-4 px-6 pb-12 sm:px-10 md:grid md:grid-cols-2">
        {available.map((city, index) => {
          const image = city.selectionImage ?? city.heroImage;
          return (
            <CityCard
              key={city.id}
              href={`/${lang}/explore/${city.slug}`}
              name={city.name[lang]}
              action={dict.city.action}
              image={image}
              alt={image.alt[lang]}
              index={index}
            />
          );
        })}
      </div>
    </main>
  );
}
