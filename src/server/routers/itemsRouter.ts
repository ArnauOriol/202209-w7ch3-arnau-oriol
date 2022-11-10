import { Router } from "express";
import { getItems } from "../controllers/itemsControllers.js";

// eslint-disable-next-line new-cap
const itemsRouter = Router();

itemsRouter.get("/list", getItems);

export default itemsRouter;
