import ProductService from "../../../src/main/service/ProductService";
import {MockContext, Context, createMockContext} from '../../../config/context'
import * as jsonProducts from "../../resources/products.json";
import {Product} from "@prisma/client";

let mockCtx: MockContext;
let ctx: Context;
let products: Product[];
let productService: ProductService;

beforeAll(async () => {
    products = [];

    for (const product of jsonProducts.products) products.push(product);
});

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    productService = new ProductService(ctx);
});

/*
    * seleccionar un producto y que exista OK
    * seleccionar un producto y que no exista OK
    * tiene pasajeros OK
    * tiene precio OK
    * tiene tax OK
    * tiene aep destino y origen OK
    * tiene ida
    * viaje solo de ida
    * fecha de salida
    * fehca de llegada
 */

describe("Test Get Products", () => {
    beforeEach(async () => {
        mockCtx.prisma.product.findMany.mockResolvedValue(products);
    });

    it('should return all products', async () => {
        const aProducts = await productService.getProducts();

        expect(aProducts).not.toBeNull();
        expect(aProducts.length).toBe(2);
        expect(aProducts[0]).toBe(products[0]);
    });
});

describe("Test Get Product", () => {
    beforeEach(async () => {
        mockCtx.prisma.product.findFirst.mockResolvedValue(products[0]);
    });

    it('should exist the product', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct).toBeDefined();
        expect(aProduct).toBe(products[0]);
    });

    it('should have departure airport', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.departureAirport).toBeDefined();
        expect(aProduct?.departureAirport).toBe(products[0].departureAirport);
    });

    it('should have arrival airport', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.arrivalAirport).toBeDefined();
        expect(aProduct?.arrivalAirport).toBe(products[0].arrivalAirport);
    });

    it('should have departure city', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.departurePlace).toBeDefined();
        expect(aProduct?.departurePlace).toBe(products[0].departurePlace);
    });

    it('should have arrival city', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.arrivalPlace).toBeDefined();
        expect(aProduct?.arrivalPlace).toBe(products[0].arrivalPlace);
    });

    it('arrival city should be different than departure city', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.arrivalPlace).not.toBe(aProduct?.departurePlace);
    });

    it('should have a price', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.price).toBeDefined();
        expect(aProduct?.price).toBe(products[0].price);
    });

    it('should have a tax', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.tax).toBeDefined();
        expect(aProduct?.tax).toBe(products[0].tax);
    })

    it('should have passengers', async () => {
        const aProduct = await productService.getProduct(1);

        expect(aProduct).not.toBeNull();
        expect(aProduct?.passengers).toBeDefined();
        expect(aProduct?.passengers).toBeGreaterThan(0);
        expect(aProduct?.passengers).toBe(products[0].passengers);
    });
});

describe("Test Delete Product", () => {
    beforeEach(async () => {
        mockCtx.prisma.product.findFirst.mockResolvedValue(null);
        mockCtx.prisma.product.delete.mockResolvedValue(products[0]);
    });

    it('should delete a product', async () => {
        const aProduct = await productService.deleteProduct(1);
        const getProduct = await productService.getProduct(1);

        expect(getProduct).toBeNull();
        expect(aProduct).not.toBeNull();
        expect(aProduct).toBeDefined();
        expect(aProduct).toBe(products[0]);
    });
});
