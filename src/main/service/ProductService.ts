import {Product} from '@prisma/client';
import {Context} from '../../../config/context';

export default class ProductService {
    ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    createProduct = async (product: Product): Promise<Product> => {
        return await this.ctx.prisma.product.create({
            data: {
                id: product.id,
                departureAirport: product.departureAirport,
                arrivalAirport: product.arrivalAirport,
                departurePlace: product.departurePlace,
                arrivalPlace: product.arrivalPlace,
                outgoing: product.outgoing,
                price: product.price,
                passengers: product.passengers,
                tax: product.tax
            }
        })
    }

    getProducts = async (): Promise<Product[]> => {
        return await this.ctx.prisma.product.findMany({
            include: {
                flights: true,
            }
        })
    }

    getProduct = async (id: number): Promise<Product | null> => {
        return await this.ctx.prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        });
    }

    deleteProduct = async (id: number): Promise<Product> => {
        return await this.ctx.prisma.product.delete({
            where: {
                id: Number(id)
            }
        });
    }

    deleteAllProducts = async (): Promise<BatchPayload> => {
        return await this.ctx.prisma.product.deleteMany({})
    }
}

type BatchPayload = {
    count: number
}
