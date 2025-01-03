import db from "../../components/utils/db";
import Orders from "../../models/Orders";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    try {
      let data = await Orders.findOne({ email: req.body.email });
      res.json({ order_data: data });
    } catch (error) {
      console.log("Error:", error);
    }
  }
}
