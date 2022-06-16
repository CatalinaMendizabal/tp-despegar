import ProductService from "../service/ProductService";
import {Context} from '../../../config/context';

export default class ProductController {
    productService: ProductService;

    constructor(ctx: Context) {
        this.productService = new ProductService(ctx);
    }

    public async getProducts(res: any) {
        try {
            const products = await this.productService.getProducts();
            return res.status(200).json(products);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
