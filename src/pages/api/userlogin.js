// import db from "../../components/utils/db";
// import Users from "../../models/Users";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const jwtsecure = process.env.JWT_SECRET;
// export default async function handler(req, res) {
//   let success = false;
//   if (req.method === "POST") {
//     db.connect();
//     const { email, password } = req.body;
//     try {
//       let user = await Users.findOne({ email });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ success, error: "try logging with correct password" });
//       }
//       const pwdcompare = await bcrypt.compare(password, user.password);
//       if (!pwdcompare) {
//         return res
//           .status(400)
//           .json({ success, error: "try logging with correct password" });
//       }
//       const data = {
//         user: {
//           id: user["_id"],
//         },
//       };

//       const authToken = jwt.sign(data, jwtsecure);
//       const isAdmin = await user.isAdmin;
//       success = true;
//       res.json({ success, authToken, isAdmin });
//     } catch (err) {
//       console.log("err", err);
//       res.send("server error");
//     }
//   }
//   res.status(200).json({ name: "done" });
// }

import Cors from "cors";
import db from "../../components/utils/db";
import Users from "../../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecure = process.env.JWT_SECRET;

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
});

// Function to run the CORS middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Run the middleware

  let success = false;

  if (req.method === "POST") {
    db.connect();
    const { email, password } = req.body;

    try {
      let user = await Users.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success, error: "User not found, check your email" });
      }

      const pwdcompare = await bcrypt.compare(password, user.password);
      if (!pwdcompare) {
        return res
          .status(400)
          .json({ success, error: "Incorrect password, try again" });
      }

      const data = {
        user: {
          id: user["_id"],
        },
      };

      const authToken = jwt.sign(data, jwtsecure);

      const isAdmin = user.isAdmin;
      success = true;

      return res.json({ success, authToken, isAdmin });
    } catch (err) {
      console.error("Error during login: ", err);
      return res.status(500).send("Server error");
    }
  } else {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }
}
