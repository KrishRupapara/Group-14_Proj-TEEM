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
    const response = await supertest(app).get(`/api/dashboard`).expect(200);

    expect(response.body).toEqual({
      Workspace: [
        {
          title: "dummy Workspace 2",
          description: "testing",
          progress: 0,
          manager: "mihir paija",
          type: "dummy",
        },
        {
          title: "dummy project 2",
          description: "abc 2",
          progress: 0,
          manager: "dummy 1",
          type: "dummy 2",
        },
      ],
    });
  });
});

describe("Profile", () => {
  it("should return 200 with user profile", async () => {
    const response = await supertest(app).get(`/api/profile`).expect(200);

    expect(response.body).toEqual({
      UserName: "mihir paija",
      Email: "mihirpaija21@gmail.com",
      Organization: "DAIICT",
      JobTitle: "Student",
      Country: "India",
    });
  });
});
