import type { Locale } from "@/lib/i18n/locales";
import type { Category, Dish } from "@/types/content";

/**
 * Dishes reach Client Components already resolved to the active language.
 * Passing the raw entities would ship both translations to every visitor.
 */
export type DishCardView = {
  slug: string;
  name: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  label?: string;
  imageUrl: string;
  imageAlt: string;
};

export type CategoryView = {
  id: string;
  name: string;
};

export function toDishCardView(
  dish: Dish,
  categories: Category[],
  locale: Locale
): DishCardView {
  const category = categories.find((entry) => entry.id === dish.categoryId);

  return {
    slug: dish.slug,
    name: dish.name[locale],
    shortDescription: dish.shortDescription[locale],
    categoryId: dish.categoryId,
    categoryName: category ? category.name[locale] : "",
    label: dish.label?.[locale],
    imageUrl: dish.cardImage.url,
    imageAlt: dish.cardImage.alt[locale],
  };
}
