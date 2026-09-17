import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BackButton } from "@/components/BackButton";
import { NavMenu, type MenuLink } from "@/components/NavMenu";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getActiveCities } from "@/lib/repositories";

/**
 * Header for the exploration screens. Onboarding steps deliberately do not use
 * it: while choosing a destination the screen must hold a single decision
 * (spec §22), so those screens carry a back control only.
 */
export async function SiteHeader({
  lang,
  eyebrow,
  backHref,
  showBack = true,
  tone = "light",
}: {
  lang: Locale;
  eyebrow?: string;
  backHref?: string;
  showBack?: boolean;
  tone?: "dark" | "light";
}) {
  const dict = await getDictionary(lang);

  const activeCities = await getActiveCities();

  const links: MenuLink[] = [
    ...activeCities
      .map((city) => ({
        href: `/${lang}/explore/${city.slug}`,
        label: interpolate(dict.menu.explore, { city: city.name[lang] }),
      })),
    { href: `/${lang}/explore`, label: dict.menu.changeDestination },
    { href: `/${lang}/about`, label: dict.menu.about },
  ];

  return (
    <header className="relative z-30 flex items-center justify-between gap-3 px-6 py-6 sm:px-10">
      <div className="flex min-w-0 items-center gap-3">
        {showBack && (
          <BackButton label={dict.common.back} href={backHref} tone={tone} />
        )}
        {eyebrow && (
          <span
            className={`truncate text-sm font-semibold tracking-wide ${
              tone === "light" ? "text-ivory" : "text-ink"
            }`}
          >
            {eyebrow}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <LanguageSwitcher current={lang} tone={tone} />
        <NavMenu
          links={links}
          openLabel={dict.menu.open}
          closeLabel={dict.menu.close}
          title={dict.menu.title}
          lang={lang}
          tone={tone}
        />
      </div>
    </header>
  );
}
