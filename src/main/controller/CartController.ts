import {Context} from "../../../config/context";

export default class CartController {

    private context: Context;

    constructor(context: Context) {
        this.context = context;
    }

    public async createCart(cart: any, res: any) {
        try {
            const newCart = await this.context.prisma.cart.create({
                // @ts-ignore
                data: cart
            });
            return res.status(200).json(newCart);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getCarts(res: any) {
        try {
            const carts = await this.context.prisma.cart.findMany({});
            return res.status(200).json(carts);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getCart(id: number, res: any) {
        try {
            const cart = await this.context.prisma.cart.findFirst({
                where: {
                    id: Number(id)
                }
            });
            if (cart === null) return res.status(404).json({message: "Cart not found"});
            else return res.status(200).json(cart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteCart(id: number, res: any) {
        try {
            const cart = await this.context.prisma.cart.delete({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(cart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteAllCarts(res: any) {
        try {
            const carts = await this.context.prisma.cart.deleteMany({});
            return res.status(200).json(carts);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async updateCart(id: number, cart: any, res: any) {
        try {
            const updatedCart = await this.context.prisma.cart.update({
                where: {
                    id: Number(id)
                },
                data: cart
            });
            return res.status(200).json(updatedCart);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

}
