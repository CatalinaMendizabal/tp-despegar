import IResponse from "../../resources/IResponse";
import FlightController from "../../../src/main/controller/FlightController";
import {Context, createMockContext, MockContext} from "../../../config/context";
import {Flight, Product} from "@prisma/client";
import * as jsonProducts from "../../resources/products.json";
import * as jsonFlights from "../../resources/flights.json";
import {AmadeusGatewayMockCheck, AmadeusGatewayMockTrue} from "../../../src/main/resources/AmadeusGateway";

let mockCtx: MockContext;
let ctx: Context;
let flights: Flight[];
let flightController: FlightController;

beforeAll(async () => {

    flights = [];
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
        const res: IResponse = new IResponse({})
        const response = await flightController.getFlights(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when get flight", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getFlight(3, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when delete flight", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.deleteFlight(3, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when delete all flights", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.deleteAllFlights(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 400 when create flight", async () => {
        mockCtx.prisma.flight.create.mockRejectedValue(new Error("Can't create"));
        const res: IResponse = new IResponse({})
        // @ts-ignore
        const response = await flightController.createFlight({}, res);
        expect(response.status).toBe(400);
    });

    it('should return a response with 200 when create flight', async () => {
        mockCtx.prisma.flight.create.mockResolvedValue(flights[0]);
        const res: IResponse = new IResponse({})
        const flight = {
            "id": 99,
            "company": "Lufthansa",
            "departureHour": "2022-05-16T00:58:53.561Z",
            "arrivalHour": "2022-05-17T00:58:53.561Z",
            "luggage": ["CARRY_ON", "SUITCASE"],
            "type": "ECONOMY"
        }
        // @ts-ignore
        const response = await flightController.createFlight(flight, res);
        expect(response.status).toBe(200);
    });
});

describe("Test true multi flight controller", () => {

    beforeEach(async () => {
        mockCtx.prisma.flight.findMany.mockResolvedValue(flights);
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(flights[0]);
        mockCtx.prisma.flight.delete.mockResolvedValue(flights[0]);
    });

    it('two flights should be compatible', async () => {
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(flights[1]);
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: 3, idF2: 6}, new AmadeusGatewayMockTrue(), res)
        expect(response.status).toBe(200)
    });

    it('flight does not exist so should return 404', async () => {
        const res: IResponse = new IResponse({})
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(null);
        const response = await flightController.getMultiFlight({idF1: 3, idF2: 1}, new AmadeusGatewayMockTrue(), res)
        expect(response.status).toBe(404)
    });
});

describe("Test check multi flight controller", () => {

    beforeEach(async () => {
        mockCtx.prisma.flight.findMany.mockResolvedValue(flights);
        mockCtx.prisma.flight.delete.mockResolvedValue(flights[0]);
    });

    it('Flights are compatible', async () => {
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(flights[0]);
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(flights[1]);
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: 3, idF2: 6}, new AmadeusGatewayMockCheck(), res)
        expect(response.status).toBe(200)
    });

    it('flights are not compatible so it should return 404', async () => {
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(flights[0]);
        mockCtx.prisma.flight.findFirst.mockResolvedValueOnce(flights[2]);
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: 0, idF2: 2}, new AmadeusGatewayMockCheck(), res)
        expect(response.status).toBe(404)
    });
});
