import IResponse from "../../../resources/IResponse";
import FlightController from "../../../../src/main/controller/FlightController";
import {getContext} from "../../../../config/context";
import {AmadeusGatewayMockCheck, AmadeusGatewayMockTrue} from "../../../../src/main/resources/AmadeusGateway";
import FlightService from "../../../../src/main/service/FlightService";
import * as jsonFlights from "../../../resources/flights.json";

let flights: any[] = [];

const ctx = getContext()
const flightController = new FlightController(ctx);
const flightService = new FlightService(ctx);

beforeAll(async () => {
    for (const flight of jsonFlights.flights) {
        // @ts-ignore
        const createdFlight = await flightService.createFlight(flight)
        flights = [...flights, createdFlight]
    }
});

afterAll(async () => {
     await flightService.deleteAllFlights()
})

describe("Test flight controller", () => {

    it("should return a response with 200 when get all flights", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getFlights(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when get flight", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getFlight(flights[0].id, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when delete flight", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.deleteFlight(flights[0].id, res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 200 when delete all flights", async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.deleteAllFlights(res);
        expect(response.status).toBe(200);
    });

    it("should return a response with 400 when create flight", async () => {
        const res: IResponse = new IResponse({})
        // @ts-ignore
        const response = await flightController.createFlight({}, res);
        expect(response.status).toBe(400);
    });

    it('should return a response with 200 when create flight', async () => {
        const res: IResponse = new IResponse({})
        const flight = {
            "id": 88,
            "company": "American Airlines",
            "departureHour": "2022-05-16T00:58:53.561Z",
            "arrivalHour": "2022-05-17T00:58:53.561Z",
            "departurePlace": "Paris",
            "arrivalPlace": "Barcelona",
            "price": 5000,
            "luggage": ["CARRY_ON", "SUITCASE"],
            "type": "ECONOMY",
            "offer": []
        }
        // @ts-ignore
        const response = await flightController.createFlight(flight, res);
        expect(response.status).toBe(200);
    });
});

describe("Test true multi flight controller", () => {


    it('two flights should be compatible', async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: flights[0].id, idF2: flights[1].id}, new AmadeusGatewayMockTrue(), res)
        expect(response.status).toBe(200)
    });

    it('flight does not exist so should return 404', async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: flights[0].id, idF2: 9999}, new AmadeusGatewayMockTrue(), res)
        expect(response.status).toBe(404)
    });
});

describe("Test check multi flight controller", () => {

    it('Flights are compatible', async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: flights[0].id, idF2: flights[1].id}, new AmadeusGatewayMockCheck(), res)
        expect(response.status).toBe(200)
    });

    it('flights are not compatible so it should return 404', async () => {
        const res: IResponse = new IResponse({})
        const response = await flightController.getMultiFlight({idF1: flights[0].id, idF2: flights[2].id}, new AmadeusGatewayMockCheck(), res)
        expect(response.status).toBe(404)
    });
});
