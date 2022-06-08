import {Product} from '@prisma/client';
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

export default class ProductService {

    createProduct = async (product: Product): Promise<Product> => {
        return await prisma.product.create({
            data: {
                id: product.id,
                departureAirport: product.departureAirport,
                arrivalAirport: product.arrivalAirport,
                departurePlace: product.departurePlace,
                arrivalPlace: product.arrivalPlace,
                outgoing: product.outgoing,
                price: product.price,
                passengers: product.passengers,
                tax: product.tax,
            }
        })
    }

    getProducts = async (): Promise<Product[]> => {
        return await prisma.product.findMany({
            include: {
                flights: true,
            }
        })
    }

    getProduct = async (id: number): Promise<Product> => {
        return await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        });
    }

    deleteAllProducts = async (): Promise<Product[]> => {
        return await prisma.product.deleteMany({})
    }
}
