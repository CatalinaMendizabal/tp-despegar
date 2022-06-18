import { ClassType, Luggage } from "@prisma/client"


export interface CreateFlightDTO {
    company: string
    departureHour: Date
    arrivalHour: Date
    departurePlace: string
    arrivalPlace: string
    luggage: Luggage[]
    type: ClassType
}


export interface FlightDTO {
    id: number
    company: string
    departureHour: Date
    arrivalHour: Date
    departurePlace: string
    arrivalPlace: string
    luggage: Luggage[]
    type: ClassType
}

