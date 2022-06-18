import {FlightDTO} from "./CreateFlightDTO";
import {CreateOfferDTO} from "./CreateOfferDTO";

export interface CartDTO {
    userId: number
    flights: FlightDTO[]
    offers: CreateOfferDTO[]
}
