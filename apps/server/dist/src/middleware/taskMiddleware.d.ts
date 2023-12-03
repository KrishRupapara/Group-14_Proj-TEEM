import { NextFunction, Request, Response } from "express";
export declare const taskExist: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorizeAssignee: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTaskDetails: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
