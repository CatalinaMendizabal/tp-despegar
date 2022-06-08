import {Router} from 'express';
import ProductController from "../controller/ProductController";

const productRouter = Router();
const productController = new ProductController()

productRouter.get('/', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    await productController.getProducts(res);
});

productRouter.get('/:id', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    const {id} = req.params;
    await productController.getProduct(id, res);
});

export default productRouter;
