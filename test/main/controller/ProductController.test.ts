import ProductController from "../../../src/main/controller/ProductController";
import IResponse from "../../resources/IResponse";
const productController = new ProductController();

beforeAll(async () => {
});

describe("Test Get Treatments", () => {

    it("should return a response with 200 status", async () => {
        const res : IResponse = new IResponse({})
        const response = await productController.getProducts(res);
        expect(response.status).toBe(200);
    });

});
