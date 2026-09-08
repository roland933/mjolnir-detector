export type LocationResult = {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  postcode: string;
};

export async function searchLocations(
  location: string
): Promise<LocationResult[]> {
 const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
    location
  )}&limit=20`
);

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  const data = await response.json();

 return data.map((item: any) => ({
  latitude: Number(item.lat),
  longitude: Number(item.lon),
  country: item.address?.country ?? "",
  city:
    item.address?.city ??
    item.address?.town ??
    item.address?.village ??
    item.address?.municipality ??
    "",
  postcode: item.address?.postcode ?? "",
}));
}