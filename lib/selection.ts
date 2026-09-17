"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCityBySlug, getDistrictBySlug } from "@/lib/repositories";
import { isLocale } from "@/lib/i18n/locales";
import { DESTINATION_COOKIE } from "@/lib/destination";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Every export in a "use server" file becomes a callable endpoint, so this file
 * holds the action and nothing else. Reading the cookie lives in destination.ts.
 *
 * Both slugs arrive from the browser and are resolved against the catalogue
 * before being stored or placed in a redirect path.
 */
export async function chooseDestination(formData: FormData) {
  const lang = String(formData.get("lang") ?? "");
  const citySlug = String(formData.get("city") ?? "");
  const districtSlug = String(formData.get("district") ?? "");

  const city = await getCityBySlug(citySlug);
  const district = city ? await getDistrictBySlug(city.id, districtSlug) : null;

  if (!isLocale(lang) || !city || !district) {
    redirect("/");
  }

  (await cookies()).set(DESTINATION_COOKIE, `${city.slug}/${district.slug}`, {
    maxAge: ONE_YEAR,
    sameSite: "lax",
    path: "/",
  });

  redirect(`/${lang}/explore/${city.slug}/${district.slug}`);
}
