import {Context} from "../../../config/context";
import {CartDTO, CreateCartDTO} from "../dto/CartDTO";
import {CreateUserDTO} from "../dto/UserDTO";

export class CartService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createUser = async (user: CreateUserDTO): Promise<any> => {
        return await this.ctx.prisma.user.create({
            data: user
        })
    }

    createCart = async (userId: number): Promise<any> => {
        return await this.ctx.prisma.cart.create({
            data: {
                user: {connect: {id: Number(userId)}},
            }
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
                // @ts-ignore
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


    addFlightToCart = async (flightId: number, cartId: number): Promise<any> => {
        return await this.ctx.prisma.cart.update({
            where: {
                id: Number(cartId)
            },
            data: {
                flights: {
                    connect: {
                        id: Number(flightId)
                    }
                }
            }
        })
    }


    deleteAllFlightsFromCart = async (flightId: number, id: number): Promise<any> => {
        return await this.ctx.prisma.cart.update({
            where: {
                id: Number(id)
            },
            data: {
                flights: {create: []}
            }
        })
    }

    deleteAllCarts = async (): Promise<any> => {
        return await this.ctx.prisma.cart.deleteMany({})
    }
}
