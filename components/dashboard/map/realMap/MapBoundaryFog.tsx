import { Polygon } from "react-leaflet";

const MAP_BOUNDS = {
  south: 45,
  west: -70,
  north: 80,
  east: 40,
};

export function MapBoundaryFog() {
  const { south, west, north, east } = MAP_BOUNDS;

  const fog = 5;

  return (
    <>
      {/* North */}
      <Polygon
        positions={[
          [north - fog, west],
          [north, west],
          [north, east],
          [north - fog, east],
        ]}
        pathOptions={{
          stroke: false,
          fillColor: "#080b0e",
          fillOpacity: 0.22,
          interactive: false,
        }}
      />

      {/* South */}
      <Polygon
        positions={[
          [south, west],
          [south + fog, west],
          [south + fog, east],
          [south, east],
        ]}
        pathOptions={{
          stroke: false,
          fillColor: "#080b0e",
          fillOpacity: 0.22,
          interactive: false,
        }}
      />

      {/* West */}
      <Polygon
        positions={[
          [south, west],
          [north, west],
          [north, west + fog],
          [south, west + fog],
        ]}
        pathOptions={{
          stroke: false,
          fillColor: "#080b0e",
          fillOpacity: 0.22,
          interactive: false,
        }}
      />

      {/* East */}
      <Polygon
        positions={[
          [south, east - fog],
          [north, east - fog],
          [north, east],
          [south, east],
        ]}
        pathOptions={{
          stroke: false,
          fillColor: "#080b0e",
          fillOpacity: 0.22,
          interactive: false,
        }}
      />
    </>
  );
}