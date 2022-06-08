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
