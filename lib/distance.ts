const EARTH_RADIUS_KM = 6371;

/** Straight-line distance underestimates real streets; this is the usual correction. */
const STREET_FACTOR = 1.3;
const WALKING_KMH = 4.5;

/** Past this, nobody walks. Showing "~51 min" is technically true and useless. */
const WALKABLE_LIMIT_MINUTES = 25;

type Point = { latitude?: number; longitude?: number };

export type Proximity =
  | { kind: "walk"; minutes: number }
  | { kind: "distance"; km: number };

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

/**
 * Estimated locally, never via Google Distance Matrix: that is a paid API, and
 * the specification forbids requesting GPS anyway, so the origin is only ever a
 * district centre and false precision would be dishonest.
 *
 * Returns null when either point lacks coordinates, so the caller omits the
 * figure instead of printing a wrong one.
 */
export function proximityBetween(from: Point, to: Point): Proximity | null {
  if (
    from.latitude === undefined ||
    from.longitude === undefined ||
    to.latitude === undefined ||
    to.longitude === undefined
  ) {
    return null;
  }

  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(dLon / 2) ** 2;

  const straightKm =
    EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = straightKm * STREET_FACTOR;
  const minutes = Math.round((km / WALKING_KMH) * 60);

  if (minutes > WALKABLE_LIMIT_MINUTES) {
    return { kind: "distance", km: Math.round(km * 10) / 10 };
  }

  return { kind: "walk", minutes: Math.max(minutes, 1) };
}
