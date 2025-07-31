import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { format } from "date-fns";
import { Itinerary } from "../../searchflights-types";
import Image from "next/image";

interface Props {
  itinerary: Itinerary;
}

export const FlightCard = ({ itinerary }: Props) => {
  const getTime = (dateStr: string) => format(new Date(dateStr), "hh:mm a");
  const getDate = (dateStr: string) =>
    format(new Date(dateStr), "dd MMM, yyyy");

  return (
    <Card className="w-full shadow-md rounded-2xl border p-4 space-y-4">
      {itinerary.legs.map((leg) => (
        <div
          key={leg.id}
          className="flex flex-col md:flex-row items-center gap-4 border-b pb-4"
        >
          {/* Airport + Time Section */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span>{leg.origin.displayCode}</span>
              <ArrowRightIcon className="w-4 h-4" />
              <span>{leg.destination.displayCode}</span>
            </div>
            <div className="text-sm text-gray-500">
              {getDate(leg.departure)}
            </div>
            <div className="text-sm text-gray-700">
              {getTime(leg.departure)} → {getTime(leg.arrival)}
            </div>
          </div>

          {/* Airline */}
          <div className="flex-1 text-sm">
            <div className="font-medium">Airline:</div>
            <div className="flex items-center gap-2 flex-wrap">
              {leg.carriers.marketing.map((carrier) => (
                <div key={carrier.id} className="flex items-center gap-2">
                  <Image
                    src={carrier.logoUrl}
                    alt={carrier.name}
                    className="w-5 h-5"
                  />
                  <span>{carrier.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stops */}
          <div className="flex-1 text-center">
            <Badge variant={leg.stopCount === 0 ? "default" : "outline"}>
              {leg.stopCount === 0
                ? "Non-stop"
                : `${leg.stopCount} stop${leg.stopCount > 1 ? "s" : ""}`}
            </Badge>
            <div className="text-xs text-gray-500 mt-1">
              Duration: {Math.floor(leg.durationInMinutes / 60)}h{" "}
              {leg.durationInMinutes % 60}m
            </div>
          </div>
        </div>
      ))}

      {/* Price Section */}
      <CardContent className="pt-2 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">Total price</span>
          <div className="text-xl font-bold">{itinerary.price.formatted}</div>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          Book Now
        </button>
      </CardContent>
    </Card>
  );
};
