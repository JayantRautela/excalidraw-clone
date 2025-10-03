import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            email: string;
            id: string;
            name: string;
        } & JwtPayload
    }
}