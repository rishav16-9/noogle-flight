import { ApiResponse } from "@/modules/home/nearbyairpots-types";
import { axiosInstance } from "./axiosInstance";
import { SearchAirportApiResponse } from "@/modules/home/searchairports-types";
import { Root } from "@/modules/home/searchflights-types";

export const getNearbyAirports = async (
  lat: string,
  lng: string
): Promise<ApiResponse> => {
  const response = await axiosInstance.get("/flights/getNearByAirports", {
    params: {
      lat,
      lng,
      locale: "en-US",
    },
  });
  return response.data;
};

export const fetchAirportData = async (
  query: string
): Promise<SearchAirportApiResponse> => {
  try {
    
    const response = await axiosInstance.get("/flights/searchAirport", {
      params: {
        query: query,
        locale: "en-US",
      },
    });
    return response.data;
  } catch  {
    return {
      status: false,
      timestamp: 0,
      data: [],
    };
  }
};

interface SearchFlightsParams {
  originSkyId: string;
  originEntityId: string;
  destinationSkyId: string;
  destinationEntityId: string;
  cabinClass: string;
  adults: number;
  date: string;
  returnDate?: string;
  tripType: string;
  currency?: string;
  locale?: string;
  market?: string;
}

export const searchFlights = async ({
  originSkyId,
  originEntityId,
  destinationSkyId,
  destinationEntityId,
  cabinClass,
  adults,
  date,
  returnDate,
  tripType,
  currency = "USD",
  locale = "en-US",
  market = "US",
}: SearchFlightsParams): Promise<Root> => {
  const params: Record<string, string> = {
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    cabinClass,
    adults: adults.toString(),
    date,
    currency,
    locale,
    market,
  };

  if (tripType === "roundtrip" && returnDate) {
    params.returnDate = returnDate;
  }

  const { data } = await axiosInstance.get<Root>("/flights/searchFlights", {
    params,
  });

  return data;
};
