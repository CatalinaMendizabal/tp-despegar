import {Flight, Hotel} from "@prisma/client";

export interface CreateOfferDTO {
    flightId: number
    flight: Flight
    hotelId: number
    hotel: Hotel
    ammountOfPeople: number
    ammoutOfNights: number
    price: number
    tax: number
}
