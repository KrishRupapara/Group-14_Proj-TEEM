import express, { Request, Response } from 'express';

// const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

export const  attachCookiesToResponse = ( res : Response, userJwtToken : string) => {
//   const token = createJWT({ payload: user });

  const expiresIn = 1000 * 60 * 60 * 24; // one day

  res.cookie('jwtToken', userJwtToken, {
    httpOnly: true,
    expires: new Date(Date.now() + expiresIn),
    // secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

// module.exports = {
//   createJWT,
//   isTokenValid,
//   attachCookiesToResponse,
// };
