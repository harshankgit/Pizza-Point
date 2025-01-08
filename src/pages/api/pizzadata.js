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
    if (req.method === "PUT") {
      const { id, title, category, foodType, price, description, img, options } = req.body;
    
      if (!id) {
        return res.status(400).json({ message: "ID is required to update the record" });
      }
    
      try {
        const updatedItem = await PizzaData.findByIdAndUpdate(
          id,
          { title, category, foodType, price, description, img, options },
          { new: true } // Return the updated document
        );
    
        if (!updatedItem) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        return res.status(200).json({ success: true, data: updatedItem });
      } catch (error) {
        console.error("Error updating record:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }if (req.method === "DELETE") {
      const { id } = req.body;
    
      if (!id) {
        return res.status(400).json({ message: "ID is required to delete the record" });
      }
    
      try {
        const deletedItem = await PizzaData.findByIdAndDelete(id);
    
        if (!deletedItem) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        return res.status(200).json({ success: true, message: "Item deleted successfully" });
      } catch (error) {
        console.error("Error deleting record:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
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
