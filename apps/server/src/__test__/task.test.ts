import supertest from "supertest"; 
import { app } from "../index";

import * as authMiddleware from '../middleware/authMiddleware'; // Import your actual authentication middleware module
import { wsExist } from "../middleware/index";

// Mock the entire authMiddleware module
jest.mock('../middleware/authMiddleware', () => ({
    requireAuth: jest.fn((req, res, next) => {
      // Bypass authentication logic for testing purposes
      req.user = { userID: 15, name: "mihir_paija", isVerified: true };
      next();
    }),
  }));


//Assign Task

describe("assignTaskPost", () => {
    it("should assign a task with all workspace assignees and return a status code of 201 with success message", async () => {
      // Mock request data
      const requestData = {
        title: "demo task",
        description: "demo",
        taskType: "type 1",
        deadline: "2023-12-31 03:00:00",
        Assignees: [
            
              "dummy1@gmail.com"
            
        ]
      };
  
      // Mock workspace ID
      const wsID = 19;

      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(201);
  
      // Assertions
      const expectedResponse = {
        message: "Task assigned successfully",
        assignee: requestData.Assignees
      };
   
     console.log(response.body);
     expect(response.body).toEqual(expectedResponse);
     
  
    });

    it("should assign a task only to workspace members and return a status code of 201 with success message and classify non workspace but registered assignees", async () => {
      // Mock request data
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
  
      // Mock workspace ID
      const wsID = 19;

      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(201);
  
      // Assertions
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
      // Mock request data
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
  
      // Mock workspace ID
      const wsID = 19;

      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(201);
  
      // Assertions
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
      // Mock request data
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
  
      // Mock workspace ID
      const wsID = 19;

      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(201);
  
      // Assertions
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
      // Mock request data with missing title
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
  
      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(401);

      const expectedResponse = {
        error: "You do not own the workspace"
      };
  
      expect(response.body).toEqual(expectedResponse);
    });
  

    it("should return a status code of 400 and an error message for missing title", async () => {
      // Mock request data with missing title
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
  
      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(400);
  
      // Assertions
      const expectedResponse = {
        error: "Enter Mandatory Fields"
      };
  
      expect(response.body).toEqual(expectedResponse);
    });

    it("should return a status code of 400 and an error message for missing deadline", async () => {
      // Mock request data with missing title
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
  
      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(400);
  
      // Assertions
      const expectedResponse = {
        error: "Enter Mandatory Fields"
      };
  
      expect(response.body).toEqual(expectedResponse);
    });

    it("should return a status code of 404 as the workspace doesnt exist", async () => {
      // Mock request data with missing title
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
  
      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(404);
  
      // Assertions
      const expectedResponse = {
        Message: "Workspace Doesn't Exist" 
      };
  
      expect(response.body).toEqual(expectedResponse);
    });

    it("should return a status code of 400 and an error message of invalid workspace ID", async () => {
      // Mock request data with missing title
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
  
      // Make the request using supertest
      const response = await supertest(app)
        .post(`/api/${wsID}/assignTask`)
        .send(requestData)
        .expect(400);

      const expectedResponse = {
        Error: "Invalid wsID"
      };
  
      expect(response.body).toEqual(expectedResponse);
    });
  });



//Edit Task Details

describe('editTaskDetailsGet', () => {

  it('should fetch the task details successfully and return a status code of 200', async () => {

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskDetails`)
    .expect(200);


    //Task Details for taskID = 64
    const expectedResponse = {
        Title: "Title",
        Description: "New Description",
        Deadline: "2023-12-30T18:30:00.000Z",
        Status: "In Progress"
    
    };

    expect(response.body).toEqual(expectedResponse)
  });

  it('should return a status code of 404 as workspace doesnt exist', async () => {

    // Mock request parameters
      const wsID =  27;
      const taskID =  64;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskDetails`)
    .expect(404);

    const expectedResponse = {
      Message: "Workspace Doesn't Exist" 
    };

    expect(response.body).toEqual(expectedResponse)
  });

  it('should return a status code of 404 as task doesnt exist within the given workspace', async () => {

    // Mock request parameters
      const wsID =  19;
      const taskID =  55;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskDetails`)
    .expect(404);

    const expectedResponse = {
      Message: "Task Doesn't Exist" 
    };

    expect(response.body).toEqual(expectedResponse)
  });

  it('should return a status code of 400 and an error message of invalid workspace ID', async () => {

    // Mock request parameters
      const wsID =  "19abc";
      const taskID =  64;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskDetails`)
    .expect(400);

    const expectedResponse = {
      Error: "Invalid wsID"
    };

    expect(response.body).toEqual(expectedResponse);
  });

  it('should return a status code of 400 and an error message of invalid task ID', async () => {

    // Mock request parameters
      const wsID =  19;
      const taskID =  "7xyz";
   
    const response = await supertest(app)
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
    // Mock request data
    const requestData = {
      title: "Title",
      description: "New Description",
      deadline: "2023-12-31 00:00:00",
      type: "type 1",
      status: "In Progress"
    };

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
    .send(requestData)
    .expect(200);

    const expectedResponse = {
      message: "Task Edited Successfully"
    };

    expect(response.body).toEqual(expectedResponse)

  });

  it('should give an error as title is undefined', async () => {
    // Mock request data
    const requestData = {
      description: "New Description",
      deadline: "2023-12-31 00:00:00",
      type: "type 1",
      status: "In Progress"
    };

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      error: "Fields are required" 
    };

    expect(response.body).toEqual(expectedResponse)

  });

  it('should give an error as description is undefined', async () => {
    // Mock request data
    const requestData = {
      title: "New Task",
      deadline: "2023-12-31 00:00:00",
      type: "type 1",
      status: "In Progress"
    };

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      error: "Fields are required" 
    };

    expect(response.body).toEqual(expectedResponse)

  });

  it('should give an error as type is undefined', async () => {
    // Mock request data
    const requestData = {
      title: "New Task",
      description: "New Description",
      deadline: "2023-12-31 00:00:00",
      status: "In Progress"
    };

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      error: "Fields are required" 
    };

    expect(response.body).toEqual(expectedResponse)

  });

  it('should give an error as status is undefined', async () => {
    // Mock request data
    const requestData = {
      title: "New Task",
      description: "New Description",
      deadline: "2023-12-31 00:00:00",
      type: "type 1"
    };

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      error: "Fields are required" 
    };

    expect(response.body).toEqual(expectedResponse)

  });

  it('should give an error as title is null', async () => {
    // Mock request data
    const requestData = {
      title: "",
      description: "New Description",
      deadline: "2023-12-31 00:00:00",
      type: "type 1",
      status: "In Progress"
    };

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskDetails`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      error: "Title can not be empty" 
    };

    expect(response.body).toEqual(expectedResponse)

  });

  it('should return a status code of 400 and an error message of invalid workspace ID', async () => {

    // Mock request parameters
      const wsID =  "19abc";
      const taskID =  64;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskDetails`)
    .expect(400);

    const expectedResponse = {
      Error: "Invalid wsID"
    };

    expect(response.body).toEqual(expectedResponse);
  });

  it('should return a status code of 400 and an error message of invalid task ID', async () => {

    // Mock request parameters
      const wsID =  19;
      const taskID =  "7xyz";
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskDetails`)
    .expect(400);

    const expectedResponse = {
      Error: "Invalid taskID"
    };

    expect(response.body).toEqual(expectedResponse);
  });  
});


//Edit Assignees

describe('editTaskAssigneesGet', () => {

  it('should fetch the task assignees successfully and return a status code of 200', async () => {

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/editTaskAssignees`)
    .expect(200);


    //Task Details for taskID = 64
    const expectedResponse = {
      Assignees: [
        {
            name: "dummy 1"
        }
    ]
    };

    expect(response.body).toEqual(expectedResponse)
  });

});



