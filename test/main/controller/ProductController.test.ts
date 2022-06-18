import ProductController from "../../../src/main/controller/ProductController";
import IResponse from "../../resources/IResponse";
import {Context, createMockContext, MockContext} from "../../../config/context";
import {Product} from "@prisma/client";
import * as jsonProducts from "../../resources/products.json";

let mockCtx: MockContext;
let ctx: Context;
let products: Product[];
let productController: ProductController;

beforeAll(async () => {
    products = [];

    for (const product of jsonProducts.products) products.push(product);
});

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    productController = new ProductController(ctx);
});

describe("Test product controller", () => {
    beforeEach(async () => {
        mockCtx.prisma.product.findMany.mockResolvedValue(products);
        mockCtx.prisma.product.findFirst.mockResolvedValue(products[0]);
        mockCtx.prisma.product.delete.mockResolvedValue(products[0]);
    });

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
        mockCtx.prisma.product.create.mockRejectedValue(new Error("Can't create"));
        const res : IResponse = new IResponse({})
        // @ts-ignore
        const response = await productController.createProduct({}, res);
        expect(response.status).toBe(400);
    });

    it('should return a response with 200 when create product', async () => {
        mockCtx.prisma.product.create.mockResolvedValue(products[0]);
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
