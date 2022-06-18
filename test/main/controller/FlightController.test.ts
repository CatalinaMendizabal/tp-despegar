import IResponse from "../../resources/IResponse";
import FlightController from "../../../src/main/controller/FlightController";
import {Context, createMockContext, MockContext} from "../../../config/context";
import {Flight, Product} from "@prisma/client";
import * as jsonProducts from "../../resources/products.json";
import * as jsonFlights from "../../resources/flights.json";

let mockCtx: MockContext;
let ctx: Context;
let products: Product[];
let flights: Flight[];
let flightController: FlightController;

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

    flightController = new FlightController(ctx);
});

describe("Test flight controller", () => {
    beforeEach(async () => {
        mockCtx.prisma.flight.findMany.mockResolvedValue(flights);
        mockCtx.prisma.flight.findFirst.mockResolvedValue(flights[0]);
        mockCtx.prisma.flight.delete.mockResolvedValue(flights[0]);
    });

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
        mockCtx.prisma.flight.create.mockRejectedValue(new Error("Can't create"));
        const res : IResponse = new IResponse({})
        // @ts-ignore
        const response = await flightController.createFlight({}, res);
        expect(response.status).toBe(400);
    });

    it('should return a response with 200 when create flight', async () => {
        mockCtx.prisma.flight.create.mockResolvedValue(flights[0]);
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
