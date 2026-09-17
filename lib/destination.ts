import "server-only";
import { cookies } from "next/headers";

export const DESTINATION_COOKIE = "cp-destination";

export type Destination = { city: string; district: string };

export async function getDestination(): Promise<Destination | null> {
  const value = (await cookies()).get(DESTINATION_COOKIE)?.value;
  if (!value) return null;

  const [city, district] = value.split("/");
  if (!city || !district) return null;

  return { city, district };
}
