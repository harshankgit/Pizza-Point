import db from "../../components/utils/db";

export default async function handler(req, res) {
  await db.connect();
  res.status(200).json({ name: "rohan" });
}
