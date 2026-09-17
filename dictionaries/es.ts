import type { Dictionary } from "./en";

const es: Dictionary = {
  brand: "Laperuvian.food",
  home: {
    tagline: "Descubre Perú a través de su comida.",
    subtitle:
      "Platos, lugares y experiencias auténticas para que disfrutes lo mejor de la gastronomía peruana en tu viaje.",
    cta: "Comenzar",
    footnote: "Una experiencia gastronómica única.",
  },
  city: {
    step: "Paso 01 / 02",
    question: "¿A qué ciudad vas?",
    subtitle:
      "Elige tu destino en Perú y empieza a explorar su gastronomía.",
    action: "Explorar",
  },
  district: {
    step: "Paso 02 / 02",
    question: "¿En qué zona te hospedas?",
    subtitle: "Esto nos ayudará a recomendarte los mejores lugares cerca de ti.",
    action: "Continuar",
  },
  destination: {
    question: "¿Qué deberías comer en {district}?",
    subtitle:
      "Platos imperdibles, lugares recomendados y todo el sabor del Perú.",
    sectionTitle: "Platos destacados",
    all: "Todos",
    discover: "Descubrir",
  },
  dish: {
    whatIsIt: "¿Qué es?",
    whyTryIt: "Por qué deberías probarlo",
    ingredients: "Ingredientes principales",
    localTip: "Dato local",
    origin: "Origen",
    season: "Temporada",
    bestMoment: "Mejor momento",
    whereTitle: "¿Dónde deberías probarlo?",
    whereSubtitle: "Una lista corta a la que mandaríamos a un amigo de verdad.",
    localPick: "Local pick",
    reviews: "{count} reseñas en Google",
    seeWhy: "Ver por qué",
    noPlaces: "Todavía no hemos elegido un lugar para este plato.",
  },
  place: {
    whyWeRecommend: "¿Por qué lo recomendamos?",
    whatToOrder: "Qué pedir",
    idealFor: "Ideal para",
    ratingOn: "en Google",
    reviews: "{count} reseñas",
    openInMaps: "Ver en Google Maps",
    mapsNote: "Abre Google Maps en una pestaña nueva.",
  },
  menu: {
    open: "Abrir menú",
    close: "Cerrar menú",
    title: "¿A dónde vamos?",
    explore: "Explorar {city}",
    changeDestination: "Cambiar destino",
    about: "Nosotros",
  },
  about: {
    title: "Una guía hecha con criterio, no con ratings.",
    body: "Laperuvian.food existe para responder bien una sola pregunta: estás acá, qué deberías comer y dónde probarlo. Elegimos pocos platos y pocos lugares para cada uno. Google te dice qué es popular. Nosotros te decimos qué vale tu tiempo.",
    back: "Volver a explorar",
  },
  seo: {
    siteTitle: "Laperuvian.food — Descubre Perú a través de su comida",
    siteDescription:
      "Una guía curada de qué deberías comer en Perú y dónde probarlo.",
    dishTitle: "{dish} en Perú: qué es y dónde probarlo",
    placeTitle: "{place}, {district} — por qué lo recomendamos",
    destinationTitle: "Qué comer en {district}, {city}",
    exploreTitle: "¿A qué ciudad vas?",
    aboutTitle: "Sobre Laperuvian.food",
  },
  loading: {
    label: "Cargando",
  },
  common: {
    back: "Volver",
    walk: "A ~{minutes} min",
    distance: "A {km} km",
  },
};

export default es;
