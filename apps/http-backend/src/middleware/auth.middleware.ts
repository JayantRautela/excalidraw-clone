import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

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

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Invalid or expired token :- ", error);
        res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
        return;
    }
}