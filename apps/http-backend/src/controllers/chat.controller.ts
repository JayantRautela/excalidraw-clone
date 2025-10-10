import { prisma } from "@repo/db/client";
import { Request, Response, RequestHandler } from "express";

export const getChats: RequestHandler = async (req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId);

        if (!roomId) {
            res.status(400).json({
                message: "Room id is required",
                success: false
            });
            return;
        }

        const chats = await prisma.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 100
        });

        res.status(200).json({
            message: chats.length === 0 ? "No previous chats" : "Previous chats fetched",
            success: true,
            chats: chats
        });
        return;
    } catch (error) {
        console.error("Some Error Occured :-", error);
        res.status(500).json({
            message: "Some Error Occured",
            success: false
        });
        return;
    }
}