import type { ImageAsset, LocalizedText } from "@/types/content";

const UNSPLASH = "https://images.unsplash.com/photo-";
const PEXELS = "https://images.pexels.com/photos/";

function unsplash(id: string, alt: LocalizedText): ImageAsset {
  return { url: `${UNSPLASH}${id}`, alt };
}

/**
 * Pexels carries the actual Peruvian dishes that Unsplash simply does not have
 * — searching Unsplash for "picarones" returns nothing at all. Its licence
 * allows commercial use with no attribution, and it honours the same width
 * parameter, so the components need no special case.
 */
function pexels(id: string, alt: LocalizedText): ImageAsset {
  return { url: `${PEXELS}${id}/pexels-photo-${id}.jpeg`, alt };
}

/**
 * Placeholder photography, replaced with commissioned work in Phase 11.
 * Every id was verified to return HTTP 200, and the dish photos were opened and
 * looked at rather than trusted from their captions.
 *
 * Entries marked APPROXIMATE still do not show the real dish and are the next
 * ones to replace. They survive because no free-licence photograph of them
 * appears to exist: cuy, alpaca and chiriuchu return nothing usable anywhere.
 */
export const images = {
  dishes: {
    ceviche: unsplash("1761314036615-f1a9e69514d3", {
      en: "Ceviche served with fried calamari and Peruvian corn",
      es: "Ceviche servido con calamar frito y choclo peruano",
    }),
    lomoSaltado: pexels("28503597", {
      en: "Beef saltado with red onion and tomato, served with fries and rice",
      es: "Lomo saltado con cebolla morada y tomate, servido con papas y arroz",
    }),
    anticuchos: unsplash("1535400255456-984241443b29", {
      en: "Grilled skewered meat brushed with sauce",
      es: "Brochetas de carne a la parrilla bañadas en salsa",
    }),
    causaLimena: pexels("28448382", {
      en: "Causa limeña: layered yellow potato with filling, egg and olive",
      es: "Causa limeña: papa amarilla en capas con relleno, huevo y aceituna",
    }),
    ajiDeGallina: pexels("6763278", {
      en: "Ají de gallina in a clay bowl with egg and olives",
      es: "Ají de gallina en olla de barro con huevo y aceitunas",
    }),
    polloALaBrasa: unsplash("1606728035253-49e8a23146de", {
      en: "Whole charcoal-roasted chicken with golden crisp skin",
      es: "Pollo entero asado al carbón con piel dorada y crocante",
    }),
    picarones: pexels("36596812", {
      en: "Street vendor frying picarones over charcoal in Peru",
      es: "Vendedora friendo picarones al carbón en la calle, en Perú",
    }),
    tiradito: unsplash("1766456127047-806cdecdc139", {
      en: "Thin slices of raw fish served with corn and greens",
      es: "Láminas finas de pescado crudo servidas con choclo y verdes",
    }),
    chifa: pexels("17025344", {
      en: "Arroz chaufa with ají amarillo, lime and cancha alongside",
      es: "Arroz chaufa acompañado de ají amarillo, limón y cancha",
    }),
    suspiroALaLimena: unsplash("1768203635611-c8542d3d1c6f", {
      en: "Layered creamy caramel dessert topped with meringue",
      es: "Postre cremoso de manjar en capas coronado con merengue",
    }),
    // APPROXIMATE: grilled meat platter standing in for cuy
    cuyAlHorno: unsplash("1783267486563-9da06659df74", {
      en: "Andean roasted meat served with vegetables",
      es: "Carne andina al horno servida con verduras",
    }),
    // APPROXIMATE: sliced red meat standing in for alpaca
    alpacaALaParrilla: unsplash("1746718547546-7111b8cc3f7a", {
      en: "Sliced grilled red meat plated simply",
      es: "Carne roja a la parrilla en láminas, emplatada con sencillez",
    }),
    chicharronCusqueno: unsplash("1785735011447-9942c0ba0b13", {
      en: "Slices of crispy roasted pork belly",
      es: "Láminas de panza de cerdo asada y crocante",
    }),
    lechon: unsplash("1775572761893-c67c76dcee91", {
      en: "Thinly sliced slow-roasted pork",
      es: "Cerdo asado lentamente y cortado en láminas finas",
    }),
    truchaFrita: unsplash("1551014700-0ca41391f312", {
      en: "Whole trout grilled over open flame",
      es: "Trucha entera a la parrilla sobre fuego abierto",
    }),
    // INGREDIENT SHOT, not the dish: red quinoa in an Andean woven cloth.
    // Chosen over a generic pan of vegetables because it is at least truthful.
    sopaDeQuinua: pexels("32407761", {
      en: "Red quinoa in a woven Andean cloth, with oca and broad beans",
      es: "Quinua roja en un tejido andino, con oca y habas",
    }),
    chocloConQueso: unsplash("1632913582499-381c7c798787", {
      en: "Basket of multicoloured Andean corn varieties",
      es: "Canasta con variedades de maíz andino de colores",
    }),
    // APPROXIMATE: a composed plate of several elements, standing in for the
    // real chiriuchu, which combines a dozen components from different regions.
    chiriuchu: unsplash("1759670338079-8633e15653f2", {
      en: "Cold Cusco platter combining several regional preparations",
      es: "Plato frío cusqueño que combina varias preparaciones regionales",
    }),
  },

  cities: {
    lima: unsplash("1585318822499-a5a2aa250b4b", {
      en: "Aerial view of Lima stretching along the Pacific coast",
      es: "Vista aérea de Lima extendiéndose sobre la costa del Pacífico",
    }),
    limaSelection: unsplash("1577587230708-187fdbef4d91", {
      en: "Lima seen from the coast on a clear day",
      es: "Lima vista desde la costa en un día despejado",
    }),
    cusco: unsplash("1589260133321-6d4cc4a4799e", {
      en: "Aerial view of Cusco's rooftops in the Andes",
      es: "Vista aérea de los techos de Cusco en los Andes",
    }),
    cuscoSelection: unsplash("1557767153-2bdfeccd5224", {
      en: "Cusco's cathedral on the Plaza de Armas",
      es: "La catedral de Cusco en la Plaza de Armas",
    }),
  },

  districts: {
    miraflores: unsplash("1531968455001-5c5272a41129", {
      en: "Miraflores clifftops overlooking the Pacific",
      es: "Los acantilados de Miraflores sobre el Pacífico",
    }),
    barranco: unsplash("1568805647297-df963b524678", {
      en: "Colourful colonial houses in Barranco",
      es: "Casas coloniales de colores en Barranco",
    }),
    sanIsidro: unsplash("1580844867519-adaa6fdfd872", {
      en: "Tree-lined pedestrian streets in San Isidro",
      es: "Calles peatonales arboladas en San Isidro",
    }),
    centroDeLima: unsplash("1580530719837-952e0515b69a", {
      en: "Colonial facade in the historic centre of Lima",
      es: "Fachada colonial en el centro histórico de Lima",
    }),
    cuscoCentroHistorico: unsplash("1593494441374-bad54249d0e8", {
      en: "Stone streets in the historic centre of Cusco",
      es: "Calles de piedra en el centro histórico de Cusco",
    }),
    sanBlas: unsplash("1526697675318-89790adec369", {
      en: "Terracotta houses climbing the hillside in San Blas",
      es: "Casas de teja trepando la ladera en San Blas",
    }),
  },

  restaurants: [
    unsplash("1667388969250-1c7220bf3f37", {
      en: "Dining room with tables set for service",
      es: "Comedor con mesas dispuestas para el servicio",
    }),
    unsplash("1551632436-cbf8dd35adfa", {
      en: "Warm dining room with wooden furniture",
      es: "Comedor cálido con mobiliario de madera",
    }),
    unsplash("1613274554329-70f997f5789f", {
      en: "Contemporary dining area in white and wood",
      es: "Área de comedor contemporánea en blanco y madera",
    }),
    unsplash("1538334421852-687c439c92f4", {
      en: "Inviting wooden tables under soft light",
      es: "Mesas de madera acogedoras bajo luz suave",
    }),
    unsplash("1636405189493-181ecf851006", {
      en: "Dining room with abundant greenery",
      es: "Comedor con abundante vegetación",
    }),
    unsplash("1538333581680-29dd4752ddf2", {
      en: "Atmospheric dining room with ambient lighting",
      es: "Comedor de ambiente íntimo con iluminación cálida",
    }),
    unsplash("1709548145082-04d0cde481d4", {
      en: "Moody restaurant interior with low lighting",
      es: "Interior de restaurante con iluminación tenue",
    }),
    unsplash("1682778418768-16081e4470a1", {
      en: "Spacious restaurant with warm wooden furniture",
      es: "Restaurante amplio con mobiliario de madera cálida",
    }),
  ],
} as const;
