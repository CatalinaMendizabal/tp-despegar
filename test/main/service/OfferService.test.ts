import {Context, createMockContext, MockContext} from "../../../config/context";
import {Offer} from "@prisma/client";
import {OfferService} from "../../../src/main/service/OfferService";
import * as jsonOffers from "../../resources/offers.json";

let mockCtx: MockContext;
let ctx: Context;
let offers: Offer[];
let offerService: OfferService;

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

    offerService = new OfferService(ctx);
});

describe("Test Get Offers", () => {

    beforeEach(async () => {
        mockCtx.prisma.offer.findMany.mockResolvedValue(offers);
    })

    it('should return all offers', async () => {
        const aOffers = await offerService.getOffers();

        expect(aOffers).not.toBeNull();
        expect(aOffers.length).toBe(2);
        expect(aOffers[0]).toBe(offers[0]);
    })

    it('should return an offer', async () => {
        const aOffer = await offerService.getOffer(1);

        expect(aOffer).not.toBeNull();
        expect(aOffer).toBeDefined();
    })

    it('should return null if offer does not exist', async () => {
        const aOffer = await offerService.getOffer(3);

        expect(aOffer).toBeNull();
    })

})

