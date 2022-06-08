import FlightService from "../service/FlightService";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const flightService = new FlightService();

export default class FlightController {

    public async getProducts(res: any) {
        try {
            const products = await flightService.getFlights();
            return res.status(200).json(products);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
