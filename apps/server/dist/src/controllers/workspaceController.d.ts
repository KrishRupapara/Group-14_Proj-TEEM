import { Request, Response } from "express";
export declare const createWorkspacePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getWorkspace: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
