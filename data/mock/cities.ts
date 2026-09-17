import type { City } from "@/types/content";
import { images } from "./images";

export const cities: City[] = [
  {
    id: "city-lima",
    slug: "lima",
    name: { en: "Lima", es: "Lima" },
    country: "PE",
    description: {
      en: "Peru's coastal capital, where centuries of migration turned the Pacific into a kitchen.",
      es: "La capital costera del Perú, donde siglos de migración convirtieron el Pacífico en una cocina.",
    },
    heroImage: images.cities.lima,
    selectionImage: images.cities.limaSelection,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "city-cusco",
    slug: "cusco",
    name: { en: "Cusco", es: "Cusco" },
    country: "PE",
    description: {
      en: "The Andean former capital of the Inca empire, where the food is built on altitude, grain and fire.",
      es: "La antigua capital andina del imperio inca, donde la comida se construye sobre altura, grano y fuego.",
    },
    heroImage: images.cities.cusco,
    selectionImage: images.cities.cuscoSelection,
    isActive: true,
    sortOrder: 2,
  },
];
