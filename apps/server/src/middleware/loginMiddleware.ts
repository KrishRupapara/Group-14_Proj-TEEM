import jwt from 'jsonwebtoken';
// import {VerifyErrors}  from 'jsonwebtoken';
// import {JwtPayload}  from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';


export const requireAuth = (req : Request ,res : Response ,next : NextFunction) => {
    const token = req.cookies.jwtToken;

    // check json web token exists & is verified
    if(token){

        jwt.verify(token, JSON.stringify(process.env.JWT_SECRET) , (err : any ,decodedToken: any) => {
            if(err){
                console.log(err.meesage);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });


    }else{
        res.redirect('/login');
    }
}