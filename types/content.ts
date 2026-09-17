import type { Locale } from "@/lib/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type ImageAsset = {
  url: string;
  alt: LocalizedText;
};

export type City = {
  id: string;
  slug: string;
  name: LocalizedText;
  country: string;
  description: LocalizedText;
  heroImage: ImageAsset;
  selectionImage?: ImageAsset;
  isActive: boolean;
  sortOrder: number;
};

export type District = {
  id: string;
  cityId: string;
  slug: string;
  name: LocalizedText;
  description?: LocalizedText;
  image?: ImageAsset;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  sortOrder: number;
};

export type Category = {
  id: string;
  slug: string;
  name: LocalizedText;
  sortOrder: number;
};

export type Dish = {
  id: string;
  slug: string;
  name: LocalizedText;
  label?: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  whyTryIt: LocalizedText;
  origin?: LocalizedText;
  season?: LocalizedText;
  bestMoment?: LocalizedText;
  localTip?: LocalizedText;
  categoryId: string;
  heroImage: ImageAsset;
  cardImage: ImageAsset;
  ingredients: LocalizedText[];
  isActive: boolean;
  sortOrder: number;
};

export type DishCity = {
  id: string;
  dishId: string;
  cityId: string;
  relevanceScore: number;
  localDescription?: LocalizedText;
  sortOrder: number;
};

/**
 * rating/reviewCount are entered manually from Google Maps, not fetched live —
 * ComidaPeruana has no billing account attached to a Places API project.
 */
export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  cityId: string;
  districtId: string;
  googlePlaceId?: string;
  cuisine?: LocalizedText;
  editorialDescription: LocalizedText;
  whyWeRecommend: LocalizedText;
  recommendedItems: LocalizedText[];
  tags: LocalizedText[];
  priceLevel?: number;
  rating?: number;
  reviewCount?: number;
  heroImage?: ImageAsset;
  galleryImages?: ImageAsset[];
  latitude?: number;
  longitude?: number;
  isActive: boolean;
};

export type DishRestaurant = {
  id: string;
  dishId: string;
  restaurantId: string;
  recommendationText: LocalizedText;
  priority: number;
  localPick: boolean;
  isActive: boolean;
};
