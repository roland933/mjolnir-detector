import { VIKING_LOCATIONS } from "@/app/data/viking.locations";
import { createVikingIcon } from "@/app/factory/createVikingIcon";
import { Circle, Marker } from "react-leaflet";

export function VikingLocationMarker({discoveredLocations,nearbyLocation,signalStrength,scanStatus}) {
    return (
      <>
        {VIKING_LOCATIONS
        .filter((location) => discoveredLocations.has(location.name))
        .map((location) => {
          const type = location.isMjolnir ? "mjolnir" : "discovered";
       return <Marker
            key={`discovered-${location.name}`}
            position={[location.latitude, location.longitude]}
            icon={createVikingIcon({ type: type})}
          />
      })}


        {nearbyLocation &&
                signalStrength !== "none" &&
                !discoveredLocations.has(nearbyLocation.name) && (
                     <>
                    <Marker
                        key={nearbyLocation.name}
                        position={[
                        nearbyLocation.latitude,
                        nearbyLocation.longitude,
                        ]}
                        icon={createVikingIcon({ type: "undiscovered" })}
                    />

                        {scanStatus === "analyzing" && (
                            <Circle
                              center={[
                                nearbyLocation.latitude,
                                nearbyLocation.longitude,
                              ]}
                              radius={12000}
                              pathOptions={{
                                color: "#38bdf8",
                                weight: 2,
                                opacity: 0.7,
                                fillColor: "#38bdf8",
                                fillOpacity: 0.08,
                                className: "analyzing-marker",
                              }}
                            />
                          )}
                          </>
                    )}
</>
)
   
}