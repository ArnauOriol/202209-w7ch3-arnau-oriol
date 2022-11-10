import type { NextFunction, Request, Response } from "express";
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

export const createItem = async (req: Request, res: Response) => {
  const { name } = req.body as ItemStructure;

  const createdItem = await Item.create({
    name,
  });

  res.status(201).json({ createdItem });
};
