import ProductService from "../../../src/main/service/ProductService";
import * as products from "../../resources/products.json";
import * as flights from "../../resources/flights.json";
import FlightService from "../../../src/main/service/FlightService";

const productService = new ProductService();
const flightService = new FlightService();

beforeAll(async () => {

    await flightService.deleteAllFlights()
    await productService.deleteAllProducts();

    for (const product of products.products) {
        await productService.createProduct(product);
    }

    for (const flight of flights.flights) {
        // @ts-ignore
        await flightService.createFlight(flight);
    }

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

    it('should return all products', async () => {
        const products = await productService.getProducts();
        expect(products).not.toBeNull();
        expect(products.length).toBe(2);
    });

});

describe("Test Get Product", () => {

    it('should exist the product', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct).toBeDefined();
    });

    it('should exist the product', async () => {
        const aProduct = await productService.getProduct(2);
        expect(aProduct).not.toBeDefined();
    });

    it('should have departure airport', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.departureAirport).toBeDefined();
    });

    it('should have arrival airport', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.arrivalAirport).toBeDefined();
    });

    it('should have departure city', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.departurePlace).toBeDefined();
    });

    it('should have arrival city', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.arrivalPlace).toBeDefined();
    });

    it('arrival city should be different than departure city', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.arrivalPlace).not.toBe(aProduct.departurePlace);
    });

    it('should have a price', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.price).toBeDefined();
    });

    it('should have a tax', async () => {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.tax).toBeDefined();
    })

    it('should have passengers', async () =>  {
        const aProduct = await productService.getProduct(1);
        expect(aProduct).not.toBeNull();
        expect(aProduct.passengers).toBeDefined();
        expect(aProduct.passengers).toBeGreaterThan(0);
    });

    it('should delete a product', async () => {
        await productService.deleteProduct(1);
        const getProduct = await productService.getProduct(1);
        expect(getProduct).toBeNull();
    });

});
