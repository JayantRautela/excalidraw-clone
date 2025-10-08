import express from "express";
import UserRouter from "./routes/user.route";
import RoomRouter from "./routes/room.route";

const app = express();

app.use(express.json());

app.use('/api/user', UserRouter);
app.use('/api/room', RoomRouter);

app.listen(3001);