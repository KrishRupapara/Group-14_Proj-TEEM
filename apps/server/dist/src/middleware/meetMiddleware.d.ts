import { NextFunction, Request, Response } from "express";
export declare const meetExist: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorizeInvitee: (req: Request, res: Response, next: NextFunction) => Promise<void>;
