import {Flight} from '@prisma/client';
import {create} from "domain";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

export default class FlightService {

    createFlight = async (flight: Flight): Promise<Flight> => {

        return await prisma.flight.create({
            data: {
                id: flight.id,
                company: flight.company,
                departureHour: flight.departureHour,
                arrivalHour: flight.arrivalHour,
                luggage: flight.luggage,
                type: flight.type,
                productId: flight.productId,
            }
        })
    }

    getFlights = async (): Promise<Flight[]> => {
        return await prisma.flight.findMany({
            include: {
                product: true,
            }
        })
    }

    deleteAllFlights = async (): Promise<Flight[]> => {
        return await prisma.flight.deleteMany({})
    }
}
