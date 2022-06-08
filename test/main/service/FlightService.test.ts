import * as flights from "../../resources/flights.json";
import FlightService from "../../../src/main/service/FlightService";

const flightService = new FlightService();

const elem = [{
    "id": 4,
    "company": "American Airlines",
    "departureHour": "2022-05-16T00:58:53.561Z",
    "arrivalHour": "2022-05-17T00:58:53.561Z",
    "luggage": "CARRY_ON",
    "type": "ECONOMY",
    "productId": 1
}]
beforeAll(async () => {

    await flightService.deleteAllFlights();
    for (const flight of flights.flights) {
        // @ts-ignore
        await flightService.createFlight(flight);
    }

});

describe("Test Get Flights", () => {

        it('should return all flights', async () => {
            const flights = await flightService.getFlights();
            expect(flights).not.toBeNull();
            expect(flights.length).toBe(1);
        });

})

describe("Test Get Flight", () => {


    it('Flight should exist', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight).toBeDefined();
    });

    it('Flight should exist', async () => {
        const flight = await flightService.getFlight(2);
        expect(flight).not.toBeDefined();
    });

    it('Flight should have a company related', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight.company).toBeDefined();
    });

    it('Flight should have a departure hour', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight.departureHour).toBeDefined();
    });

    it('Flight should have an arrival hour', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight.arrivalHour).toBeDefined();
    });

    it('Flight should have a luggage type', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight.luggage).toBeDefined();
    });

    it('Flight should have a type class', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight.type).toBeDefined();
    });

    it('Departure hour should be different to arrival hour', async () => {
        const flight = await flightService.getFlight(1);
        expect(flight).not.toBeNull();
        expect(flight.departureHour).not.toBe(flight.arrivalHour);
    });

})