describe('editTaskAssigneesPATCH', () => {
  
  it('should edit task assignees successfully and return a status code 201', async () => {
    // Mock request data
    const requestData = {
      Assignees: [
        { assignee_id: 'dummy1@gmail.com' },
      ],
    };

      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
    .send(requestData)
    .expect(201);

    const expectedResponse = {
      message: "Assigned Members Added",
      assignee: ["dummy1@gmail.com" ]
    };

    expect(response.body).toEqual(expectedResponse) 
  });

  it('should edit task assignees successfully to workspace members, return a status code 201 and classify other assignees', async () => {
    // Mock request data
    const requestData = {
      Assignees: [
        { assignee_id: 'dummy1@gmail.com' },
        {assignee_id: 'test1@gmail.com'},
        {assignee_id: 'test2@gmail.com'}
      ],
    };

      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
    .send(requestData)
    .expect(201);

    const expectedResponse = {
        message: "Task assigned only to workspace member",
        memberAssignee: ["dummy1@gmail.com"],
        NonmemberAssignee: ["test1@gmail.com"],
        unregisteredAssignee:[ "test2@gmail.com"]
    };

    expect(response.body).toEqual(expectedResponse) 
  });

  it('should handle empty Assignees', async () => {
    const requestData = {
      Assignees: [],
    };

      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      Error: "Can't Add Empty Assignees"
    };

    expect(response.body).toEqual(expectedResponse) 
  });

  it('should not make any changes if no assignee is part of the workspace', async () => {
    const requestData = {
      Assignees: [
        {assignee_id: 'test1@gmail.com'}
      ],
    };

      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .patch(`/api/${wsID}/${taskID}/editTaskAssignees`)
    .send(requestData)
    .expect(400);

    const expectedResponse = {
      Error: "No changes made as no assignee is part of the workspace"
    };

    expect(response.body).toEqual(expectedResponse) 
  });
  
});



// Delete Task

describe('deleteTask', () => {

 it('should delete task succesfully and return a status code of 200', async () => {

    const wsID =  19;
    const taskID = 69;
 
  const response = await supertest(app)
  .delete(`/api/${wsID}/${taskID}/editTaskDetails`)
  .expect(200);

  const expectedResponse = {
    message: "Task deleted successfully",
    EXPECTED: "Task must be deleted from taskassignees table also"
  };

  expect(response.body).toEqual(expectedResponse) 
});

it('should return a status code of 401 with an error message that the user isnt the project manager', async () => {

  const wsID =  47;
  const taskID =  71;

const response = await supertest(app)
.delete(`/api/${wsID}/${taskID}/editTaskDetails`)
.expect(401);

const expectedResponse = {
  error: "You do not own the workspace"
};

expect(response.body).toEqual(expectedResponse) 
});
});


//Task Dashboard

describe('taskDashboard', () =>{
  it('should fetch the task details successfully and return a status code of 200', async () => {

    // Mock request parameters
      const wsID =  19;
      const taskID =  64;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/taskDashboard`)
    .expect(200);


    //Task Details for taskID = 64
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
    }

    expect(response.body).toEqual(expectedResponse)
  });

  it('should return a status code of 401 as the user is not an assignee', async () => {

    // Mock request parameters
      const wsID =  54;
      const taskID = 74;
   
    const response = await supertest(app)
    .get(`/api/${wsID}/${taskID}/taskDashboard`)
    .expect(401);

    const expectedResponse = {
      error: "You have not been assigned to this task"
    };

    expect(response.body).toEqual(expectedResponse)
  });
})







  