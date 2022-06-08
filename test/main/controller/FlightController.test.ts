import FlightController from "../../../src/main/controller/FlightController";
import IResponse from "../../resources/IResponse";
const flightController = new FlightController();

beforeAll(async () => {
});

describe("Test Get Treatments", () => {

    it("should return a response with 200 status", async () => {
        const res : IResponse = new IResponse({})
        const response = await flightController.getFlights(res);
        expect(response.status).toBe(200);
    });

});