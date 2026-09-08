"use client";

import { ScanAreaType } from "@/app/types/scan.area";
import { useEffect, useState } from "react";
import { ScanStatus } from "@/app/types/scan.status";
import { Coordinates } from "../scan-area/coordinates";
import { Title } from "../scan-area/title";
import { Background } from "../scan-area/background";
import { LocationResult, searchLocations } from "@/app/lib/geocoding";
import { RadiusSlider } from "../scan-area/radius";

type Props = {
  scanArea: ScanAreaType;
  scanStatus: ScanStatus;
  onRadiusChange: (radius: number) => void;
  onLocationSearch: (location: LocationResult) => void;
  onScan: () => void;
};

export function ScanArea({
  scanArea,
  onRadiusChange,
  onScan,
  scanStatus,
  onLocationSearch
}: Props) {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (!location.trim()) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        setSearchError(null);
        const results = await searchLocations(location);



        setSuggestions(results);

        if (results.length === 0) {
          setSearchError("No locations found");
        }

      } catch (error) {
        console.error(error);
        setSuggestions([]);
        setSearchError("Location search failed");
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <section className="z-50 relative mb-3  rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-4">
      <Background />

      <div className="relative flex flex-wrap items-center gap-6">

        <Title />

        <Coordinates scanArea={scanArea} />

        <div className="relative min-w-[260px] flex-1">
          <div className="flex items-center gap-1">
            <img src="/icons/search.png" className="h-6 w-6 object-contain" />

            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              Location
            </span>
          </div>

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && location.trim()) {
                onLocationSearch(location.trim());
              }
            }}
            placeholder="Search location..."
            className="mt-1 w-full border-b border-slate-700 bg-transparent py-1 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-400"
          />


          {(suggestions.length > 0 || searchError) && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
              {searching && (
                <div className="px-3 py-3 text-xs text-slate-500">
                  Searching...
                </div>
              )}

              {!searching &&
                suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.latitude}-${suggestion.longitude}-${index}`}
                    type="button"
                    onClick={() => {
                      setLocation(suggestion.country + '-' + suggestion.city)
                      setSuggestions([]);
                      setSearchError(null);

                      onLocationSearch(suggestion);
                    }}
                    className="block w-full border-b border-slate-800 px-3 py-2 text-left transition last:border-b-0 hover:bg-slate-800"
                  >
                    <p className="text-xs text-slate-300">
                      {suggestion.country}
                      {suggestion.city && ` · ${suggestion.city}`}
                      {suggestion.postcode && ` · ${suggestion.postcode}`}
                    </p>
                  </button>
                ))}

              {!searching && searchError && (
                <div className="px-3 py-3 text-xs text-slate-500">
                  {searchError}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Radius */}
        <RadiusSlider scanArea={scanArea} onRadiusChange={onRadiusChange} />

        {/* Start Scan */}
        <button
          style={{ fontFamily: "var(--font-norse)" }}
          onClick={onScan}
          disabled={scanStatus === "scanning" || scanStatus === "analyzing"}
          className="flex w-42  items-center gap-2 rounded-lg border border-sky-500/40 hover:cursor-pointer bg-sky-500/10 px-4 py-3 text-md font-semibold uppercase tracking-wider text-sky-400 transition hover:border-sky-400 hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src="/icons/start_scan.png" className="h-7 w-7 object-contain" />
          {scanStatus === "scanning"
            ? "Scanning..."
            : scanStatus === "analyzing"
              ? "Analyzing..."
              : "Start Scan"}
        </button>
      </div>
    </section>
  );
}
