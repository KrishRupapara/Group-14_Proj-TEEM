const app = require('../index');
const supertest = require("supertest");
const expect = require('chai').expect;
const users = require('../model/User');

describe("delete Profile", () => {
    it("should return 200 when profile deleted successfully", async () => {
        const user = {
            email: "exist@gmail.com",
            password: "12345678",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const response = await supertest(app)
            .delete('/api/profile')
            .set("Cookie", res.headers["set-cookie"])
            .expect(200);

        expect(response.statusCode).to.equal(200);
        // expect(response.body).to.have.property('user');


    })
});