import { fetchAirportData } from "@/lib/skyScrapeApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const data = await fetchAirportData(query);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API error ", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby airports" },
      { status: 500 }
    );
  }
}
