"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
jest.mock('../middleware/authMiddleware', () => ({
    requireAuth: jest.fn((req, res, next) => {
        req.user = { userID: 15, name: "mihir_paija", isVerified: true };
        next();
    }),
}));
describe("assignTaskPost", () => {
    it("should assign a task with all workspace assignees and return a status code of 201 with success message", async () => {
        const requestData = {
            title: "demo task",
            description: "demo",
            taskType: "type 1",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com"
            ]
        };
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(201);
        const expectedResponse = {
            message: "Task assigned successfully",
            assignee: requestData.Assignees
        };
        console.log(response.body);
        expect(response.body).toEqual(expectedResponse);
    });
    it("should assign a task only to workspace members and return a status code of 201 with success message and classify non workspace but registered assignees", async () => {
        const requestData = {
            title: "demo task",
            description: "demo",
            taskType: "type 1",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
            ]
        };
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(201);
        const expectedResponse = {
            message: "Task assigned only to workspace member",
            memberAssignee: [
                "dummy1@gmail.com"
            ],
            NonmemberAssignee: [
                "test1@gmail.com"
            ],
            unregisteredAssignee: []
        };
        console.log(response.body);
        expect(response.body).toEqual(expectedResponse);
    });
    it("should assign a task only to workspace members and return a status code of 201 with success message and classify non-registered assignees", async () => {
        const requestData = {
            title: "demo task",
            description: "demo",
            taskType: "type 1",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test2@gmail.com"
            ]
        };
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(201);
        const expectedResponse = {
            message: "Task assigned only to workspace member",
            memberAssignee: [
                "dummy1@gmail.com"
            ],
            NonmemberAssignee: [],
            unregisteredAssignee: [
                "test2@gmail.com"
            ]
        };
        console.log(response.body);
        expect(response.body).toEqual(expectedResponse);
    });
    it("should assign a task only to workspace members and return a status code of 201 with success message and classify other assignees", async () => {
        const requestData = {
            title: "demo task",
            description: "demo",
            taskType: "type 1",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
                "test2@gmail.com"
            ]
        };
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(201);
        const expectedResponse = {
            message: "Task assigned only to workspace member",
            memberAssignee: [
                "dummy1@gmail.com"
            ],
            NonmemberAssignee: [
                "test1@gmail.com"
            ],
            unregisteredAssignee: [
                "test2@gmail.com"
            ]
        };
        console.log(response.body);
        expect(response.body).toEqual(expectedResponse);
    });
    it("should return a status code of 401 and an error message that the user is not the owner of the workspace", async () => {
        const requestData = {
            title: "Title",
            description: "Task Description",
            taskType: "Type",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
                "dummy2@gmail.com"
            ]
        };
        const wsID = 47;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(401);
        const expectedResponse = {
            error: "You do not own the workspace"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it("should return a status code of 400 and an error message for missing title", async () => {
        const requestData = {
            description: "Task Description",
            taskType: "Type",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
                "dummy2@gmail.com"
            ]
        };
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Enter Mandatory Fields"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it("should return a status code of 400 and an error message for missing deadline", async () => {
        const requestData = {
            title: "Demo Task",
            description: "Task Description",
            taskType: "Type",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
                "dummy2@gmail.com"
            ]
        };
        const wsID = 19;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Enter Mandatory Fields"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it("should return a status code of 404 as the workspace doesnt exist", async () => {
        const requestData = {
            title: "Title",
            description: "Task Description",
            taskType: "Type",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
                "dummy2@gmail.com"
            ]
        };
        const wsID = 127;
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(404);
        const expectedResponse = {
            Message: "Workspace Doesn't Exist"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it("should return a status code of 400 and an error message of invalid workspace ID", async () => {
        const requestData = {
            title: "Title",
            description: "Task Description",
            taskType: "Type",
            deadline: "2023-12-31 03:00:00",
            Assignees: [
                "dummy1@gmail.com",
                "test1@gmail.com",
                "dummy2@gmail.com"
            ]
        };
        const wsID = "19abc";
        const response = await (0, supertest_1.default)(index_1.app)
            .post(`/api/${wsID}/assignTask`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            Error: "Invalid wsID"
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
describe('editTaskDetailsGet', () => {
    it('should fetch the task details successfully and return a status code of 200', async () => {
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(200);
        const expectedResponse = {
            Title: "Title",
            Description: "New Description",
            Deadline: "2023-12-30T18:30:00.000Z",
            Status: "In Progress"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 404 as workspace doesnt exist', async () => {
        const wsID = 27;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(404);
        const expectedResponse = {
            Message: "Workspace Doesn't Exist"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 404 as task doesnt exist within the given workspace', async () => {
        const wsID = 19;
        const taskID = 55;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(404);
        const expectedResponse = {
            Message: "Task Doesn't Exist"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 400 and an error message of invalid workspace ID', async () => {
        const wsID = "19abc";
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(400);
        const expectedResponse = {
            Error: "Invalid wsID"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 400 and an error message of invalid task ID', async () => {
        const wsID = 19;
        const taskID = "7xyz";
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(400);
        const expectedResponse = {
            Error: "Invalid taskID"
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
describe('editTaskDetailsPATCH', () => {
    it('should edit task details successfully and return a status code of 200', async () => {
        const requestData = {
            title: "Title",
            description: "New Description",
            deadline: "2023-12-31 00:00:00",
            type: "type 1",
            status: "In Progress"
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
            .send(requestData)
            .expect(200);
        const expectedResponse = {
            message: "Task Edited Successfully"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should give an error as title is undefined', async () => {
        const requestData = {
            description: "New Description",
            deadline: "2023-12-31 00:00:00",
            type: "type 1",
            status: "In Progress"
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Fields are required"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should give an error as description is undefined', async () => {
        const requestData = {
            title: "New Task",
            deadline: "2023-12-31 00:00:00",
            type: "type 1",
            status: "In Progress"
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Fields are required"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should give an error as type is undefined', async () => {
        const requestData = {
            title: "New Task",
            description: "New Description",
            deadline: "2023-12-31 00:00:00",
            status: "In Progress"
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Fields are required"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should give an error as status is undefined', async () => {
        const requestData = {
            title: "New Task",
            description: "New Description",
            deadline: "2023-12-31 00:00:00",
            type: "type 1"
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Fields are required"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should give an error as title is null', async () => {
        const requestData = {
            title: "",
            description: "New Description",
            deadline: "2023-12-31 00:00:00",
            type: "type 1",
            status: "In Progress"
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            error: "Title can not be empty"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 400 and an error message of invalid workspace ID', async () => {
        const wsID = "19abc";
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(400);
        const expectedResponse = {
            Error: "Invalid wsID"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 400 and an error message of invalid task ID', async () => {
        const wsID = 19;
        const taskID = "7xyz";
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(400);
        const expectedResponse = {
            Error: "Invalid taskID"
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
describe('editTaskAssigneesGet', () => {
    it('should fetch the task assignees successfully and return a status code of 200', async () => {
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/editTaskAssignees`)
            .expect(200);
        const expectedResponse = {
            Assignees: [
                {
                    name: "dummy 1"
                }
            ]
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
describe('editTaskAssigneesPATCH', () => {
    it('should edit task assignees successfully and return a status code 201', async () => {
        const requestData = {
            Assignees: [
                { assignee_id: 'dummy1@gmail.com' },
            ],
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
            .send(requestData)
            .expect(201);
        const expectedResponse = {
            message: "Assigned Members Added",
            assignee: ["dummy1@gmail.com"]
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should edit task assignees successfully to workspace members, return a status code 201 and classify other assignees', async () => {
        const requestData = {
            Assignees: [
                { assignee_id: 'dummy1@gmail.com' },
                { assignee_id: 'test1@gmail.com' },
                { assignee_id: 'test2@gmail.com' }
            ],
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
            .send(requestData)
            .expect(201);
        const expectedResponse = {
            message: "Task assigned only to workspace member",
            memberAssignee: ["dummy1@gmail.com"],
            NonmemberAssignee: ["test1@gmail.com"],
            unregisteredAssignee: ["test2@gmail.com"]
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should handle empty Assignees', async () => {
        const requestData = {
            Assignees: [],
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            Error: "Can't Add Empty Assignees"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should not make any changes if no assignee is part of the workspace', async () => {
        const requestData = {
            Assignees: [
                { assignee_id: 'test1@gmail.com' }
            ],
        };
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
            .send(requestData)
            .expect(400);
        const expectedResponse = {
            Error: "No changes made as no assignee is part of the workspace"
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
describe('deleteTask', () => {
    it('should delete task succesfully and return a status code of 200', async () => {
        const wsID = 19;
        const taskID = 69;
        const response = await (0, supertest_1.default)(index_1.app)
            .delete(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(200);
        const expectedResponse = {
            message: "Task deleted successfully",
            EXPECTED: "Task must be deleted from taskassignees table also"
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 401 with an error message that the user isnt the project manager', async () => {
        const wsID = 47;
        const taskID = 71;
        const response = await (0, supertest_1.default)(index_1.app)
            .delete(`/api/${wsID}/${taskID}/editTaskDetails`)
            .expect(401);
        const expectedResponse = {
            error: "You do not own the workspace"
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
describe('taskDashboard', () => {
    it('should fetch the task details successfully and return a status code of 200', async () => {
        const wsID = 19;
        const taskID = 64;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/taskDashboard`)
            .expect(200);
        const expectedResponse = {
            Task: {
                taskID: 64,
                title: "Title",
                description: "New Description",
                taskType: "type 1",
                deadline: "2023-12-30T18:30:00.000Z",
                status: "In Progress",
                workspaceID: 19,
                createdAt: "2023-12-02T14:05:08.304Z"
            },
            Assignees: [
                {
                    assigneeID: 16,
                    assigneeName: "dummy 1",
                    assigneeRole: "TeamMate"
                }
            ]
        };
        expect(response.body).toEqual(expectedResponse);
    });
    it('should return a status code of 401 as the user is not an assignee', async () => {
        const wsID = 54;
        const taskID = 74;
        const response = await (0, supertest_1.default)(index_1.app)
            .get(`/api/${wsID}/${taskID}/taskDashboard`)
            .expect(401);
        const expectedResponse = {
            error: "You have not been assigned to this task"
        };
        expect(response.body).toEqual(expectedResponse);
    });
});
//# sourceMappingURL=task.test.js.map