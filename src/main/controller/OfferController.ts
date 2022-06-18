import {OfferService} from "../service/OfferService";
import {Context} from "../../../config/context";
import {CreateOfferDTO} from "../dto/CreateOfferDTO";

export default class OfferController {
    offerService: OfferService;

    constructor(ctx: Context) {
        this.offerService = new OfferService(ctx);
    }

    public async createOffer(offer: CreateOfferDTO, res: any) {
        try {
            const newOffer = await this.offerService.createOffer(offer);
            return res.status(200).json(newOffer);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getOffers(res: any) {
        try {
            const offers = await this.offerService.getOffers();
            return res.status(200).json(offers);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getOffer(id: number, res: any) {
        try {
            const offer = await this.offerService.getOffer(id);
            if (offer === null) return res.status(404).json({message: "Offer not found"});
            else return res.status(200).json(offer);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteOffer(id: number, res: any) {
        try {
            const offer = await this.offerService.deleteOffer(id);
            return res.status(200).json(offer);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteAllOffers(res: any) {
        try {
            const offers = await this.offerService.deleteAllOffers();
            return res.status(200).json(offers);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
