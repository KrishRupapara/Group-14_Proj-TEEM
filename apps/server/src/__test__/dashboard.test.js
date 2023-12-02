const app = require('../index');
const supertest = require("supertest");
const expect = require('chai').expect;
const users = require('../model/User');

describe("Dashboard", () => {
    it("should return 200 with when user is valid and workspaces are there.", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .get('/api/dashboard')
            .set("Cookie", res.headers["set-cookie"])
            .expect(200);

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('Workspace');

    });
});

describe("Get Profile", () => {
    it("should return 200 with when user is valid.", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .get('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .expect(200);

        expect(response.statusCode).to.equal(200);
        // expect(response.body).to.have.property('user');

    });




    it("should return 400 with when user is invalid.", async () => {
        const user = {
            email: "notExist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(400);

    });

});


describe("Update Profile", () => {
    it("should return 200 when profile updated successfully.", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .patch('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .send({
                UserName : "Priyesh Tandel",
                Email: "exist@gmail.com",
                Organization : "DA-IICT",
                JobTitle : "Student",
                Country: "India"
            })
            .expect(200);

        expect(response.statusCode).to.equal(200);
        // expect(response.body).to.have.property('user');

    });


    it("should return 400 when Email field is attempted to update.", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .patch('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .send({
                UserName : "Priyesh Tandel",
                Email: "existmodified@gmail.com",
                Organization : "DA-IICT",
                JobTitle : "Student",
                Country: "India"
            })
            .expect(400);

        expect(response.statusCode).to.equal(400);

    });




    it("should return 400 when Email field is empty", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .patch('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .send({
                UserName : "Priyesh Tandel 2",
                Email: "NULL",
                Organization : "DA-IICT",
                JobTitle : "Student",
                Country: "India"
            })
            .expect(400);

        expect(response.statusCode).to.equal(400);

    });



    it("should return 400 when Username field is empty.", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .patch('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .send({
                UserName : "",
                Email: "exist@gmail.com",
                Organization : "DA-IICT",
                JobTitle : "Student",
                Country: "India"
            })
            .expect(400);

        expect(response.statusCode).to.equal(400);

    });




    it("should return 400 when Empty body sent", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .patch('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .send({

            })
            .expect(400);

        expect(response.statusCode).to.equal(400);

    });





});


