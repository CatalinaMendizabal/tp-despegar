import {Flight} from "@prisma/client";

export interface CreateOfferDTO {
    flightId: number
    flight: Flight
    hotelId: number
    ammountOfPeople: number
    ammoutOfNights: number
    price: number
    tax: number
    place: string
}
