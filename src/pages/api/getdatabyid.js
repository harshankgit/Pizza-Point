import db from "../../components/utils/db";
import PizzaData from "../../models/PizzaData";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();

    let data = await PizzaData.findById(req.body.item);

    res.status(200).json({ data });
  }
  //   db.disconnect();
}

// import db from "../../components/utils/db";
// import PizzaData from "../../models/PizzaData";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       await db.connect();

//       const { id } = req.body;

//       if (!id) {
//         return res
//           .status(400)
//           .json({ error: "ID is required in the request body" });
//       }

//       console.log("Received ID:", id);

//       const data = await PizzaData.findById("67752e3c77025eaca49177bb");

//       if (!data) {
//         return res.status(404).json({ error: "Data not found" });
//       }

//       res.status(200).json({ data });
//     } catch (error) {
//       console.error("Error occurred:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     } finally {
//       await db.disconnect();
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
