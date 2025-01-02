import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    foodType: { type: String, required: true },
    price: { type: Object, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    options: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const PizzaData =
  mongoose.models.PizzaDatas || mongoose.model("PizzaDatas", dataSchema);

export default PizzaData;
