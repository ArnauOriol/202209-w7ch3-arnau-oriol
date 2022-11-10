import type { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import type { ItemStructure } from "../../database/models/Item.js";
import Item from "../../database/models/Item.js";

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await Item.find();

    res.status(200).json({ items });
  } catch (error: unknown) {
    next(error);
  }
};

export const createItem = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, ItemStructure>,
  res: Response
) => {
  const { name } = req.body;

  await fs.rename(
    path.join("assets", "images", req.file.filename),
    path.join("assets", "images", req.file.originalname)
  );

  const createdItem = await Item.create({
    name,
    picture: req.file.filename,
  });

  res
    .status(201)
    .json({ createdItem, picture: `assets/images/${createdItem.picture}` });
};
