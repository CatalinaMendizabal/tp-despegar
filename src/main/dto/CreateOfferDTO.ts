import {Flight} from "@prisma/client";

export interface CreateOfferDTO {
    flightId: number
    flight: Flight
    hotelName: string
    ammountOfPeople: number
    ammoutOfNights: number
    hotelPrice: number
    tax: number
    place: string
}
