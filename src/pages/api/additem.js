import db from "../../components/utils/db";
import PizzaData from "../../models/PizzaData";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();

    try {
      let pizza = new PizzaData({
        title: req.body.title,
        category: req.body.category,
        foodType: req.body.foodType,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img,
        options: req.body.options,
      });

      await pizza.save();

      res.status(200).json({ success: true });
    } catch (err) {
      console.log("err", err);
    }
  }
  // db.disconnect();
}
