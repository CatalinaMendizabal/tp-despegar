import {Router} from 'express';
import productRouter from "./main/routes/ProductRouter";
import flightRouter from "./main/routes/FlightRouter";
import offerRouter from "./main/routes/OfferRouter";

const routes = Router();

routes.use('/products', productRouter);
routes.use('/flights', flightRouter);
routes.use('/offers', offerRouter);
routes.use('/cart', offerRouter);

export default routes;
