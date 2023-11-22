//auth.test.js
import request from "supertest";
import {
  createWorkspacePost,
  createWorkspaceGet,
  signUpHandler,
} from "../controllers";

import { db } from "../config/database";

import { app } from "../index";

describe("signupHandler", () => {
  it("should send a status code of 200 when new user created", async () => {
    const userData = {
      email: "dummy4@gmail.com",
      name: "dummy 4",
      password: "12345678",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const response = await request(app)
      .post("/api/signup")
      .send(userData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    // Perform assertions
    // expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Signup successful" });
  });

  //   it("should send a status code of 400 when usser exist", async () => {
  //     const req = {
  //       body: {
  //         email: "dummy1@gmail.com",
  //         name: "dummy 1",
  //         password: "12345678",
  //         organization: "",
  //         jobTitle: "",
  //         country: "",
  //       },
  //     } as Request;

  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //     } as unknown as Response;

  //     await signUpHandler(req, res);

  //     // Assert the expected behavior
  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.send).toHaveBeenCalledWith({ meesage: "Email already exists" });
  //   });
});
