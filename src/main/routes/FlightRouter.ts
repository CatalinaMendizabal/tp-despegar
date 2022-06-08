import {Router} from 'express';
import FlightController from "../controller/FlightController";
import productRouter from "./ProductRouter";

const flightRouter = Router();
const flightController = new FlightController()

flightRouter.get('/', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    await flightController.getFlights(res);
});

productRouter.get('/:id', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    const {id} = req.params;
    await flightController.getFlight(id, res);
});

export default flightRouter;
