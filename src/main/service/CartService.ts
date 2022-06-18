import {Context} from "../../../config/context";

export class CartService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createCart = async (cart: any): Promise<any> => {
        return await this.ctx.prisma.cart.create({
            // @ts-ignore
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

    getFlightsOnCart = async (): Promise<any> => {
        return await this.ctx.prisma.cart.findMany({
            include: {
                flights: true
            }
        });
    }

    getOffersOnCart = async (): Promise<any> => {
        return await this.ctx.prisma.cart.findMany({
            include: {
                offers: true
            }
        });
    }

    getPriceOfItemsOnCart = async (): Promise<any> => {
        const flights = await this.getFlightsOnCart();
        const offers = await this.getOffersOnCart();
        const price = flights.reduce((acc: any, cur: { price: any; }) => acc + cur.price, 0);
        const offerPrice = offers.reduce((acc: any, cur: { price: any; }) => acc + cur.price, 0);

        return price + offerPrice;
    }

    addFlightToCart = async (flight: any): Promise<any> => {
        const cart = await this.ctx.prisma.cart.findFirst({
            where: {
                id: Number(flight.cartId)
            }
        });
        if (cart === null) return null;
        else {
            return await this.ctx.prisma.cart.update({
                where: {
                    id: Number(flight.cartId)
                },
                data: {
                    flights: {
                        // @ts-ignore
                        create: {
                            id: flight.id,
                        }
                    }
                }
            })
        }
    }


    deleteAllCarts = async (): Promise<any> => {
        return await this.ctx.prisma.cart.deleteMany({})
    }

    updateCart = async (id: number, cart: any): Promise<any> => {
        return await this.ctx.prisma.cart.update({
            where: {
                id: Number(id)
            },
            data: cart
        });
    }
}
