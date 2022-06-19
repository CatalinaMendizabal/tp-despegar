import {Flight} from '@prisma/client';
import {Context} from '../../../config/context';
import {CreateFlightDTO} from "../dto/CreateFlightDTO";
import {create} from "domain";

export default class FlightService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createFlight = async (flight: CreateFlightDTO): Promise<Flight> => {
        return await this.ctx.prisma.flight.create({
            data: {
                company: flight.company,
                departureHour: flight.departureHour,
                arrivalHour: flight.arrivalHour,
                departurePlace: flight.departurePlace,
                price: flight.price,
                arrivalPlace: flight.arrivalPlace,
                luggage: flight.luggage,
                type: flight.type,
                offer: {
                        create: []
                }
            }
        })
    }

    getFlights = async (): Promise<Flight[]> => {
        return await this.ctx.prisma.flight.findMany({})
    }

    getFlight = async (id: number): Promise<Flight | null> => {
        return await this.ctx.prisma.flight.findFirst({
            where: {
                id: Number(id)
            }
        });
    }

    deleteFlight = async (id: number): Promise<Flight> => {
        return await this.ctx.prisma.flight.delete({
            where: {
                id: Number(id)
            }
        });
    }

    deleteAllFlights = async (): Promise<BatchPayload> => {
        return await this.ctx.prisma.flight.deleteMany({})
    }
}

type BatchPayload = {
    count: number
}
