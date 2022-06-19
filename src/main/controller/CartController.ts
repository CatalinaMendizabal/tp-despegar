import {Context} from "../../../config/context";
import {CartService} from "../service/CartService";

export default class CartController {

    cartService: CartService;

    constructor(context: Context) {
        this.cartService = new CartService(context);
    }

    public async createCart(cart: any, res: any) {
        try {
            const newCart = await this.cartService.createCart(cart);
            return res.status(200).json(newCart);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getCarts(res: any) {
        try {
            const carts = await this.cartService.getCarts();
            return res.status(200).json(carts);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getCart(id: number, res: any) {
        try {
            const aCart = await this.cartService.getCart(id);
            if (aCart === null) return res.status(404).json({message: "Cart not found"});
            else return res.status(200).json(aCart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getCartForUser(userId: number, res: any) {
        try {
            const cart = await this.cartService.getCartForUser(userId);
            return res.status(200).json(cart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteCart(id: number, res: any) {
        try {
            const cart = await this.cartService.deleteCart(id)
            return res.status(200).json(cart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getFlightsOnCart(cartId: number, res: any) {
        try {
            const flights = await this.cartService.getFlightsOnCart(cartId);
            if (flights === null) return res.status(404).json({message: "Cart not found"});
            else return res.status(200).json(flights);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getPriceOfItemsOnCart(cartId: number, res: any){
        try {
            const price = await this.cartService.getPriceOfItemsOnCart(cartId);
            return res.status(200).json(price);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async addFlightToCart(flight: any, cartId: number, res: any) {
        try {
            const updatedCart = await this.cartService.addFlightToCart(flight, cartId);
            if (updatedCart === null) return res.status(404).json({message: "Cart not found"});
            else return res.status(200).json(updatedCart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteAllCarts(res: any) {
        try {
            const carts = await this.cartService.deleteAllCarts()
            return res.status(200).json(carts);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteFlightFromCart(flight: any, id: number, res: any) {
        try {
            const updatedCart = await this.cartService.deleteFlightFromCart(flight, id);
            return res.status(200).json(updatedCart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
