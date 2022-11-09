import express from "express";
import morgan from "morgan";
import notFoundError from "./middleware/errors.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(notFoundError);

export default app;
