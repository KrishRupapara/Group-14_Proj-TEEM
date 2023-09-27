import jwt from 'jsonwebtoken';
// import {VerifyErrors}  from 'jsonwebtoken';
// import {JwtPayload}  from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';

export const requireAuth = (req : Request ,res : Response ,next : NextFunction) => {
    const token = req.signedCookies.jwtToken;
    console.log(token);
    // check json web token exists & is verified
    if(token){

        jwt.verify(token, JSON.stringify(process.env.JWT_SECRET) , (err : any ,decodedToken: any) => {
            if(err){
                console.log(err.meesage);
                res.send("Login again");
                // res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });


    }else{
        // res.redirect('/login');
        res.send("Login again");
    }
}