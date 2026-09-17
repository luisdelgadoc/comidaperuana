import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/lib/i18n/locales";

export function DestinationHero({
  eyebrow,
  title,
  subtitle,
  image,
  lang,
  backHref,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: ImageAsset;
  lang: Locale;
  backHref: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] flex-col justify-between overflow-hidden rounded-b-3xl bg-ink">
      <Image
        src={`${image.url}?w=1920&q=80`}
        alt={image.alt[lang]}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/45 to-ink/90" />

      <SiteHeader lang={lang} backHref={backHref} tone="light" />

      <div className="relative z-10 px-6 pb-10 sm:px-10 sm:pb-14">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ivory/70">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-balance text-[clamp(2rem,6.5vw,4.25rem)] font-black leading-[1.02] tracking-tight text-ivory">
            {title}
          </h1>
          <p className="mt-5 max-w-md text-base text-ivory/75">{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
