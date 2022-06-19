import {Context, createMockContext, MockContext} from "../../../config/context";
import CartController from "../../../src/main/controller/CartController";
import * as jsonCarts from "../../resources/carts.json";
import {Cart} from "@prisma/client";
import IResponse from "../../resources/IResponse";

let mockCtx: MockContext;
let ctx: Context;
let carts: Cart[];
let cartController: CartController;

beforeAll(async () => {

    carts = [];

    for (const cart of jsonCarts.carts) carts.push(cart);
});

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    cartController = new CartController(ctx);
});

describe("Test cart controller", () => {
    beforeEach(async () => {
        mockCtx.prisma.cart.findMany.mockResolvedValue(carts);
        mockCtx.prisma.cart.findFirst.mockResolvedValue(carts[0]);
        mockCtx.prisma.cart.delete.mockResolvedValue(carts[0]);
        mockCtx.prisma.cart.update.mockResolvedValue(carts[0]);
    })

    it("should return a response with 200 when get all carts", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getCarts(res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 when get cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getCart(3, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 when delete cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.deleteCart(3, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 when delete all carts", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.deleteAllCarts(res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 400 when create cart", async () => {
        mockCtx.prisma.cart.create.mockRejectedValue({});
        const res: IResponse = new IResponse({})
        const response = await cartController.createCart( {}, res);
        expect(response.status).toBe(400);
    })

    it("should return the cart of a user", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getCartForUser(1, res);
        expect(response.status).toBe(200);
    })

    it("should return the flights of a cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getFlightsOnCart(1, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 when getting the price of items on cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getPriceOfItemsOnCart(1, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 400 when getting the price of items on cart", async () => {
        mockCtx.prisma.cart.findFirst.mockRejectedValue({});
        const res: IResponse = new IResponse({})
        const response = await cartController.getPriceOfItemsOnCart(1, res);
        expect(response.status).toBe(400);
    })

    it('should return 200 when adding a flight to cart', async function () {
        const res: IResponse = new IResponse({})
        const response = await cartController.addFlightToCart(1, 1, res);
        expect(response.status).toBe(200);
    });

 /* TODO
   it('should return 400 when adding a flight to cart', async function () {
        mockCtx.prisma.cart.findFirst.mockRejectedValue({});
        const res: IResponse = new IResponse({})
        const response = await cartController.addFlightToCart(4, 1, res);
        expect(response.status).toBe(400);
    })*/

    it('should return 200 when deleting a flight from cart', async function () {
        const res: IResponse = new IResponse({})
        const response = await cartController.deleteFlightFromCart(1,1,  res);
        expect(response.status).toBe(200);
    });

 /*  TODO
   it('should return 400 when deleting a flight that does not exist', async function () {
        mockCtx.prisma.cart.findFirst.mockRejectedValue({});
        const res: IResponse = new IResponse({})
        const response = await cartController.deleteFlightFromCart(9, 1, res);
        expect(response.status).toBe(400);
    });*/
})
