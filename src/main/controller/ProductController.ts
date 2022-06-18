import ProductService from "../service/ProductService";
import {Product} from '@prisma/client';
import {Context} from '../../../config/context';

export default class ProductController {
    productService: ProductService;

    constructor(ctx: Context) {
        this.productService = new ProductService(ctx);
    }

    public async createProduct(product: Product, res: any) {
        try {
            const newProduct = await this.productService.createProduct(product);
            return res.status(200).json(newProduct);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    public async getProducts(res: any) {
        try {
            const products = await this.productService.getProducts();
            return res.status(200).json(products);
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    // Get of a specific product
    public async getProduct(id: number, res: any) {
        try {
            const product = await this.productService.getProduct(id);
            if (product === null) return res.status(404).json({message: "Product not found"});
            else return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteProduct(id: number, res: any) {
        try {
            const product = await this.productService.deleteProduct(id);
            return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteAllProducts(res: any) {
        try {
            const products = await this.productService.deleteAllProducts();
            return res.status(200).json(products);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
