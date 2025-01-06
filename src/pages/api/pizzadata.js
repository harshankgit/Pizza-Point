// import db from "../../components/utils/db";
// import PizzaData from "../../models/PizzaData";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     await db.connect();
//     for (let i = 0; i < req.body.length; i++) {
//       let pizza = new PizzaData({
//         title: req.body[i].title,
//         category: req.body[i].category,
//         foodType: req.body[i].foodType,
//         price: req.body[i].price,
//         description: req.body[i].description,
//         img: req.body[i].img,
//         options: req.body[i].options,
//       });

//       await pizza.save();
//     }
//     res.status(200).json({ data: "done hai" });
//   }

//   if (req.method === "GET") {
//     await db.connect();
//     let data = await PizzaData.find();
//     res.status(200).json({ data });
//   }
//   db.disconnect();
// }

import db from "../../components/utils/db";
import PizzaData from "../../models/PizzaData";

export default async function handler(req, res) {
  console.time("API Execution Time"); // Start timing

  try {
    await db.connect();
    console.timeLog("API Execution Time", "Connected to the database");

    if (req.method === "POST") {
      console.time("POST Request Time");

      const pizzas = req.body.map((pizza) => ({
        title: pizza.title,
        category: pizza.category,
        foodType: pizza.foodType,
        price: pizza.price,
        description: pizza.description,
        img: pizza.img,
        options: pizza.options,
      }));

      await PizzaData.insertMany(pizzas);

      console.timeEnd("POST Request Time");
      return res.status(200).json({ message: "Data inserted successfully" });
    }

    if (req.method === "GET") {
      console.time("GET Request Time");

      const data = await PizzaData.find();

      console.timeEnd("GET Request Time");
      return res.status(200).json({ data });
    }

    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await db.disconnect();
    console.timeLog("API Execution Time", "Disconnected from the database");
    console.timeEnd("API Execution Time"); // End timing
  }
}
