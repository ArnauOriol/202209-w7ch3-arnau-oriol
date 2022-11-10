import type { Response } from "express";
import Item from "../../database/models/Item";
import type { CustomRequest } from "../types/types";

export const getItems = (req: CustomRequest, res: Response) => {
  const { userId } = req;

  const userItems = Item.find({ propertyOf: userId });

  res.status(200).json({ userItems });
};
