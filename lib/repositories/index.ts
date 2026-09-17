import "server-only";
import type {
  Category,
  City,
  Dish,
  DishCity,
  DishRestaurant,
  District,
  Restaurant,
} from "@/types/content";
import {
  categories,
  cities,
  dishCities,
  dishRestaurants,
  dishes,
  districts,
  restaurants,
} from "@/data/mock";

/**
 * The only module that knows where content comes from. Pages and helpers go
 * through here so that swapping the mock arrays for Supabase touches this
 * folder and nothing else.
 *
 * Every function is async even though the current source is in memory. A real
 * database will be async, and making that change later would otherwise ripple
 * through every call site.
 */

export async function getActiveCities(): Promise<City[]> {
  return cities
    .filter((city) => city.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  return cities.find((city) => city.slug === slug && city.isActive) ?? null;
}

export async function getCityById(id: string): Promise<City | null> {
  return cities.find((city) => city.id === id) ?? null;
}

export async function getDistrictsByCity(cityId: string): Promise<District[]> {
  return districts
    .filter((district) => district.cityId === cityId && district.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getDistrictBySlug(
  cityId: string,
  slug: string
): Promise<District | null> {
  return (
    districts.find(
      (district) =>
        district.slug === slug &&
        district.cityId === cityId &&
        district.isActive
    ) ?? null
  );
}

export async function getDistrictById(id: string): Promise<District | null> {
  return districts.find((district) => district.id === id) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getActiveDishes(): Promise<Dish[]> {
  return dishes.filter((dish) => dish.isActive);
}

export async function getDishBySlug(slug: string): Promise<Dish | null> {
  return dishes.find((dish) => dish.slug === slug && dish.isActive) ?? null;
}

/** Dishes served in a city, in the order the city's feed should present them. */
export async function getDishesByCity(cityId: string): Promise<Dish[]> {
  return dishCities
    .filter((entry) => entry.cityId === cityId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .flatMap((entry) => {
      const dish = dishes.find(
        (candidate) => candidate.id === entry.dishId && candidate.isActive
      );
      return dish ? [dish] : [];
    });
}

export async function getDishCityLinks(dishId: string): Promise<DishCity[]> {
  return dishCities.filter((entry) => entry.dishId === dishId);
}

export async function getActiveRestaurants(): Promise<Restaurant[]> {
  return restaurants.filter((place) => place.isActive);
}

export async function getRestaurantBySlug(
  slug: string
): Promise<Restaurant | null> {
  return (
    restaurants.find((place) => place.slug === slug && place.isActive) ?? null
  );
}

/** Editorial recommendations for a dish within one city, ordered by priority. */
export async function getRecommendationsForDish(
  dishId: string,
  cityId: string
): Promise<{ link: DishRestaurant; restaurant: Restaurant }[]> {
  return dishRestaurants
    .filter((link) => link.dishId === dishId && link.isActive)
    .flatMap((link) => {
      const restaurant = restaurants.find(
        (place) =>
          place.id === link.restaurantId &&
          place.isActive &&
          place.cityId === cityId
      );
      return restaurant ? [{ link, restaurant }] : [];
    })
    .sort((a, b) => a.link.priority - b.link.priority);
}
