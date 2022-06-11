import {Router} from 'express';
import FlightController from "../controller/FlightController";
import productRouter from "./ProductRouter";

const flightRouter = Router();
const flightController = new FlightController()

flightRouter.get('/', async (req: any, res: any)  => {
    await flightController.getFlights(res);
});

productRouter.get('/:id', async (req: any, res: any) => {
    const {id} = req.params;
    await flightController.getFlight(id, res);
});

export default flightRouter;
