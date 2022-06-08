import ProductController from "../../../src/main/controller/ProductController";
import IResponse from "../../resources/IResponse";
import ProductService from "../../../src/main/service/ProductService";
import * as products from "../../resources/products.json";
const productController = new ProductController();
const productService = new ProductService();

beforeAll(async () => {
    await productService.deleteAllProducts();

    for (const product of products.products) {
        await productService.createProduct(product);
    }
});

describe("Test product controller", () => {

    it("should return a response with 200 status when get products", async () => {
        const res : IResponse = new IResponse({})
        const response = await productController.getProducts(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 status when get product", async () => {
        const res : IResponse = new IResponse({})
        const response = await productController.getProduct(1, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 status when delete product", async () => {
        const res : IResponse = new IResponse({})
        const response = await productController.deleteProduct(1, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 status when delete all products", async () => {
        const res : IResponse = new IResponse({})
        const response = await productController.deleteAllProducts(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 400 status when create product", async () => {
        const res : IResponse = new IResponse({})
        // @ts-ignore
        const response = await productController.createProduct({}, res);
        expect(response.status).toBe(400);
    });

    it('should return a response with 200 when create product', async () => {
        const res : IResponse = new IResponse({})
        const product = {
            "id": 7,
            "departureAirport": "EZE",
            "arrivalAirport": "CDG",
            "departurePlace": "Buenos Aires",
            "arrivalPlace": "Paris",
            "outgoing": true,
            "price": 1014.060,
            "passengers": 1,
            "tax": 450
        }
        // @ts-ignore
        const response = await productController.createProduct(product, res);
        expect(response.status).toBe(200);
    })
});
