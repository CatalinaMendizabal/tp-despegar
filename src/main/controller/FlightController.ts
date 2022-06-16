import FlightService from "../service/FlightService";
import {Flight} from "@prisma/client";
import {Context} from '../../../config/context';

export default class FlightController {
    flightService: FlightService;

    constructor(ctx: Context) {
        this.flightService =  new FlightService(ctx);
    }

    public async createFlight(flight: Flight, res: any) {
        try {
            const newPatient = await this.flightService.createFlight(flight);
            return res.status(200).json(newPatient);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getFlights(res: any) {
        try {
            const flights = await this.flightService.getFlights();
            return res.status(200).json(flights);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async getFlight(id: number, res: any) {
        try {
            const product = await this.flightService.getFlight(id);
            if (product === null) return res.status(404).json({message: "Flight not found"});
            else return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteFlight(id: number, res: any) {
        try {
            const flight = await this.flightService.deleteFlight(id);
            return res.status(200).json(flight);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    public async deleteAllFlights(res: any) {
        try {
            const flights = await this.flightService.deleteAllFlights();
            return res.status(200).json(flights);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}

