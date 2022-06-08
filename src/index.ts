import { Router } from 'express';
import productRouter from "./main/routes/ProductRouter";
import flightRouter from "./main/routes/FlightRouter";

const routes = Router();

routes.use('/products', productRouter);
routes.use('/flights', flightRouter);

export default routes;
