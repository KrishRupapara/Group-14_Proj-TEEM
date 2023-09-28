// create json web token
import jwt from 'jsonwebtoken';


// import { users } from "../db/schema";
// type _id = typeof users.id;

const maxAge = 24 * 60 * 60; // 1 day

const secertKey = process.env.JWT_SECRET;

export const createTokenUserJWT = (id: number) => {
  return jwt.sign( { id } , JSON.stringify(secertKey) , {
    expiresIn: maxAge,
  });
};
