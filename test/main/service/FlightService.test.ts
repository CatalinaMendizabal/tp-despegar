import * as flights from "../../resources/flights.json";
import * as products from "../../resources/products.json";
import FlightService from "../../../src/main/service/FlightService";
import ProductService from "../../../src/main/service/ProductService";

const flightService = new FlightService();
const productService = new ProductService();

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

describe("Test Get Flights", () => {

    it('should return all flights', async () => {
        const flights = await flightService.getFlights();
        expect(flights).not.toBeNull();
        expect(flights.length).toBe(2);
    });

})

describe("Test Get Flight", () => {

    it('Flight should exist', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight).toBeDefined();
    });

    it('Flight should not exist', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).toBeDefined();
    });

    it('Flight should have a company related', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight.company).toBeDefined();
    });

    it('Flight should have a departure hour', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight.departureHour).toBeDefined();
    });

    it('Flight should have an arrival hour', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight.arrivalHour).toBeDefined();
    });

    it('Flight should have a luggage type', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight.luggage).toBeDefined();
    });

    it('Flight should have a luggage type', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
    });

    it('Flight should have a type class', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight.type).toBeDefined();
    });

    it('Departure hour should be different to arrival hour', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight.departureHour).not.toBe(flight.arrivalHour);
    });

    it('Should delete a flight', async () => {
        await flightService.deleteFlight(3);
        const flight = await flightService.getFlight(3);
        expect(flight).toBeNull()
    })

    it('Should delete all flights', async () => {
        await flightService.deleteAllFlights();
        const flights = await flightService.getFlights();
        expect(flights).not.toBeNull()
        expect(flights).toHaveLength(0)
    })
})
