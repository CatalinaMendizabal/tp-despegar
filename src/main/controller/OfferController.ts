import OfferService from "../service/OfferService";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const offerService = new OfferService();

export default class OfferController {

    public async getOffers(res: any) {
        try {
            const flights = await offerService.getOffers();
            return res.status(200).json(flights);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}