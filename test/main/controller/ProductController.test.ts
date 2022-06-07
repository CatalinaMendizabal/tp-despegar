import ProductController from "../../../src/main/controller/ProductController";
import IResponse from "../../resources/IResponse";
const productController = new ProductController();

beforeAll(async () => {
   /* await bookingStatusInfoService.deleteBookingStatusInfo();
    await patientStatusInfoService.deletePatientStatusInfo();
    await bookingService.deleteBookings();
    await patientService.deletePatients();
    await patientService.treatmentService.deleteTreatments();
    await clinicService.deleteClinics();

    for (const treatment of treatments.treatments) {
        // @ts-ignore
        await patientService.treatmentService.createTreatment(treatment);
    }*/

});

describe("Test Get Treatments", () => {

    it("should return a response with 200 status", async () => {
        const res : IResponse = new IResponse({})
        const response = await productController.getProducts(res);
        expect(response.status).toBe(200);
    });

});
