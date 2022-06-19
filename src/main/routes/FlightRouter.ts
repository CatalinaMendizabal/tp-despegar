import {Router} from 'express';
import FlightController from "../controller/FlightController";
import {getContext} from "../../../config/context";
import {AmadeusGatewayMockTrue} from "../resources/AmadeusGateway";

const flightRouter = Router();
const flightController = new FlightController(getContext())

flightRouter.get('/', async (req: any, res: any)  => {
    await flightController.getFlights(res);
});

flightRouter.get('/:id', async (req: any, res: any) => {
    const {id} = req.params;
    await flightController.getFlight(id, res);
});

flightRouter.post('/multiflight', async (req: any, res: any) => {
    const body = req.body;
    await flightController.getMultiFlight(body, new AmadeusGatewayMockTrue, res)
});

export default flightRouter;
