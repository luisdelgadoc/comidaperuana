import type { DishCity, LocalizedText } from "@/types/content";

type Assignment = {
  dishId: string;
  relevanceScore: number;
  localDescription?: LocalizedText;
};

const lima: Assignment[] = [
  { dishId: "dish-ceviche", relevanceScore: 100 },
  { dishId: "dish-lomo-saltado", relevanceScore: 95 },
  { dishId: "dish-anticuchos", relevanceScore: 88 },
  { dishId: "dish-causa-limena", relevanceScore: 80 },
  { dishId: "dish-aji-de-gallina", relevanceScore: 78 },
  { dishId: "dish-pollo-a-la-brasa", relevanceScore: 92 },
  { dishId: "dish-tiradito", relevanceScore: 74 },
  { dishId: "dish-chifa", relevanceScore: 70 },
  { dishId: "dish-picarones", relevanceScore: 62 },
  { dishId: "dish-suspiro-a-la-limena", relevanceScore: 58 },
];

const cusco: Assignment[] = [
  { dishId: "dish-cuy-al-horno", relevanceScore: 96 },
  { dishId: "dish-chicharron-cusqueno", relevanceScore: 90 },
  { dishId: "dish-lechon", relevanceScore: 84 },
  { dishId: "dish-alpaca-a-la-parrilla", relevanceScore: 88 },
  { dishId: "dish-trucha-frita", relevanceScore: 76 },
  { dishId: "dish-sopa-de-quinua", relevanceScore: 82 },
  { dishId: "dish-choclo-con-queso", relevanceScore: 68 },
  { dishId: "dish-chiriuchu", relevanceScore: 72 },
  {
    dishId: "dish-ceviche",
    relevanceScore: 44,
    localDescription: {
      en: "Cusco sits far from the sea, so ceviche here depends on fish flown in that morning. Worth ordering only where that is genuinely the case.",
      es: "Cusco está lejos del mar, así que el ceviche aquí depende de pescado que llegó en avión esa mañana. Vale la pena pedirlo solo donde eso realmente ocurre.",
    },
  },
  {
    dishId: "dish-chifa",
    relevanceScore: 40,
    localDescription: {
      en: "Chifa travelled from Lima to the Andes with Chinese-Peruvian families, and Cusco has kept its own smaller version.",
      es: "El chifa viajó de Lima a los Andes con las familias chino-peruanas, y Cusco conserva su propia versión más pequeña.",
    },
  },
];

function build(cityId: string, assignments: Assignment[]): DishCity[] {
  return assignments.map((assignment, index) => ({
    id: `${cityId}--${assignment.dishId}`,
    dishId: assignment.dishId,
    cityId,
    relevanceScore: assignment.relevanceScore,
    localDescription: assignment.localDescription,
    sortOrder: index + 1,
  }));
}

export const dishCities: DishCity[] = [
  ...build("city-lima", lima),
  ...build("city-cusco", cusco),
];
