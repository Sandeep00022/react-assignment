import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// local modules
import taskRouter from "./routes/task.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tasks", taskRouter);
app.use("/user", userRouter);

export default app;
