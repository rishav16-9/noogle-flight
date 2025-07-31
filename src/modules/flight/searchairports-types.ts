export interface SearchAirportApiResponse {
  status: boolean
  timestamp: number
  data: Daum[]
}

export interface Daum {
  presentation: Presentation
  navigation: Navigation
}

export interface Presentation {
  title: string
  suggestionTitle: string
  subtitle: string
}

export interface Navigation {
  entityId: string
  entityType: string
  localizedName: string
  relevantFlightParams: RelevantFlightParams
  relevantHotelParams: RelevantHotelParams
}

export interface RelevantFlightParams {
  skyId: string
  entityId: string
  flightPlaceType: string
  localizedName: string
}

export interface RelevantHotelParams {
  entityId: string
  entityType: string
  localizedName: string
}
