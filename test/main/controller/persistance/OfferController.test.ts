import { getContext} from "../../../../config/context";
import OfferController from "../../../../src/main/controller/OfferController";
import * as jsonOffers from "../../../resources/offers.json";
import * as jsonFlights from "../../../resources/flights.json";
import IResponse from "../../../resources/IResponse";
import {OfferService} from "../../../../src/main/service/OfferService";
import FlightService from "../../../../src/main/service/FlightService";

let offers: any[] = [];
let flights: any[] = [];

const ctx = getContext()
const offerController = new OfferController(ctx);
const offerService = new OfferService(ctx);
const flightService = new FlightService(ctx);

beforeAll(async () => {

    for (const flight of jsonFlights.flights) {
        // @ts-ignore
        const createdFlight = await flightService.createFlight(flight)
        flights = [...flights, createdFlight]
    }

    for (const offer of jsonOffers.offers) {
        // @ts-ignore
        const createdOffer = await offerService.createOffer(offer)
        offers = [...offers, createdOffer]
    }
});

afterAll(async () => {
    await offerService.deleteAllOffers()
})

describe("Test offer controller", () => {

    it("should return a response with 200 status when get offers", async () => {
        const res: IResponse = new IResponse({})
        const response = await offerController.getOffers(res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 status when get offer", async () => {
        const res: IResponse = new IResponse({})
        const response = await offerController.getOffer(1, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 status when delete offer", async () => {
        const res: IResponse = new IResponse({})
        const response = await offerController.deleteOffer(1, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 status when delete all offers", async () => {
        const res: IResponse = new IResponse({})
        const response = await offerController.deleteAllOffers(res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 400 status when create offer", async () => {
        const res: IResponse = new IResponse({})
        // @ts-ignore
        const response = await offerController.createOffer({}, res);
        expect(response.status).toBe(400);
    })

    it('should return a response with 200 when create offer', async () => {
        const res: IResponse = new IResponse({})
        const offer = {
            flightId: flights[0].id,
            ammountOfPeople: 6,
            ammoutOfNights: 4,
            tax: 598,
            hotelName: "EL pepe",
            hotelPrice: 900,
            place: "Bahamas"
        }
        // @ts-ignore
        const response = await offerController.createOffer(offer, res);
        expect(response.status).toBe(200);
    });

    it('should look for an offer by place name', async () => {
        const res: IResponse = new IResponse({})
        const response = await offerController.searchOfferByPlaceName("Bahamas", res)
        expect(response.status).toBe(200);
    });

    it('should return a response with 400 status when search offer by place name', async () => {
        const res: IResponse = new IResponse({})
        const response = await offerController.searchOfferByPlaceName("azala", res)
        expect(response.status).toBe(404);
    })
})
