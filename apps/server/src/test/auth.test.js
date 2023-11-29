const app = require('../index');
const supertest = require("supertest");
const expect = require('chai').expect;

describe("signupHandler", () => {
  it("should send a status code of 200 when new user created", async () => {
    const userData = {
      email: "new2@gmail.com",
      name: "dummy 4",
      password: "12345678",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const res = await supertest(app)
        .post("/api/signup")
        .send(userData);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Signup successful');
  });

  it('should send a status code of 400 when email already exists', async () => {
    const userData = {
      email: "exist@gmail.com",
      name: "dummy 4",
      password: "12345678",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const res = await supertest(app)
        .post("/api/signup")
        .send(userData);

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Email already exists');
  });







  // describe test cases here
  it("should send a status code of 400 when email field is empty", async () => {

    const userData = {
      email: "",
      name: "dummy 4",
      password: "12345678",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const res = await supertest(app)
        .post("/api/signup")
        .send(userData);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Username and password required');

  });


  it("should send a status code of 400 when Password field is empty", async () => {

    const userData = {
      email: "withoutpass@gmail.com",
      name: "passempty",
      password: "",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const res = await supertest(app)
        .post("/api/signup")
        .send(userData);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Username and password required');

  });


  it("should send a status code of 400 when Name field is empty", async () => {

    const userData = {
      email: "withoutname@gmail.com",
      name: "",
      password: "withoutname",
      organization: "abc",
      jobTitle: "abc",
      country: "abc",
    };

    const res = await supertest(app)
        .post("/api/signup")
        .send(userData);

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Username and password required');

  });


});

describe("loginHandler", () => {
  it("should send a status code of 200 when user logged in", async () => {
    const userData = {
      email: "htpt1@gmail.com",
      password: "12345678"
    };

    const res = await supertest(app)
        .post("/api/login")
        .send(userData);

    expect(res.status).to.equal(200);

  });


  it("should send a status code of 400 when email id missing", async () => {
    const userData = {
      email: "",
      password: "emailMissing"
    };

    const res = await supertest(app)
        .post("/api/login")
        .send(userData);


    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Please provide email and password');

  });

  it("should send a status code of 400 when Password missing", async () => {
    const userData = {
      email: "passwordMissing@gmail.com",
      password: ""
    };

    const res = await supertest(app)
        .post("/api/login")
        .send(userData);


    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Please provide email and password');

  });



  it("should send a status code of 400 when Wrong Password", async () => {
    const userData = {
      email: "exist@gmail.com",
      password: "wrongpass12345"
    };

    const res = await supertest(app)
        .post("/api/login")
        .send(userData);


    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Invalid Credentials');

  });



});

