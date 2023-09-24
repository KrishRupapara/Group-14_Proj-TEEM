import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  // const { email, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).send({ error: "Username and password required" });
  // }
  console.log(req.body);

  res.send({ message: "Signup successful" });
};
