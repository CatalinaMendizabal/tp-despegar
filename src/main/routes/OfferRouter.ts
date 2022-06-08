import {Router} from 'express';
import OfferController from "../controller/OfferController";

const offerRouter = Router();
const offerController = new OfferController()

offerRouter.get('/', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    res.send({message: '??????'});
});

/*

treatmentRouter.get('/',async (req: any, res: any) => {
    if(SecureHeaderValidator.validateReq(req, res)) await treatmentController.getTreatments(res);
});
 */

export default offerRouter;