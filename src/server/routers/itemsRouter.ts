import { Router } from "express";
import { createItem, getItems } from "../controllers/itemsControllers.js";

// eslint-disable-next-line new-cap
const itemsRouter = Router();

itemsRouter.get("/list", getItems);
itemsRouter.post("/new-item", createItem);

export default itemsRouter;
