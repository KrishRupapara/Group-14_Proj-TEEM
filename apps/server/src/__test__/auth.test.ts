//auth.test.js
import supertest from "supertest"; 
// import {
//   createWorkspacePost,
//   createWorkspaceGet,
//   signUpHandler,
// } from "../controllers";

import { db } from "../config/database";

import { app } from "../index";

describe("signupHandler", () => {
  it("should send a status code of 200 when new user created", async () => {
    const userData = {
      email: "htpt1@gmail.com",
      name: "dummy 4",
      password: "12345678",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const response = await supertest(app)
      .post("/api/signup")
      .send(userData)
      .expect(200);

    // Perform assertions
    // expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Signup successful" });

  });

  it("should send a status code of 400 email id not present", async () => {
    const userData = {
      email: "",
      name: "",
      password: "12345678",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const response = await supertest(app)
        .post("/api/signup")
        .send(userData)
        .expect(400);

    // Perform assertions
    // expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: "Username and password required" });

  });

    it("should send a status code of 400 when user exist", async () => {
      const userData = {
        email: "dummy4@gmail.com",
        name: "dummy 4",
        password: "12345678",
        organization: "abc",
        jobTitle: "abc",
        country: "abc",
      };

      const response = await supertest(app)
          .post("/api/signup")
          .send(userData)
          .expect(400);

      // Perform assertions
      // expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Email already exists" });

    });
});

describe("loginHandler", () => {
  it('should return 400 if email or password is missing', async () => {
    const response = await supertest(app)
      .post('/api/login')
      .send({})
      .expect(400);

    expect(response.body).toEqual({ error: 'Please provide email and password' });
  });

});