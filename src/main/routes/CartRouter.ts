import {Router} from 'express';
import {getContext} from "../../../config/context";
import CartController from "../controller/CartController";

const cartRouter = Router();
const cartController = new CartController(getContext())



export default cartRouter;
