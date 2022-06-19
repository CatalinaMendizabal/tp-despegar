import {FlightDTO} from "./CreateFlightDTO";

export interface CartDTO {
    userId: number
    flights: FlightDTO[]
}
