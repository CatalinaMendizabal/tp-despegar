import {Context, createMockContext, MockContext} from "../../../../config/context";
import {Offer} from "@prisma/client";
import {OfferService} from "../../../../src/main/service/OfferService";
import * as jsonOffers from "../../../resources/offers.json";

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

    it('should search an offer by place name', async function () {
        mockCtx.prisma.offer.findMany.mockResolvedValue([offers[0]]);
        const aOffers = await offerService.searchOfferByPlaceName('Place 1');

        expect(aOffers).not.toBeNull();
        expect(aOffers.length).toBe(1);
        expect(aOffers[0]).toBe(offers[0]);
    });

    it('should not find an offer for a place name', async function () {
        mockCtx.prisma.offer.findMany.mockResolvedValue([]);
        const aOffers = await offerService.searchOfferByPlaceName('Place 3');

        expect(aOffers).not.toBeNull();
        expect(aOffers).toStrictEqual([])
    });


})

