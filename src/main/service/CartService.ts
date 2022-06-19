import {Context} from "../../../config/context";
import {CartDTO} from "../dto/CartDTO";

export class CartService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createCart = async (cart: CartDTO): Promise<any> => {
        return await this.ctx.prisma.cart.create({
            data: cart
        })
    }

    getCarts = async (): Promise<any> => {
        return await this.ctx.prisma.cart.findMany({})
    }

    getCart = async (id: number): Promise<any | null> => {
        return await this.ctx.prisma.cart.findFirst({
            where: {
                id: Number(id)
            }
        });
    }

    deleteCart = async (id: number): Promise<any> => {
        return await this.ctx.prisma.cart.delete({
            where: {
                id: Number(id)
            }
        });
    }

    getFlightsOnCart = async (cartId: number): Promise<any> => {

        return await this.ctx.prisma.cart.findFirst({
            where: {
                id: Number(cartId)
            },
            include: {
                flights: true
            }
        })
    }

    getCartForUser = async (id: number): Promise<any> => {
        return await this.ctx.prisma.cart.findFirst({
            where: {
                userId: Number(id)
            }
        });
    }

    getPriceOfItemsOnCart = async (id: number): Promise<any> => {
        const flights = await this.getFlightsOnCart(id);
        return flights.flights.reduce((acc: any, cur: { price: any; }) => acc + cur.price, 0);
    }


    addFlightToCart = async (flight: any, cartId: number): Promise<any> => {
        return await this.ctx.prisma.cart.update({
            where: {
                id: Number(cartId)
            },
            data: {
                flights: {
                    connect: {
                        id: Number(flight.id)
                    }
                }
            }
        })
    }


    deleteFlightFromCart = async (flight: any, id: number): Promise<any> => {
        return await this.ctx.prisma.cart.update({
            where: {
                id: Number(id)
            }
            ,
            data: {
                flights: {
                    disconnect: {
                        id: Number(flight.id)
                    }
                }
            }
        })
    }

    deleteAllCarts = async (): Promise<any> => {
        return await this.ctx.prisma.cart.deleteMany({})
    }
}
