import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata, socialImage } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "./dictionaries";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Reveal } from "@/components/Reveal";
import { images } from "@/data/mock/images";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const hero = images.dishes.ceviche;

  return buildMetadata({
    lang,
    path: "",
    title: dict.seo.siteTitle,
    description: dict.seo.siteDescription,
    image: socialImage(hero.url),
    imageAlt: hero.alt[lang],
  });
}

export default async function SplashPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const hero = images.dishes.ceviche;

  return (
    <main className="relative flex min-h-dvh flex-col justify-between overflow-hidden bg-ink">
      <Image
        src={`${hero.url}?w=1920&q=80`}
        alt={hero.alt[lang]}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink/85" />

      <header className="relative z-10 flex items-center justify-between px-6 py-8 sm:px-10">
        <span className="text-sm font-semibold tracking-wide text-ivory">
          {dict.brand}
        </span>
        <LanguageSwitcher current={lang} tone="light" />
      </header>

      <div className="relative z-10 px-6 pb-12 sm:px-10 sm:pb-16">
        <Reveal>
          <h1 className="max-w-4xl text-balance text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-ivory">
            {dict.home.tagline}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-md text-lg text-ivory/80">
            {dict.home.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10">
            <Button href={`/${lang}/explore`} variant="primary">
              {dict.home.cta} →
            </Button>
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest text-ivory/75">
            {dict.home.footnote}
          </p>
        </Reveal>
      </div>
    </main>
  );
}
