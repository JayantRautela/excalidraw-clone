
export interface Admin {
    id: string;
    email: string;
    name: string;
    photo: string;
    chats: Chat[]
    rooms: Room[]
    createdAt: Date;
    updatedAt: Date;
}

export interface Chat {
    id: number;
    message: string;
    roomId: number;
    room: Room;
    userId: string;
    user: Admin;
    createdAt: Date;
    updatedAt: Date;
}

export interface Room {
    id: number
    slug: string;  
    adminId: string;
    admin: Admin;
    chats: Chat[]
    createdAt: Date; 
    updatedAt: Date; 
}