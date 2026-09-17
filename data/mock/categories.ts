import type { Category } from "@/types/content";

export const categories: Category[] = [
  {
    id: "category-seafood",
    slug: "seafood",
    name: { en: "Seafood", es: "Marinos" },
    sortOrder: 1,
  },
  {
    id: "category-criollo",
    slug: "criollo",
    name: { en: "Criollo", es: "Criollos" },
    sortOrder: 2,
  },
  {
    id: "category-chifa",
    slug: "chifa",
    name: { en: "Chifa", es: "Chifas" },
    sortOrder: 3,
  },
  {
    id: "category-andean",
    slug: "andean",
    name: { en: "Andean", es: "Andinos" },
    sortOrder: 4,
  },
  {
    id: "category-sweet",
    slug: "sweet",
    name: { en: "Sweet", es: "Dulces" },
    sortOrder: 5,
  },
];
