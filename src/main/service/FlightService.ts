import {Flight} from '@prisma/client';
import {Context} from '../../../config/context';

export default class FlightService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createFlight = async (flight: Flight): Promise<Flight> => {
        return await this.ctx.prisma.flight.create({
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
        return await this.ctx.prisma.flight.findMany({
            include: {
                product: true,
            }
        })
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
