import FlightService from "../service/FlightService";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const flightService = new FlightService();

export default class FlightController {

    public async getFlights(res: any) {
        try {
            const flights = await flightService.getFlights();
            return res.status(200).json(flights);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getFlight(id: number, res: any) {
        try {
            const product = await flightService.getFlight(id);
            if (product === null) return res.status(404).json({message: "Flight not found"});
            else return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
