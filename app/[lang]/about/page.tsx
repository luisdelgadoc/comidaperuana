import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "../dictionaries";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return buildMetadata({
    lang,
    path: "/about",
    title: dict.seo.aboutTitle,
    description: dict.about.title,
  });
}

export default async function AboutPage({ params }: PageProps<"/[lang]"> ) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-dvh flex-col">
      <SiteHeader lang={lang} tone="dark" showBack={false} />

      <div className="flex flex-1 flex-col justify-center px-6 pb-16 sm:px-10">
        <Reveal>
          <h1 className="max-w-3xl text-balance text-[clamp(2rem,6vw,4rem)] font-black leading-[1.02] tracking-tight">
            {dict.about.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
            {dict.about.body}
          </p>
          <div className="mt-10">
            <Button href={`/${lang}/explore`} variant="primary">
              {dict.about.back} →
            </Button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
