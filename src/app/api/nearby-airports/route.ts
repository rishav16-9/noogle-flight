import { getNearbyAirports } from "@/lib/skyScrapeApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing lat or lng parameters" },
      { status: 400 }
    );
  }

  try {
    const data = await getNearbyAirports(lat, lng);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API error (getNearbyAirports):", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby airports" },
      { status: 500 }
    );
  }
}
