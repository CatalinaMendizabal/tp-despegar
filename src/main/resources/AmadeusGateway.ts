import {AmadeusRequestDTO} from "../dto/AmadeusRequestDTO";
import {Flight} from "@prisma/client";

export interface AmadeusGateway {
    areCompatible: (amadeus: AmadeusRequestDTO) => boolean
    fromEntity: (f1: Flight, f2: Flight) => AmadeusRequestDTO

}

export class AmadeusGatewayMockTrue implements AmadeusGateway {
    areCompatible(amadeus: AmadeusRequestDTO): boolean {
        return true;
    }

    fromEntity(f1: Flight, f2: Flight): AmadeusRequestDTO {
        return {departureFlight: f1, arrivalFlight: f2};
    }
}

export class AmadeusGatewayMockCheck implements AmadeusGateway {
    areCompatible(amadeus: AmadeusRequestDTO): boolean {
        return amadeus.departureFlight.company === amadeus.arrivalFlight.company;
    }

    fromEntity(f1: Flight, f2: Flight): AmadeusRequestDTO {
        return {departureFlight: f1, arrivalFlight: f2};
    }
}
