import { Request, Response } from "express";
export declare const dashboardGet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const profileGet: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const profilePATCH: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const profileDELETE: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
