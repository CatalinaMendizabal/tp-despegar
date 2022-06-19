import {Offer} from "@prisma/client";
import {Context} from "../../../config/context";
import {CreateOfferDTO} from "../dto/CreateOfferDTO";

export class OfferService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createOffer = async (offer: CreateOfferDTO): Promise<Offer> => {
        return await this.ctx.prisma.offer.create({
            // @ts-ignore
            data: offer
        })
    }

    getOffers = async (): Promise<Offer[]> => {
        return await this.ctx.prisma.offer.findMany({})
    }

    getOffer = async (id: number): Promise<Offer | null> => {
        return await this.ctx.prisma.offer.findFirst({
            where: {
                id: Number(id)
            }
        });
    }

    deleteOffer = async (id: number): Promise<Offer> => {
        return await this.ctx.prisma.offer.delete({
            where: {
                id: Number(id)
            }
        });
    }

    deleteAllOffers = async (): Promise<BatchPayload> => {
        return await this.ctx.prisma.offer.deleteMany({})
    }

    searchOfferByPlaceName = async (place: string): Promise<Offer[]> => {
          return await this.ctx.prisma.offer.findMany({
            where: {
                // @ts-ignore
                place: place
            }
        })
    }

}

type BatchPayload = {
    count: number
}
