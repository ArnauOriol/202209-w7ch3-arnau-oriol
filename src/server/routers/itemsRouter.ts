import { Router } from "express";
import multer from "multer";
import path from "path";
import { createItem, getItems } from "../controllers/itemsControllers.js";

// eslint-disable-next-line new-cap
const itemsRouter = Router();

const upload = multer({
  dest: path.join("assets", "images"),
});

itemsRouter.get("/list", getItems);
itemsRouter.post("/new-item", upload.single("picture"), createItem);

export default itemsRouter;
