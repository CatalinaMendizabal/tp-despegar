import {Router} from 'express';
import {getContext} from "../../../config/context";
import CartController from "../controller/CartController";

const cartRouter = Router();
const cartController = new CartController(getContext())

cartRouter.get('/', async (req: any, res: any)  => {
    await cartController.getCarts(res);
});

cartRouter.get('/:id/user', async (req: any, res: any) => {
    const {id} = req.params;
    await cartController.getCartForUser(id, res);
})

cartRouter.post('/:id/flight/:flightId', async (req: any, res: any) => {
    const {id, flightId} = req.params;
    await cartController.addFlightToCart(id, flightId, res);
})

cartRouter.get('/:id/price', async (req: any, res: any) => {
    const {id} = req.params;
    await cartController.getPriceOfItemsOnCart(id, res);
})

cartRouter.delete('/:id/flight/:flightId', async (req: any, res: any) => {
    const {id, flightId} = req.params;
    await cartController.deleteFlightFromCart(id, flightId, res);
})

export default cartRouter;
