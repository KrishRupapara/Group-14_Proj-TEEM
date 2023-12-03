declare namespace Express {
  export interface Request {
    user: {
      userID: number;
      name: string;
      isVerified: boolean;
    };
    workspace :{
      workspaceID: number;
      title: string;
      projectManager: number;
    };
    task :{
      taskID: number;
      title: string;
      workspaceID: number | null;
    };
    meet :{
      meetID: number;
      title: string;
      workspaceID: number | null;
      organizerID : number;
    }
  }
}
