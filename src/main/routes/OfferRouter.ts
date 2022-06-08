import {Router} from 'express';
import OfferController from "../controller/OfferController";
import offerRouter from "./OfferRouter";

const offerRouter = Router();
const offerController = new OfferController()

offerRouter.get('/', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    await offerController.getOffers(res);
});

offerRouter.get('/:id', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    const {id} = req.params;
    await offerController.getOffer(id, res);
});

export default offerRouter;