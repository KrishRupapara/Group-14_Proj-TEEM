"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe("signupHandler", () => {
    it("should send a status code of 200 when new user created", async () => {
        const userData = {
            email: "dummy5@gmail.com",
            name: "dummy 5",
            password: "12345678",
            organization: "abc",
            jobTitle: "abc",
            country: "abc",
        };
        const response = await (0, supertest_1.default)(index_1.app)
            .post("/api/signup")
            .send(userData)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
        expect(response.body).toEqual({ message: "Signup successful" });
    });
});
describe("loginHandler", () => {
    it('should return 400 if email or password is missing', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/login')
            .send({})
            .expect(400);
        expect(response.body).toEqual({ error: 'Please provide email and password' });
    });
});
//# sourceMappingURL=auth.test.js.map