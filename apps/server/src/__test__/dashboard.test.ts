import supertest from "supertest";
import { app } from "../index";

jest.mock("../middleware/authMiddleware.ts", () => {
  return {
    requireAuth: jest.fn((req, res, next) => {
      req.user = { userID: 15, name: "mihir paija", isVerified: true };
      next();
    }),
  };
});

describe("Dashboard", () => {
    it("should return 200 with list of workspace", async () => {

      const response = await supertest(app)
        .get(`/api/dashboard`)
        .expect(200);

    //   expect(response.body).toEqual();
    });
  });