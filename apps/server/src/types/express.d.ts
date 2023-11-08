declare namespace Express {
  export interface Request {
    user: {
      userID: number;
      name: string;
      isVerified: boolean;
    };
  }
}
