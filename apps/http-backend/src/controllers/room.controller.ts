import { prisma } from "@repo/db/client";
import { Request, RequestHandler, Response } from "express";

export const getRoomId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { slug } = req.body();

        if (!slug) {
            res.status(400).json({
                message: "Slug is requried",
                success: false
            });
            return;
        }

        const room = await prisma.room.findUnique({
            where: {
                slug: slug
            }
        });

        if (!room) {
            res.status(404).json({
                message: "Room not found",
                success: false
            });
            return;
        }

        res.status(200).json({
            message: "Room id fetched",
            success: true,
            roomId: room.id
        });
        return;
    } catch (error) {
        console.error("Some Error Occured :- ", error);
        res.status(500).json({
            message: "Some Error Occured",
            sucess: false
        });
        return;
    }
}