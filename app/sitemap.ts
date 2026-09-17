import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
import { siteUrl } from "@/lib/metadata";
import {
  getActiveCities,
  getActiveDishes,
  getActiveRestaurants,
  getDistrictsByCity,
} from "@/lib/repositories";

/**
 * Also the source of truth for the image pre-warm script, which needs a
 * reliable list of every page: the district step uses a form rather than
 * links, so a crawler starting from the home page never reaches the feeds.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cities, dishes, restaurants] = await Promise.all([
    getActiveCities(),
    getActiveDishes(),
    getActiveRestaurants(),
  ]);

  const paths = ["", "/explore", "/about"];

  for (const city of cities) {
    paths.push(`/explore/${city.slug}`);
    for (const district of await getDistrictsByCity(city.id)) {
      paths.push(`/explore/${city.slug}/${district.slug}`);
    }
  }

  for (const dish of dishes) paths.push(`/dishes/${dish.slug}`);
  for (const place of restaurants) paths.push(`/places/${place.slug}`);

  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((other) => [other, `${siteUrl}/${other}${path}`])
        ),
      },
    }))
  );
}
