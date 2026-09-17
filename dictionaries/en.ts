const en = {
  brand: "ComidaPeruana",
  home: {
    tagline: "Discover Peru through its food.",
    subtitle:
      "The dishes, places and local flavors worth discovering during your trip.",
    cta: "Start exploring",
    footnote: "Curated for travelers.",
  },
  city: {
    step: "Step 01 / 02",
    question: "Where are you going?",
    subtitle:
      "Choose your destination and we'll show you what is worth eating there.",
    action: "Explore",
  },
  district: {
    step: "Step 02 / 02",
    question: "Where are you staying?",
    subtitle: "We'll prioritise great food close to you.",
    action: "Continue",
  },
  destination: {
    question: "What should you eat in {district}?",
    subtitle:
      "Unmissable dishes, recommended places and the flavours worth your time.",
    sectionTitle: "Featured dishes",
    all: "All",
    discover: "Discover",
  },
  dish: {
    whatIsIt: "What is it?",
    whyTryIt: "Why you should try it",
    ingredients: "Main ingredients",
    localTip: "Local tip",
    origin: "Origin",
    season: "Season",
    bestMoment: "Best moment",
    whereTitle: "Where should you try it?",
    whereSubtitle: "A short list we would actually send a friend to.",
    localPick: "Local pick",
    reviews: "{count} reviews on Google",
    seeWhy: "See why",
    noPlaces: "We have not picked a place for this dish yet.",
  },
  place: {
    whyWeRecommend: "Why we recommend it",
    whatToOrder: "What to order",
    idealFor: "Ideal for",
    ratingOn: "on Google",
    reviews: "{count} reviews",
    openInMaps: "Open in Google Maps",
    mapsNote: "Opens Google Maps in a new tab.",
  },
  menu: {
    open: "Open menu",
    close: "Close menu",
    title: "Where to?",
    explore: "Explore {city}",
    changeDestination: "Change destination",
    about: "About",
  },
  about: {
    title: "A guide built on judgement, not ratings.",
    body: "ComidaPeruana exists to answer one question well: you are here, what should you eat and where should you try it. We pick a small number of dishes and a small number of places for each one. Google tells you what is popular. We tell you what is worth your time.",
    back: "Back to exploring",
  },
  seo: {
    siteTitle: "ComidaPeruana — Discover Peru through its food",
    siteDescription:
      "A curated guide to what you should eat in Peru and where to try it.",
    dishTitle: "{dish} in Peru: what it is and where to try it",
    placeTitle: "{place}, {district} — why we recommend it",
    destinationTitle: "What to eat in {district}, {city}",
    exploreTitle: "Where are you going?",
    aboutTitle: "About ComidaPeruana",
  },
  loading: {
    label: "Loading",
  },
  common: {
    back: "Back",
    walk: "~{minutes} min away",
    distance: "{km} km away",
  },
};

export type Dictionary = typeof en;

export default en;
