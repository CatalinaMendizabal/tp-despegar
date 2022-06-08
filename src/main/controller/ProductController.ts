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

    // Get of a specific product
    public async getProduct(id: number, res: any) {
        try {
            const product = await productService.getProduct(id);
            if (product === null) return res.status(404).json({message: "Product not found"});
            else return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
