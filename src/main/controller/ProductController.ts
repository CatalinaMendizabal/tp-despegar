import ProductService from "../service/ProductService";
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const productService = new ProductService();

export default class ProductController {

    public async getProducts(res: any) {
        try {
            const products = await productService.getProducts();
            return res.status(200).json(products);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
