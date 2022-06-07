import { Router } from 'express';
import productRouter from "./main/routes/ProductRouter";

const routes = Router();

routes.use('/products', productRouter);

export default routes;
