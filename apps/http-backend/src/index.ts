import express from "express";
import UserRouter from "./routes/user.route";

const app = express();

app.use(express.json());

app.use('/api/user', UserRouter);

app.listen(3001);