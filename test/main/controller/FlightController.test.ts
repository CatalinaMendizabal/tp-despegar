import * as flights from "../../resources/flights.json";
import * as products from "../../resources/products.json";
import FlightService from "../../../src/main/service/FlightService";
import ProductService from "../../../src/main/service/ProductService";
import IResponse from "../../resources/IResponse";
import FlightController from "../../../src/main/controller/FlightController";

const flightService = new FlightService();
const productService = new ProductService();
const flightController = new FlightController()

beforeAll(async () => {
    await productService.deleteAllProducts();
    await flightService.deleteAllFlights();

    for (const product of products.products) {
        await productService.createProduct(product);
    }

    for (const flight of flights.flights) {
        // @ts-ignore
        await flightService.createFlight(flight);
    }
});

describe("Test flight controller", () => {

    it("should return a response with 200 when get all flights", async () => {
        const res : IResponse = new IResponse({})
        const response = await flightController.getFlights(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when get flight", async () => {
        const res : IResponse = new IResponse({})
        const response = await flightController.getFlight(3, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when delete flight", async () => {
        const res : IResponse = new IResponse({})
        const response = await flightController.deleteFlight(3, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when delete all flights", async () => {
        const res : IResponse = new IResponse({})
        const response = await flightController.deleteAllFlights(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 400 when create flight", async () => {
        const res : IResponse = new IResponse({})
        // @ts-ignore
        const response = await flightController.createFlight({}, res);
        expect(response.status).toBe(400);
    });

    it('should return a response with 200 when create flight', async () => {
        const res : IResponse = new IResponse({})
        const flight = {
            "id": 99,
            "company": "Lufthansa",
            "departureHour": "2022-05-16T00:58:53.561Z",
            "arrivalHour": "2022-05-17T00:58:53.561Z",
            "luggage": ["CARRY_ON", "SUITCASE"],
            "type": "ECONOMY",
            "productId": 1
        }
        // @ts-ignore
        const response = await flightController.createFlight(flight, res);
        expect(response.status).toBe(200);
    });
});
