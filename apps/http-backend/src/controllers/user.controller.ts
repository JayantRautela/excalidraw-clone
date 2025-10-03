import { prisma } from "@repo/db/client";
import { Request, Response, RequestHandler } from "express";
import { signupSchema } from "@repo/common/schema";
import bcrypt from "bcryptjs";

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