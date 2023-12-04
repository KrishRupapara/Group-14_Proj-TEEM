const app = require('../index');
const supertest = require("supertest");
const expect = require('chai').expect;


// jest.mock('../middleware/authMiddleware', () => ({
//     requireAuth: jest.fn((req, res, next) => {
//         // Bypass authentication logic for testing purposes
//         req.user = { userID: 73, name: "priyesh", isVerified: true };
//         next();
//     }),
// }));


const TitleToChange = "Title0000";   // title to change for testing edit meet
const wsID = 64;                // workspace created for testing meet
const meetID = 27;                // meetID to delete created for testing meet


describe("Schedule Meet Handler", () => {


    it("should send a status code of 200 when meet is scheduled", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const meetData = {
            summary: "Summary 1",
            description: "Description 1",
            agenda: "Agenda 1",
            startDate: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
            participants: [
                "meetTester@gmail.com",
            ]
        };

        const response = await supertest(app)
            .post(`/api/${wsID}/scheduleMeet`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(201);


        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Meet scheduled successfully');

    });







    it("should send a status code of 400 when Title is empty", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const meetData = {
            summary: "",
            description: "Description 1",
            agenda: "Agenda 1",
            startDate: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
            participants: [
                "meetTester@gmail.com",
            ]
        };


        const response = await supertest(app)
            .post(`/api/${wsID}/scheduleMeet`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Please enter required informations');

    });






    it("should send a status code of 400 when Agenda is missing", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const meetData = {
            summary: "Title 1",
            description: "Description 1",
            agenda: "",
            startDate: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
            participants: [
                "meetTester@gmail.com",
            ]
        };


        const response = await supertest(app)
            .post(`/api/${wsID}/scheduleMeet`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Please enter required informations');

    });






    it("should send a status code of 400 when Date is missing", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const meetData = {
            summary: "Title 1",
            description: "Description 1",
            agenda: "Agenda 1",
            startDate: "",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
            participants: [
                "meetTester@gmail.com",
            ]
        };


        const response = await supertest(app)
            .post(`/api/${wsID}/scheduleMeet`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Please enter required informations');

    });




});



describe("Edit Meet Handler", () => {

    it("should send a status code of 200 when meet Edited successfully", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const req = {
            workspace: {
                workspaceID: 64,
            },
            body: {
                meetID: meetID,
            }
        };

        const meetData = {
            title : `${TitleToChange}`,
            agenda: "Agenda 1",
            description: "Description 1",
            date: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
        };

        const response = await supertest(app)
            .patch(`/api/${wsID}/${meetID}/editMeetDetails`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(200);


        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Meet Edited Successfully');

    });


    it("should send a status code of 400 when title Field is empty", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const req = {
            workspace: {
                workspaceID: 64,
            },
            body: {
                meetID: meetID,
            }
        };

        const meetData = {
            title : "",
            agenda: "Agenda 1",
            description: "Description 1",
            date: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
        };

        const response = await supertest(app)
            .patch(`/api/${wsID}/${meetID}/editMeetDetails`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Fields are insufficient');

    });



    it("should send a status code of 400 when agenda Field is empty", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const req = {
            workspace: {
                workspaceID: 64,
            },
            body: {
                meetID: meetID,
            }
        };

        const meetData = {
            title : "title0",
            agenda: "",
            description: "Description 1",
            date: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
        };

        const response = await supertest(app)
            .patch(`/api/${wsID}/${meetID}/editMeetDetails`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Fields are insufficient');

    });





    it("should send a status code of 400 when description Field is empty", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const req = {
            workspace: {
                workspaceID: 64,
            },
            body: {
                meetID: meetID,
            }
        };

        const meetData = {
            title : "title",
            agenda: "Agenda 1",
            description: "",
            date: "2023-05-12",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
        };

            const response = await supertest(app)
            .patch(`/api/${wsID}/${meetID}/editMeetDetails`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Fields are insufficient');

    });





    it("should send a status code of 400 when date Field is empty", async () => {

        const user = {
            email: "meetTester@gmail.com",
            password: "1111 1111",
        };

        const res = await supertest(app)
            .post("/api/login")
            .send(user)
            .expect(200);

        const req = {
            workspace: {
                workspaceID: 64,
            },
            body: {
                meetID: meetID,
            }
        };

        const meetData = {
            title : "title0",
            agenda: "Agenda 1",
            description: "Description 1",
            date: "",
            startTime: "02:40:00",
            endTime: "03:40:00",
            venue: "Venue 1",
        };

        const response = await supertest(app)
            .patch(`/api/${wsID}/${meetID}/editMeetDetails`)
            .set("Cookie", res.headers["set-cookie"])
            .send(meetData)
            .expect(400);


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Fields are insufficient');

    });








});


