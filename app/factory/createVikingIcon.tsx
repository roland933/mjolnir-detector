import L from "leaflet";
import { MarkerType } from "../types/marker.type";

type Props = {
  type: MarkerType;
};

export function createVikingIcon({ type }: Props) {
  const colors = {
    undiscovered: {
      main: "#94a3b8",
      glow: "none",
    },
    signal: {
      main: "#38bdf8",
      glow: "drop-shadow(0 0 3px rgba(56,189,248,0.55))",
    },
    discovered: {
      main: "#22d3ee",
      glow: "drop-shadow(0 0 3px rgba(34,211,238,0.5))",
    },
    mjolnir: {
      main: "#fbbf24",
      glow: "drop-shadow(0 0 4px rgba(251,191,36,0.6))",
    },
  };

  const { main, glow } = colors[type];

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: ${glow};
        "
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <!-- dark backing -->
          <circle
            cx="14"
            cy="14"
            r="12"
            fill="#080b0e"
            fill-opacity=".92"
          />

          <!-- outer ring -->
          <circle
            cx="14"
            cy="14"
            r="10.5"
            stroke="${main}"
            stroke-width="1"
            stroke-opacity=".75"
          />

          <!-- Norse diamond -->
          <path
            d="M14 5.5 L21 14 L14 22.5 L7 14 Z"
            stroke="${main}"
            stroke-width="1.5"
            stroke-linejoin="round"
          />

          <!-- center -->
          <circle
            cx="14"
            cy="14"
            r="2"
            fill="${main}"
          />
        </svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}