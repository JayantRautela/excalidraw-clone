import { prisma } from "@repo/db/client";
import { Request, Response, RequestHandler } from "express";
import { createRoomSchema, signinSchema, signupSchema } from "@repo/common/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

export const signup: RequestHandler = async (req: Request, res: Response) => {
    const { success, data, error } =  signupSchema.safeParse(req.body);
    if (!success) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "input validation error",
            error: error.issues
        });
        return;
    }
    try {
        const { email, password, name } = data;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            res.status(400).json({
                message: "User already exists",
                success: false
            });
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                photo: "" // uploading the photo to cloud and getting the url
            }
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true
        });
        return;
    } catch (error) {
        console.error("Some error occured :- ", error);
        res.status(500).json({
            message: "Some Error Occured",
            success: false,
        });
        return;
    }
}

export const signin: RequestHandler = async (req: Request, res: Response) => {
    const { success, data, error } = signinSchema.safeParse(req.body);

    if (!success) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "input validation error",
            error: error.issues
        });
        return;
    }
    try {
        const { email, password } = data;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            res.status(404).json({
                message: "user not found",
                success: false
            });
            return;
        }

        const userPassword = user.password;

        const isPasswordCorrect = bcrypt.compareSync(password, userPassword);

        if (!isPasswordCorrect) {
            res.status(403).json({
                message: "Incorrect Password",
                success: false
            });
            return;
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, JWT_SECRET!);

        res.status(200).json({
            message: "User logged in",
            token: token,
            success: true
        });
        return;
    } catch (error) {
        console.error("Some Error Occured :- ", error);
        res.status(500).json({
            message: "Some Error Occured",
            success: false
        });
        return;
    }
}

export const createRoom: RequestHandler = async (req: Request, res: Response) => {
    const { success, data, error } = createRoomSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({
            success: false,
            message: "input validation error",
            error: error.issues
        });
        return;
    }
    try {
        const { slug } = data;
        const admin = req.user;
        
        if (!admin) {
            res.status(404).json({
                message: "User not found",
                success: false
            });
            return;
        }
        const adminId = admin.id;

        await prisma.room.create({
            data: {
                slug: slug,
                admin: {
                    connect: { 
                        id: adminId
                    }
                }
            }
        });

        res.status(201).json({
            message: "Room created successfully",
            success: true
        });
        return;
    } catch (error) {
        console.error("Some Error Occured :- ", error);
        res.status(500).json({
            message: "Some Error Occured",
            success: false
        });
        return;
    }
}