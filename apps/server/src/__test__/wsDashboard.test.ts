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

/*
describe("people", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized member", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .get(`/api/${wsID}/people`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You are not a part of the workspace",
      });
    });
  });

  it("should return 200 with if the workspace deleted", async () => {
    const wsID = 19;
    const response = await supertest(app)
      .get(`/api/${wsID}/people`)
      .expect(200);

    expect(response.body).toEqual({
      "People": {
          "Manager": [
              {
                  "userID": 15,
                  "userName": "mihir paija",
                  "emailID": "mihirpaija21@gmail.com",
                  "role": "Manager"
              }
          ],
          "Teammate": [
              {
                  "userID": 16,
                  "userName": "dummy 1",
                  "emailID": "dummy1@gmail.com",
                  "role": "TeamMate"
              }
          ],
          "Collaborator": [
              {
                  "userID": 18,
                  "userName": "dummy 5",
                  "emailID": "dummy5@gmail.com",
                  "role": "Client"
              }
          ],
          "Client": [
              {
                  "userID": 17,
                  "userName": "dummy 4",
                  "emailID": "dummy4@gmail.com",
                  "role": "collaborator"
              }
          ]
      }
  });
  });
});
*/

/*
describe("Your Work", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized member", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You are not a part of the workspace",
      });
    });
  });

  describe("user is workspace manager", () => {
    it("should return 200 with if the workspace manager and filter is upcoming", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=Upcoming`)
        .expect(200);

      expect(response.body).toEqual({
        upcomingTask: [
          {
            taskID: 7,
            taskTitle: "Title",
            taskStatus: "In Progress",
            taskDeadline: "2023-12-30T18:30:00.000Z",
            taskType: "type 1",
            taskDescription: "New Description",
          },
          {
            taskID: 4,
            taskTitle: "demo task",
            taskStatus: "To Do",
            taskDeadline: "2023-12-30T21:30:00.000Z",
            taskType: "type 1",
            taskDescription: "demo",
          },
        ],
      });
    });

    it("should return 200 with if theworkspace manager and filter is all", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=All`)
        .expect(200);

      expect(response.body).toEqual({
        Work: [
          {
            taskID: 7,
            taskTitle: "Title",
            taskStatus: "In Progress",
            taskDeadline: "2023-12-30T18:30:00.000Z",
            taskType: "type 1",
            taskDescription: "New Description",
          },
          {
            taskID: 6,
            taskTitle: "demo task",
            taskStatus: "To Do",
            taskDeadline: "2023-10-30T21:30:00.000Z",
            taskType: "type 1",
            taskDescription: "demo",
          },
          {
            taskID: 5,
            taskTitle: "demo task",
            taskStatus: "To Do",
            taskDeadline: "2023-10-30T21:30:00.000Z",
            taskType: "type 1",
            taskDescription: "demo",
          },
          {
            taskID: 4,
            taskTitle: "demo task",
            taskStatus: "To Do",
            taskDeadline: "2023-12-30T21:30:00.000Z",
            taskType: "type 1",
            taskDescription: "demo",
          },
        ],
      });
    });
  });

  describe("user is workspace member", () => {
    it("should return 200 with if the workspace manager and filter is upcoming", async () => {
      const wsID = 24;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=Upcoming`)
        .expect(200);

      expect(response.body).toEqual({
        upcomingTask: [
          {
            taskID: 54,
            taskTitle: "dummy task 8",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 8",
          },
          {
            taskID: 55,
            taskTitle: "dummy task 7",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 7",
          },
        ],
      });
    });

    it("should return 200 with if theworkspace manager and filter is all", async () => {
      const wsID = 24;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork?filter=All`)
        .expect(200);

      expect(response.body).toEqual({
        Work: [
          {
            taskID: 55,
            taskTitle: "dummy task 7",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 7",
          },
          {
            taskID: 54,
            taskTitle: "dummy task 8",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 8",
          },
          {
            taskID: 53,
            taskTitle: "dummy task 9",
            taskStatus: "To Do",
            taskDeadline: "2023-10-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 9",
          },
        ],
      });
    });

    it("should return 200 with if theworkspace manager and filter is not passed", async () => {
      const wsID = 24;
      const response = await supertest(app)
        .get(`/api/${wsID}/yourWork`)
        .expect(200);

      expect(response.body).toEqual({
        Work: [
          {
            taskID: 55,
            taskTitle: "dummy task 7",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 7",
          },
          {
            taskID: 54,
            taskTitle: "dummy task 8",
            taskStatus: "To Do",
            taskDeadline: "2023-12-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 8",
          },
          {
            taskID: 53,
            taskTitle: "dummy task 9",
            taskStatus: "To Do",
            taskDeadline: "2023-10-15T14:30:00.000Z",
            taskType: "task",
            taskDescription: "abc 9",
          },
        ],
      });
    });
  });
});*/

describe("stream", () => {
  describe("invalid workspace ID", () => {
    it("should return 400 with if the workspace_id is not a number", async () => {
      const wsID = "workspace_id";
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 400 with if workspace_id is not passed", async () => {
      var wsID;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(400);

      expect(response.body).toEqual({ Message: "Invalid wsID" });
    });

    it("should return 404 with if the workspace does not exist", async () => {
      const wsID = 987;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(404);

      expect(response.body).toEqual({ Message: "Workspace Doesn't Exist" });
    });
  });

  describe("unauthorized member", () => {
    it("should return 401 with if the workspace does not exist", async () => {
      const wsID = 20;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(401);

      expect(response.body).toEqual({
        Message: "You are not a part of the workspace",
      });
    });
  });

  describe("user is workspace manager", () => {
    it("should return 200 with if the workspace manager", async () => {
      const wsID = 19;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(200);

      expect(response.body).toEqual({
        Stream: [
          {
            objectID: 7,
            objectType: "Task",
            objectTitle: "Title",
            objectDescription: "New Description",
            objectStatus: "In Progress",
            created_at: "2023-11-24T20:05:10.939Z",
          },
          {
            objectID: 6,
            objectType: "Task",
            objectTitle: "demo task",
            objectDescription: "demo",
            objectStatus: "To Do",
            created_at: "2023-11-24T20:02:07.426Z",
          },
          {
            objectID: 5,
            objectType: "Task",
            objectTitle: "demo task",
            objectDescription: "demo",
            objectStatus: "To Do",
            created_at: "2023-11-24T19:56:47.785Z",
          },
          {
            objectID: 4,
            objectType: "Task",
            objectTitle: "demo task",
            objectDescription: "demo",
            objectStatus: "To Do",
            created_at: "2023-11-24T19:51:57.186Z",
          },
        ],
      });
    });
  });

  describe("user is workspace member", () => {
    it("should return 200 with if the workspace member", async () => {
      const wsID = 24;
      const response = await supertest(app)
        .get(`/api/${wsID}/stream`)
        .expect(200);

      expect(response.body).toEqual({
        Stream: [
          {
            objectID: 55,
            objectType: "Task",
            objectTitle: "dummy task 7",
            objectDescription: "abc 7",
            objectStatus: "To Do",
            created_at: "2023-11-25T20:46:15.620Z",
          },
          {
            objectID: 54,
            objectType: "Task",
            objectTitle: "dummy task 8",
            objectDescription: "abc 8",
            objectStatus: "To Do",
            created_at: "2023-11-25T20:46:07.262Z",
          },
          {
            objectID: 53,
            objectType: "Task",
            objectTitle: "dummy task 9",
            objectDescription: "abc 9",
            objectStatus: "To Do",
            created_at: "2023-11-25T20:45:57.777Z",
          },
        ],
      });
    });
  });
});
