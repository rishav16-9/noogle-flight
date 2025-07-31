"use client";
import Image from "next/image";
import { useState } from "react";
import { FlightForm } from "../components/flight-form";
import { NearbyAirport } from "../components/nearby-airport";
import { useLocation } from "@/hooks/use-location";
import { Root } from "../../searchflights-types";
import { FlightCard } from "../components/flight-card";

export const FlightView = () => {
  const { longitude, latitude } = useLocation();
  const display = longitude && latitude;
  const dummyResults: Root = {
    status: true,
    timestamp: Date.now(),
    sessionId: "dummy-session-id",
    data: {
      context: {
        status: "success",
        totalResults: 2,
      },
      itineraries: [
        // One-way flight: NYC to London
        {
          id: "itinerary_1",
          price: {
            raw: 450.99,
            formatted: "$450",
          },
          legs: [
            {
              id: "leg_1",
              origin: {
                id: "JFK",
                name: "John F. Kennedy International",
                displayCode: "JFK",
                city: "New York",
                isHighlighted: true,
              },
              destination: {
                id: "LHR",
                name: "Heathrow Airport",
                displayCode: "LHR",
                city: "London",
                isHighlighted: true,
              },
              durationInMinutes: 420,
              stopCount: 0,
              isSmallestStops: true,
              departure: "2025-08-05T08:00:00",
              arrival: "2025-08-05T20:00:00",
              timeDeltaInDays: 0,
              carriers: {
                marketing: [
                  {
                    id: 100,
                    name: "British Airways",
                    logoUrl:
                      "https://upload.wikimedia.org/wikipedia/commons/2/2a/British_Airways_Logo.svg",
                  },
                ],
                operationType: "direct",
              },
              segments: [],
            },
          ],
          isSelfTransfer: false,
          isProtectedSelfTransfer: false,
          farePolicy: {
            isChangeAllowed: true,
            isPartiallyChangeable: true,
            isCancellationAllowed: false,
            isPartiallyRefundable: true,
          },
          tags: [],
          isMashUp: false,
          hasFlexibleOptions: true,
          score: 85.6,
        },

        // Round-trip: San Francisco <-> Tokyo
        {
          id: "itinerary_2",
          price: {
            raw: 975.5,
            formatted: "$975",
          },
          legs: [
            // Outbound
            {
              id: "leg_2a",
              origin: {
                id: "SFO",
                name: "San Francisco International",
                displayCode: "SFO",
                city: "San Francisco",
                isHighlighted: true,
              },
              destination: {
                id: "NRT",
                name: "Narita International Airport",
                displayCode: "NRT",
                city: "Tokyo",
                isHighlighted: true,
              },
              durationInMinutes: 660,
              stopCount: 1,
              isSmallestStops: true,
              departure: "2025-08-10T10:30:00",
              arrival: "2025-08-11T14:30:00",
              timeDeltaInDays: 1,
              carriers: {
                marketing: [
                  {
                    id: 200,
                    name: "Japan Airlines",
                    logoUrl:
                      "https://upload.wikimedia.org/wikipedia/en/f/fc/Japan_Airlines_logo.svg",
                  },
                ],
                operationType: "one-stop",
              },
              segments: [],
            },
            // Return
            {
              id: "leg_2b",
              origin: {
                id: "NRT",
                name: "Narita International Airport",
                displayCode: "NRT",
                city: "Tokyo",
                isHighlighted: true,
              },
              destination: {
                id: "SFO",
                name: "San Francisco International",
                displayCode: "SFO",
                city: "San Francisco",
                isHighlighted: true,
              },
              durationInMinutes: 660,
              stopCount: 1,
              isSmallestStops: true,
              departure: "2025-08-20T17:00:00",
              arrival: "2025-08-20T09:00:00",
              timeDeltaInDays: 0,
              carriers: {
                marketing: [
                  {
                    id: 200,
                    name: "Japan Airlines",
                    logoUrl:
                      "https://upload.wikimedia.org/wikipedia/en/f/fc/Japan_Airlines_logo.svg",
                  },
                ],
                operationType: "one-stop",
              },
              segments: [],
            },
          ],
          isSelfTransfer: false,
          isProtectedSelfTransfer: false,
          farePolicy: {
            isChangeAllowed: true,
            isPartiallyChangeable: true,
            isCancellationAllowed: true,
            isPartiallyRefundable: true,
          },
          tags: ["round-trip"],
          isMashUp: false,
          hasFlexibleOptions: true,
          score: 91.2,
        },
      ],
      filterStats: {
        duration: {
          min: 420,
          max: 660,
        },
        airports: [],
        carriers: [],
        stopPrices: {
          direct: {
            isPresent: true,
            formattedPrice: "$450",
          },
          one: {
            isPresent: true,
            formattedPrice: "$975",
          },
          twoOrMore: {
            isPresent: false,
            // formattedPrice: "",
          },
        },
      },
    },
  };

  const [results, setResults] = useState<Root | null>(dummyResults);

  return (
    <div className="max-w-7xl w-full px-4 mx-auto mb-10 pb-2.5 flex flex-col gap-y-6 justify-center">
      <div className="relative text-center">
        <Image
          src="/flight.svg"
          alt="flight"
          width={0}
          height={0}
          className="w-full h-full"
        />
        <span className="absolute top-3/4 left-2/4 transform -translate-x-1/2  text-xl lg:text-4xl font-semibold ">
          Flight
        </span>
      </div>

      <FlightForm onSearchResult={setResults} />

      {/* {results && (
        <div className="mt-6 border rounded-xl p-4 bg-white shadow">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )} */}

      {results &&
        results.data &&
        results.data.itineraries.length > 0 &&
        results.data.itineraries.map((itinerary) => (
          <FlightCard key={itinerary.id} itinerary={itinerary} />
        ))}

      {display && <NearbyAirport longitude={longitude} latitude={latitude} />}
    </div>
  );
};
