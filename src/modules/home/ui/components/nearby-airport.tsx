"use client";
import { useEffect, useState } from "react";
import { Airport, ApiResponse } from "../../nearbyairpots-types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  longitude: number | null;
  latitude: number | null;
}

export const NearbyAirport = ({ longitude, latitude }: Props) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      if (longitude && latitude) {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/nearby-airports?lat=${latitude}&lng=${longitude}`
          );
          const data: ApiResponse = await res.json();
          setAirports(data?.data?.nearby || []);
        } catch (e) {
          console.error("Failed to load airports:", e);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAirports();
  }, [latitude, longitude]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Nearby Airports</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {airports.map((airport) => (
            <Tooltip key={airport.navigation.entityId}>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  className="rounded-full cursor-pointer"
                >
                  <p className="truncate">✈️ {airport.presentation.title}</p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{airport.presentation.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};
