import {Router} from 'express';
import flightRouter from "./main/routes/FlightRouter";
import offerRouter from "./main/routes/OfferRouter";
import cartRouter from "./main/routes/CartRouter";

const routes = Router();

routes.use('/flights', flightRouter);
routes.use('/offers', offerRouter);
routes.use('/cart', cartRouter);

export default routes;
