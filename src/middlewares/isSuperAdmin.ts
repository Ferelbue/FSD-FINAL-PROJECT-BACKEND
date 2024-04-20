import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if(req.tokenData.roleName !== 'admin' && req.tokenData.roleName !== 'super-admin'){
        return res.status(401).json(
            {
                success: false,
                message: "UNAUTHORIZED",
            }
        )
        }

     next();
     
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "YOU DONT HAVE PERMITIONS",
            }
        )
    }
}
