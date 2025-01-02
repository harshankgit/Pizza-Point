import db from "../../components/utils/db";
import PizzaData from "../../models/PizzaData";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    for (let i = 0; i < req.body.length; i++) {
      let pizza = new PizzaData({
        title: req.body[i].title,
        category: req.body[i].category,
        foodType: req.body[i].foodType,
        price: req.body[i].price,
        description: req.body[i].description,
        img: req.body[i].img,
        options: req.body[i].options,
      });
      console.log("pizza", pizza);
      await pizza.save();
    }
    res.status(200).json({ data: "done hai" });
  }

  if (req.method === "GET") {
    await db.connect();
    let data = await PizzaData.find();
    res.status(200).json({ data });
  }
}
