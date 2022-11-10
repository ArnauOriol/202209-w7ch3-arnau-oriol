import { model, Schema } from "mongoose";

const ItemSchema = new Schema({
  picture: {
    type: String,
  },
  propertyOf: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Item = model("Item", ItemSchema, "items");

export default Item;
