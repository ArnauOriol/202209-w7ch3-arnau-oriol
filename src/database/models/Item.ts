import { model, Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const ItemSchema = new Schema({
  picture: {
    type: String,
  },
  propertyOf: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
});

export type ItemStructure = InferSchemaType<typeof ItemSchema>;

const Item = model("Item", ItemSchema, "items");

export default Item;
