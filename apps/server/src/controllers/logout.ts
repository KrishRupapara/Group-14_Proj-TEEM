import { Request, Response } from "express";

export const logoutGet = async(req: Request, res: Response)=>{
    
    try {
      
      // res.clearCookie("jwtToken"); 
      
      res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      });
      
      res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      });

      res.status(200).send({ message: "Logout successful" });
   
  

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
    

}