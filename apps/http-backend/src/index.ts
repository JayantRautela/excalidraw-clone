import express from "express";
import UserRouter from "./routes/user.route";
import RoomRouter from "./routes/room.route";
import ChatRouter from "./routes/chat.route";

const app = express();

app.use(express.json());

app.use('/api/user', UserRouter);
app.use('/api/room', RoomRouter);
app.use('/api/chat', ChatRouter);

app.listen(3001);