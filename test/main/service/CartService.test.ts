import {Context, createMockContext, MockContext} from "../../../config/context";
import {Cart} from "@prisma/client";
import {CartService} from "../../../src/main/service/CartService";
import * as jsonCarts from "../../resources/carts.json";

let mockCtx: MockContext;
let ctx: Context;
let carts: Cart[];
let cartService: CartService;

beforeAll(async () => {
    carts = [];
    for (const cart of jsonCarts.carts) carts.push(cart);
});

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    cartService = new CartService(ctx);
});

describe("Test cart service", () => {

    beforeEach(async () => {
        mockCtx.prisma.cart.findMany.mockResolvedValue(carts);
        mockCtx.prisma.cart.findFirst.mockResolvedValue(carts[0]);
        mockCtx.prisma.cart.delete.mockResolvedValue(carts[0]);
        mockCtx.prisma.cart.create.mockResolvedValue(carts[0]);
        mockCtx.prisma.cart.update.mockResolvedValue(carts[0]);
    })

    it("should create a cart", async () => {
        const cart = await cartService.createCart({userId: 1, flights: []});
        expect(cart).toEqual(carts[0]);
    })

    it("should get all carts", async () => {
        const carts = await cartService.getCarts();
        expect(carts).toEqual(jsonCarts.carts);
    })

    it("should get a cart", async () => {
        const cart = await cartService.getCart(1);
        expect(cart).toEqual(carts[0]);
    })

    it("should get a cart for user", async () => {
        const cart = await cartService.getCartForUser(1);
        expect(cart).toEqual(carts[0]);
    })

    it("should delete a cart", async () => {
        const cart = await cartService.deleteCart(1);
        expect(cart).toEqual(carts[0]);
    })

    it("should get flights on cart", async () => {
        const flights = await cartService.getFlightsOnCart(1);
        // @ts-ignore
        expect(flights.flights.length).toEqual(carts[0].flights.length);
    })

    it("should get price of items on cart", async () => {
        const price = await cartService.getPriceOfItemsOnCart(1);
        // @ts-ignore
        expect(price).toEqual(carts[0].flights.reduce((acc: any, cur: { price: any; }) => acc + cur.price, 0));
    })

    it("should add a flight to cart", async () => {
        const cart = await cartService.addFlightToCart(1, 1);
        expect(cart).toEqual(carts[0]);
    })

    it("should delete a flight from cart", async () => {
        const cart = await cartService.deleteFlightFromCart(1, 1);
        expect(cart).toEqual(carts[0]);
    })


})
