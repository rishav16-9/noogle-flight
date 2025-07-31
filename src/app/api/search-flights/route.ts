import { searchFlights } from "@/lib/skyScrapeApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const {
    searchParams,
  } = new URL(req.url);

  const originSkyId = searchParams.get("originSkyId");
  const destinationSkyId = searchParams.get("destinationSkyId");
  const originEntityId = searchParams.get("originEntityId");
  const destinationEntityId = searchParams.get("destinationEntityId");
  const cabinClass = searchParams.get("cabinClass") || "economy";
  const adults = parseInt(searchParams.get("adults") || "1", 10);
  const date = searchParams.get("date");
  const returnDate = searchParams.get("returnDate") || undefined;
  const tripType = searchParams.get("tripType") || "oneway";

  if (
    !originSkyId ||
    !destinationSkyId ||
    !originEntityId ||
    !destinationEntityId ||
    !date
  ) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    const flights = await searchFlights({
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      cabinClass,
      adults,
      date,
      returnDate,
      tripType,
    });

    return NextResponse.json(flights);
  } catch (error) {
    console.error("Flight search error:", error);
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 });
  }
}
