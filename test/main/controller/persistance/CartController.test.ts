import {getContext} from "../../../../config/context";
import CartController from "../../../../src/main/controller/CartController";
import * as jsonCarts from "../../../resources/carts.json";
import * as jsonUsers from "../../../resources/users.json";
import * as jsonFlights from "../../../resources/flights.json";
import IResponse from "../../../resources/IResponse";
import {CartService} from "../../../../src/main/service/CartService";
import FlightService from "../../../../src/main/service/FlightService";

const ctx = getContext()
const cartController = new CartController(ctx);
const cartService = new CartService(ctx);
const flightService = new FlightService(ctx);

beforeAll(async () => {
    for (const user of jsonUsers.users) {
        await cartService.createUser(user)
    }
    for (const flight of jsonFlights.flights) {
        // @ts-ignore
        await flightService.createFlight(flight)
    }
    for (const cart of jsonCarts.carts) {
        await cartService.createCart(cart.userId)
    }
});

afterAll(async () => {
     await cartService.deleteAllCarts()
})

describe("Test cart controller", () => {

    it("should return a response with 400 when create cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.createCart(157, res);
        expect(response.status).toBe(400);
    })

    it("should return a response with 200 when create cart", async () => {
        const res: IResponse = new IResponse({})
        const aCart = {
            userId: 2
        }
        const response = await cartController.createCart(2, res);
        expect(response.status).toBe(200);
    })

    it("should return the cart of a user", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getCartForUser(2, res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 when get all carts", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getCarts(res);
        expect(response.status).toBe(200);
    })

    it("should return a response with 200 when get cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.getCart(1, res);
        expect(response.status).toBe(200);
    })

    it('should return 200 when adding a flight to cart', async function () {
        const res: IResponse = new IResponse({})
        const response = await cartController.addFlightToCart(1, 1, res);
        expect(response.status).toBe(200);
    });

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

    it("should return a response with 200 when delete cart", async () => {
        const res: IResponse = new IResponse({})
        const response = await cartController.deleteCart(2, res);
        expect(response.status).toBe(200);
    })


    it('should return 200 when deleting a flight from cart', async function () {
        const res: IResponse = new IResponse({})
        const response = await cartController.deleteFlightFromCart(1, 1, res);
        expect(response.status).toBe(200);
    });
})
