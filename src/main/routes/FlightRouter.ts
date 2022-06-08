import {Router} from 'express';
import FlightController from "../controller/FlightController";

const flightRouter = Router();
const flightController = new FlightController()

flightRouter.get('/', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    res.send({message: '??????'});
});

/*

treatmentRouter.get('/',async (req: any, res: any) => {
    if(SecureHeaderValidator.validateReq(req, res)) await treatmentController.getTreatments(res);
});
 */

export default flightRouter;
