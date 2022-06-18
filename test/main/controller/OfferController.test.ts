import {Context, createMockContext, MockContext} from "../../../config/context";
import {Offer} from "@prisma/client";
import OfferController from "../../../src/main/controller/OfferController";
import * as jsonOffers from "../../resources/offers.json";
import IResponse from "../../resources/IResponse";

let mockCtx: MockContext;
let ctx: Context;
let offers: Offer[];
let offerController: OfferController;

beforeAll(async () => {
    offers = [];

    for (const offer of jsonOffers.offers) {
        // @ts-ignore
        offers.push(offer);
    }

});

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    offerController = new OfferController(ctx);
});

describe("Test offer controller", () => {
    beforeEach(async () => {
        mockCtx.prisma.offer.findMany.mockResolvedValue(offers);
        mockCtx.prisma.offer.findFirst.mockResolvedValue(offers[0]);
        mockCtx.prisma.offer.delete.mockResolvedValue(offers[0]);
    })

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
        mockCtx.prisma.offer.create.mockRejectedValue(new Error("Can't create"));
        const res: IResponse = new IResponse({})
        // @ts-ignore
        const response = await offerController.createOffer({}, res);
        expect(response.status).toBe(400);
    })

    it('should return a response with 200 when create offer', async () => {
        mockCtx.prisma.offer.create.mockResolvedValue(offers[0]);
        const res: IResponse = new IResponse({})
        const offer = {
            flightId: 1,
        }
        // @ts-ignore
        const response = await offerController.createOffer(offer, res);
        expect(response.status).toBe(200);
    });
})
