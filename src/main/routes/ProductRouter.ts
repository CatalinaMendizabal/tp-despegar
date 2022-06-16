import {Router} from 'express';
import ProductController from "../controller/ProductController";
import {getContext} from "../../../config/context";

const productRouter = Router();
const productController = new ProductController(getContext())

productRouter.get('/', async (req: any, res: { send: (arg0: { message: string; }) => void; }) => {
    res.send({message: '??????'});
});

/*

treatmentRouter.get('/',async (req: any, res: any) => {
    if(SecureHeaderValidator.validateReq(req, res)) await treatmentController.getTreatments(res);
});
 */

export default productRouter;
