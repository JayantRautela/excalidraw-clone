import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.headers['authorization']?.split('')[1];

        if (!token) {
            res.status(403).json({
                message: "Unauthorized",
                success: false
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { 
            email: string; 
            id: string; 
            name: string; 
        } & JwtPayload;

        // @ts-ignore
        req.user = decoded;
    } catch (error) {
        console.error("Some Error Occured :- ", error);
        res.status(500).json({
            message: "Some Error Occured",
            success: false
        });
        return;
    }
}