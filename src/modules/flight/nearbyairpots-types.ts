export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

export interface Airport {
  presentation: Presentation;
  navigation: Navigation;
}

export interface ApiResponse {
  status: boolean;
  timestamp: number;
  data: {
    current: Airport;
    nearby: Airport[];
    recent: unknown[]; // Or type if known
  };
}
