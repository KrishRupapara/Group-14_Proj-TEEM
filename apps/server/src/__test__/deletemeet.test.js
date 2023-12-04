// const app = require('../index');
// const supertest = require("supertest");
// const expect = require('chai').expect;
//
//
// const meetID = 19;                // meetID to delete created for testing meet
// const wsID = 64;                // workspace created for testing meet
//
// describe("Delete Meet Handler", () => {
//
//
//     it("should send a status code of 200 when meet deleted", async () => {
//
//         const user = {
//             email: "meetTester@gmail.com",
//             password: "1111 1111",
//         };
//
//         const res = await supertest(app)
//             .post("/api/login")
//             .send(user)
//             .expect(200);
//
//         const req = {
//             workspace: {
//                 workspaceID: 64,
//             },
//             body: {
//                 meetID: meetID,
//             }
//         };
//
//         const response = await supertest(app)
//             .delete(`/api/${wsID}/${meetID}/editMeetDetails`)
//             .set("Cookie", res.headers["set-cookie"])
//             .expect(200);
//
//
//         expect(response.status).to.equal(200);
//         expect(response.body.message).to.equal('meet deleted successfully');
//
//     });
// });