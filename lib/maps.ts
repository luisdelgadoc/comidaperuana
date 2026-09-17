import type { Restaurant } from "@/types/content";

/**
 * Google's documented URL scheme. It needs no API key and no billing account,
 * which is why the product links to Maps rather than embedding it.
 *
 * `query_place_id` is preferred when a real place id exists; until then the
 * name plus its district and city is specific enough to land on the right
 * result. Place ids are never invented, so a wrong pin cannot ship.
 */
export function googleMapsUrl(
  place: Restaurant,
  districtName?: string,
  cityName?: string
) {
  const query = [place.name, districtName, cityName, "Peru"]
    .filter(Boolean)
    .join(", ");

  const params = new URLSearchParams({ api: "1", query });
  if (place.googlePlaceId) {
    params.set("query_place_id", place.googlePlaceId);
  }

  return `https://www.google.com/maps/search/?${params.toString()}`;
}
