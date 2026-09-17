import "server-only";
import type { Locale } from "@/lib/i18n/locales";
import type { City, Dish, District } from "@/types/content";
import { proximityBetween, type Proximity } from "@/lib/distance";
import { getDestination } from "@/lib/destination";
import {
  getCityById,
  getDishCityLinks,
  getDistrictById,
  getDistrictBySlug,
  getRecommendationsForDish,
} from "@/lib/repositories";

/** Spec §13: three places, never more. */
const MAX_RECOMMENDATIONS = 3;

export type RecommendationView = {
  slug: string;
  name: string;
  cuisine?: string;
  districtName: string;
  priceLevel?: number;
  rating?: number;
  reviewCount?: number;
  proximity: Proximity | null;
  localPick: boolean;
  reason: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type DishContext = {
  city: City;
  district: District | null;
  localDescription?: string;
  recommendations: RecommendationView[];
};

/**
 * A dish URL carries no city, but a dish can be served in several. Resolution
 * order: the traveller's chosen destination when the dish exists there,
 * otherwise the city where this dish matters most. Never an arbitrary pick.
 */
export async function getDishContext(
  dish: Dish,
  locale: Locale
): Promise<DishContext | null> {
  const servedIn = await getDishCityLinks(dish.id);
  if (servedIn.length === 0) return null;

  const destination = await getDestination();

  let chosen = null;
  if (destination) {
    for (const entry of servedIn) {
      const candidate = await getCityById(entry.cityId);
      if (candidate?.slug === destination.city) {
        chosen = entry;
        break;
      }
    }
  }
  chosen ??= [...servedIn].sort(
    (a, b) => b.relevanceScore - a.relevanceScore
  )[0];

  const city = await getCityById(chosen.cityId);
  if (!city) return null;

  const district = destination?.district
    ? await getDistrictBySlug(city.id, destination.district)
    : null;

  const pairs = await getRecommendationsForDish(dish.id, city.id);

  const recommendations: RecommendationView[] = [];
  for (const { link, restaurant } of pairs.slice(0, MAX_RECOMMENDATIONS)) {
    const home = await getDistrictById(restaurant.districtId);

    recommendations.push({
      slug: restaurant.slug,
      name: restaurant.name,
      cuisine: restaurant.cuisine?.[locale],
      districtName: home ? home.name[locale] : "",
      priceLevel: restaurant.priceLevel,
      rating: restaurant.rating,
      reviewCount: restaurant.reviewCount,
      proximity: district ? proximityBetween(district, restaurant) : null,
      localPick: link.localPick,
      reason: link.recommendationText[locale],
      imageUrl: restaurant.heroImage?.url,
      imageAlt: restaurant.heroImage?.alt[locale],
    });
  }

  return {
    city,
    district,
    localDescription: chosen.localDescription?.[locale],
    recommendations,
  };
}
