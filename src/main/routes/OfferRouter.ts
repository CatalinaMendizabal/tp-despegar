import {Router} from 'express';
import {getContext} from "../../../config/context";
import OfferController from "../controller/OfferController";

const offerRouter = Router();
const offerController = new OfferController(getContext())

offerRouter.get('/', async (req: any, res: any) => {
    await offerController.getOffers(res);
});

offerRouter.get('/:id', async (req: any, res: any) => {
    const {id} = req.params;
    await offerController.getOffer(id, res);
});

offerRouter.post('/search', async (req: any, res: any) => {
    const body = req.body;
    await offerController.searchOfferByPlaceName(body, res);
});

export default offerRouter;
