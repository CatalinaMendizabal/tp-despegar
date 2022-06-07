import ProductService from "../../../src/main/service/ProductService";
import * as products from "../../resources/products.json";

const productService = new ProductService();

beforeAll(async () => {

    await productService.deleteAllProducts();

    for (const product of products.products) {
        await productService.createProduct(product);
    }

});

describe("Test Get Products", () => {

    it('should return all products', async () => {
        const products = await productService.getProducts();
        expect(products).not.toBeNull();
        expect(products.length).toBe(1);
    });

    it('should exist the product', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct).toBeDefined();
    });

});
