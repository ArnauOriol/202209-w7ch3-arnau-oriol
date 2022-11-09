import express from "express";
import morgan from "morgan";
import notFoundError from "./middleware/errors.js";
import usersRouter from "./routers/usersRouters.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use("/", notFoundError);

export default app;
