import {Offer} from '@prisma/client';
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

export default class OfferService {

    createOffer = async (offer: Offer): Promise<Offer> => {

        return await prisma.offer.create({
            data: {
                id: offer.id,
                company: offer.company,
                departureHour: offer.departureHour,
                arrivalHour: offer.arrivalHour,
                comebackDepartureHour: offer.comebackDepartureHour,
                comebackArrivalHour: offer.comebackArrivalHour,
                place: offer.place,
                price: offer.price,
                includesHotel: offer.includesHotel,
                includesTransport: offer.includesTransport
            }
        })
    }

    getOffers = async (): Promise<Offer[]> => {
        return await prisma.offer.findMany({
            include: {
                product: true,
            }
        })
    }

    getOffer = async (id: number): Promise<Offer> => {
        return await prisma.offer.findFirst({
            where: {
                id: Number(id)
            }
        });
    }

    deleteOffer = async (id: number): Promise<Offer> => {
        return await prisma.offer.delete({
            where: {
                id: Number(id)
            }
        });
    }

    deleteAllOffers = async (): Promise<Offer[]> => {
        return await prisma.offer.deleteMany({})
    }
}
