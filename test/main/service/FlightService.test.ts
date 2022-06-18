import * as jsonFlights from "../../resources/flights.json";
import * as jsonProducts from "../../resources/products.json";
import FlightService from "../../../src/main/service/FlightService";
import ProductService from "../../../src/main/service/ProductService";
import {Context, createMockContext, MockContext} from "../../../config/context";
import {Flight, Product} from "@prisma/client";

let mockCtx: MockContext;
let ctx: Context;
let products: Product[];
let flights: Flight[];
let productService: ProductService;
let flightService: FlightService;

beforeAll(async () => {
    products = [];
    flights = [];

    for (const product of jsonProducts.products) products.push(product);

    // @ts-ignore
    for (const flight of jsonFlights.flights) flights.push(flight);
});

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    productService = new ProductService(ctx);
    flightService = new FlightService(ctx);
});

describe("Test Get Flights", () => {
    beforeEach(async () => {
        mockCtx.prisma.flight.findMany.mockResolvedValue(flights);
    });

    it('should return all flights', async () => {
        const flights = await flightService.getFlights();
        expect(flights).not.toBeNull();
        expect(flights.length).toBe(2);
    });

});

describe("Test Get Flight", () => {
    beforeEach(async () => {
        mockCtx.prisma.flight.findFirst.mockResolvedValue(flights[0]);
    });

    it('Flight should exist', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight).toBeDefined();
    });

    it('Flight should have a company related', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight?.company).toBeDefined();
    });

    it('Flight should have a departure hour', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight?.departureHour).toBeDefined();
    });

    it('Flight should have an arrival hour', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight?.arrivalHour).toBeDefined();
    });

    it('Flight should have a luggage type', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight?.luggage).toBeDefined();
    });

    it('Flight should have a luggage type', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
    });

    it('Flight should have a type class', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight?.type).toBeDefined();
    });

    it('Departure hour should be different to arrival hour', async () => {
        const flight = await flightService.getFlight(3);
        expect(flight).not.toBeNull();
        expect(flight?.departureHour).not.toBe(flight?.arrivalHour);
    });
});

describe("Test Delete Flight", () => {
    beforeEach(async () => {
        mockCtx.prisma.flight.findMany.mockResolvedValue([]);
        mockCtx.prisma.flight.findFirst.mockResolvedValue(null);
        mockCtx.prisma.flight.delete.mockResolvedValue(flights[0]);
    });

    it('Should delete a flight', async () => {
        await flightService.deleteFlight(3);
        const flight = await flightService.getFlight(3);
        expect(flight).toBeNull()
    });

    it('Should delete all flights', async () => {
        await flightService.deleteAllFlights();
        const flights = await flightService.getFlights();
        expect(flights).not.toBeNull()
        expect(flights).toHaveLength(0)
    });
});
