import type { NextFunction, Request, Response } from "express";
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
