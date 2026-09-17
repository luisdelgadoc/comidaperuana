import type { DishRestaurant, LocalizedText } from "@/types/content";

type Entry = {
  dishId: string;
  restaurantId: string;
  recommendationText: LocalizedText;
  priority: number;
  localPick?: boolean;
};

/**
 * The editorial core of the product: which places we send a traveller to for a
 * given dish, and in what order. Never sorted by rating — priority is our call.
 *
 * `priority` and the three-recommendation cap (spec §13) are scoped per city,
 * not globally: a restaurant belongs to exactly one city, so a dish served in
 * both Lima and Cusco carries a separate ranking in each. Any query must filter
 * by the traveller's city before taking the top three.
 */
const entries: Entry[] = [
  {
    dishId: "dish-ceviche",
    restaurantId: "restaurant-la-mar",
    recommendationText: {
      en: "The most complete introduction to Lima's ceviche, and the easiest to get right on a first visit.",
      es: "La introducción más completa al ceviche limeño, y la más fácil de acertar en una primera visita.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-ceviche",
    restaurantId: "restaurant-punto-azul",
    recommendationText: {
      en: "Same quality of fish, half the price, and full of limeños at lunchtime.",
      es: "La misma calidad de pescado, la mitad del precio, y lleno de limeños a la hora del almuerzo.",
    },
    priority: 2,
  },
  {
    dishId: "dish-ceviche",
    restaurantId: "restaurant-canta-rana",
    recommendationText: {
      en: "The unpolished Barranco version, unchanged for decades.",
      es: "La versión sin pulir de Barranco, sin cambios desde hace décadas.",
    },
    priority: 3,
  },
  {
    dishId: "dish-lomo-saltado",
    restaurantId: "restaurant-isolina",
    recommendationText: {
      en: "Cooked the way a Peruvian family would make it on a Sunday, in a portion built for two.",
      es: "Cocinado como lo haría una familia peruana un domingo, en una porción pensada para dos.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-lomo-saltado",
    restaurantId: "restaurant-panchita",
    recommendationText: {
      en: "A reliable version in a comfortable room, useful if Isolina is full.",
      es: "Una versión confiable en un local cómodo, útil si Isolina está lleno.",
    },
    priority: 2,
  },
  {
    dishId: "dish-anticuchos",
    restaurantId: "restaurant-tia-grimanesa",
    recommendationText: {
      en: "The reference anticuchos in Lima, from the family that sold them off a cart for decades.",
      es: "Los anticuchos de referencia en Lima, de la familia que los vendió en carretilla durante décadas.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-anticuchos",
    restaurantId: "restaurant-panchita",
    recommendationText: {
      en: "The sit-down option, if you would rather not eat standing on the street.",
      es: "La opción para sentarse, si prefieres no comer de pie en la calle.",
    },
    priority: 2,
  },
  {
    dishId: "dish-causa-limena",
    restaurantId: "restaurant-isolina",
    recommendationText: {
      en: "A generous, home-style causa rather than a delicate restaurant version.",
      es: "Una causa generosa y casera, no una versión delicada de restaurante.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-causa-limena",
    restaurantId: "restaurant-la-mar",
    recommendationText: {
      en: "A lighter seafood causa that works well before ceviche.",
      es: "Una causa marina más ligera que funciona bien antes del ceviche.",
    },
    priority: 2,
  },
  {
    dishId: "dish-aji-de-gallina",
    restaurantId: "restaurant-isolina",
    recommendationText: {
      en: "Thick, walnut-heavy and closer to a home kitchen than a restaurant.",
      es: "Espeso, cargado de nueces y más cercano a una cocina de casa que a un restaurante.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-aji-de-gallina",
    restaurantId: "restaurant-panchita",
    recommendationText: {
      en: "A milder version, good if you are still testing your tolerance for ají.",
      es: "Una versión más suave, buena si todavía estás midiendo tu tolerancia al ají.",
    },
    priority: 2,
  },
  {
    dishId: "dish-pollo-a-la-brasa",
    restaurantId: "restaurant-pardos-chicken",
    recommendationText: {
      en: "The standard against which Peruvians measure every other pollería.",
      es: "El estándar con el que los peruanos miden a cualquier otra pollería.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-tiradito",
    restaurantId: "restaurant-maido",
    recommendationText: {
      en: "The clearest expression of the Japanese technique behind the dish.",
      es: "La expresión más clara de la técnica japonesa detrás del plato.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-tiradito",
    restaurantId: "restaurant-la-mar",
    recommendationText: {
      en: "Easier to get into, and a good side-by-side comparison with their ceviche.",
      es: "Más fácil de conseguir, y una buena comparación lado a lado con su ceviche.",
    },
    priority: 2,
  },
  {
    dishId: "dish-tiradito",
    restaurantId: "restaurant-el-mercado",
    recommendationText: {
      en: "A shorter menu means the fish here changes with what came in that morning.",
      es: "Una carta más corta significa que el pescado cambia con lo que llegó esa mañana.",
    },
    priority: 3,
  },
  {
    dishId: "dish-chifa",
    restaurantId: "restaurant-chifa-titi",
    recommendationText: {
      en: "Three generations of the same recipes, and the version limeños grew up with.",
      es: "Tres generaciones con las mismas recetas, y la versión con la que crecieron los limeños.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-chifa",
    restaurantId: "restaurant-wa-lok",
    recommendationText: {
      en: "Worth it for the location alone: chifa eaten where chifa was invented.",
      es: "Vale la pena solo por la ubicación: chifa comido donde se inventó el chifa.",
    },
    priority: 2,
  },
  {
    dishId: "dish-picarones",
    restaurantId: "restaurant-picarones-mary",
    recommendationText: {
      en: "Fried to order in front of you, which is the only version worth eating.",
      es: "Fritos al momento frente a ti, que es la única versión que vale la pena.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-suspiro-a-la-limena",
    restaurantId: "restaurant-isolina",
    recommendationText: {
      en: "Served in a glass large enough that two people should share one.",
      es: "Servido en una copa lo bastante grande como para que dos personas compartan una.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-suspiro-a-la-limena",
    restaurantId: "restaurant-panchita",
    recommendationText: {
      en: "A slightly lighter meringue, if the classic version is too sweet for you.",
      es: "Un merengue algo más ligero, si la versión clásica te resulta muy dulce.",
    },
    priority: 2,
  },
  {
    dishId: "dish-cuy-al-horno",
    restaurantId: "restaurant-pachapapa",
    recommendationText: {
      en: "Cooked in the clay oven and eaten in the courtyard, which is the whole point.",
      es: "Cocinado en el horno de barro y comido en el patio, que es justamente el punto.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-cuy-al-horno",
    restaurantId: "restaurant-chicha-cusco",
    recommendationText: {
      en: "Served already portioned, which makes it a gentler first encounter.",
      es: "Servido ya porcionado, lo que lo vuelve un primer encuentro más amable.",
    },
    priority: 2,
  },
  {
    dishId: "dish-chicharron-cusqueno",
    restaurantId: "restaurant-quinta-eulalia",
    recommendationText: {
      en: "Breakfast in a garden, exactly as cusqueños have eaten it for generations.",
      es: "Desayuno en un jardín, exactamente como lo han comido los cusqueños por generaciones.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-chicharron-cusqueno",
    restaurantId: "restaurant-pachapapa",
    recommendationText: {
      en: "A more comfortable setting if you are not up for an early market breakfast.",
      es: "Un entorno más cómodo si no estás para un desayuno temprano de mercado.",
    },
    priority: 2,
  },
  {
    dishId: "dish-lechon",
    restaurantId: "restaurant-pachapapa",
    recommendationText: {
      en: "The wood oven runs all day, so the skin is never reheated.",
      es: "El horno de leña trabaja todo el día, así que el cuero nunca se recalienta.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-lechon",
    restaurantId: "restaurant-quinta-eulalia",
    recommendationText: {
      en: "The Sunday version, served outdoors in large portions.",
      es: "La versión de domingo, servida al aire libre en porciones grandes.",
    },
    priority: 2,
  },
  {
    dishId: "dish-alpaca-a-la-parrilla",
    restaurantId: "restaurant-uchu",
    recommendationText: {
      en: "You finish cooking it yourself on the stone, so it never arrives overdone.",
      es: "Terminas de cocinarla tú mismo en la piedra, así que nunca llega pasada.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-alpaca-a-la-parrilla",
    restaurantId: "restaurant-cicciolina",
    recommendationText: {
      en: "Served raw as carpaccio, which suits how lean the meat is.",
      es: "Servida cruda en carpaccio, que le va bien a lo magra que es la carne.",
    },
    priority: 2,
  },
  {
    dishId: "dish-alpaca-a-la-parrilla",
    restaurantId: "restaurant-chicha-cusco",
    recommendationText: {
      en: "A more conventional grilled cut, if you want it plainly cooked.",
      es: "Un corte a la parrilla más convencional, si la quieres cocinada sin vueltas.",
    },
    priority: 3,
  },
  {
    dishId: "dish-trucha-frita",
    restaurantId: "restaurant-cicciolina",
    recommendationText: {
      en: "Trout treated with the same care as the meat dishes, which is unusual here.",
      es: "Trucha tratada con el mismo cuidado que las carnes, lo que aquí es poco común.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-trucha-frita",
    restaurantId: "restaurant-morena",
    recommendationText: {
      en: "A lighter preparation, closer to how it is cooked in the Sacred Valley.",
      es: "Una preparación más ligera, cercana a como se cocina en el Valle Sagrado.",
    },
    priority: 2,
  },
  {
    dishId: "dish-sopa-de-quinua",
    restaurantId: "restaurant-granja-heidi",
    recommendationText: {
      en: "The best thing to eat on your first day at altitude, and very cheap.",
      es: "Lo mejor para comer tu primer día en altura, y muy barato.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-sopa-de-quinua",
    restaurantId: "restaurant-chicha-cusco",
    recommendationText: {
      en: "A refined version, if you want the dish without the daily-menu setting.",
      es: "Una versión refinada, si quieres el plato sin el entorno del menú del día.",
    },
    priority: 2,
  },
  {
    dishId: "dish-choclo-con-queso",
    restaurantId: "restaurant-quinta-eulalia",
    recommendationText: {
      en: "Boiled to order and served hot, the way it is sold at markets.",
      es: "Sancochado al momento y servido caliente, como se vende en los mercados.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-choclo-con-queso",
    restaurantId: "restaurant-granja-heidi",
    recommendationText: {
      en: "Made with cheese from their own farm, which makes a real difference.",
      es: "Hecho con queso de su propia granja, lo que marca una diferencia real.",
    },
    priority: 2,
  },
  {
    dishId: "dish-chiriuchu",
    restaurantId: "restaurant-quinta-eulalia",
    recommendationText: {
      en: "Only during Corpus Christi, and assembled the traditional way.",
      es: "Solo durante el Corpus Christi, y montado a la manera tradicional.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-chiriuchu",
    restaurantId: "restaurant-pachapapa",
    recommendationText: {
      en: "Also seasonal, with a slightly smaller assembly of components.",
      es: "También de temporada, con un montaje algo más reducido de componentes.",
    },
    priority: 2,
  },
  {
    dishId: "dish-ceviche",
    restaurantId: "restaurant-morena",
    recommendationText: {
      en: "The rare Cusco kitchen that flies its fish in daily, which is the only way ceviche works at this altitude.",
      es: "La rara cocina cusqueña que trae su pescado en avión a diario, que es la única forma en que el ceviche funciona a esta altura.",
    },
    priority: 1,
    localPick: true,
  },
  {
    dishId: "dish-chifa",
    restaurantId: "restaurant-kion",
    recommendationText: {
      en: "The Andean branch of the tradition, useful when you have had enough highland food for one trip.",
      es: "La rama andina de la tradición, útil cuando ya comiste suficiente comida de sierra por un viaje.",
    },
    priority: 1,
  },
];

export const dishRestaurants: DishRestaurant[] = entries.map((entry) => ({
  id: `${entry.dishId}--${entry.restaurantId}`,
  dishId: entry.dishId,
  restaurantId: entry.restaurantId,
  recommendationText: entry.recommendationText,
  priority: entry.priority,
  localPick: entry.localPick ?? false,
  isActive: true,
}));
