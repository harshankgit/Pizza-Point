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

import db from "../../components/utils/db";
import Users from "../../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecure = process.env.JWT_SECRET;

export default async function handler(req, res) {
  let success = false;

  if (req.method === "POST") {
    // Connect to the database
    db.connect();

    const { email, password } = req.body;

    try {
      // Find the user by email
      let user = await Users.findOne({ email });

      // If user does not exist, send an error response
      if (!user) {
        return res.status(400).json({ success, error: "User not found" });
      }

      // Compare provided password with the stored hashed password
      const pwdcompare = await bcrypt.compare(password, user.password);

      // If password doesn't match, send an error response
      if (!pwdcompare) {
        return res.status(400).json({ success, error: "Incorrect password" });
      }

      // Generate the JWT token with user id
      const data = {
        user: {
          id: user["_id"],
        },
      };

      // Create a token with the user data and secret
      const authToken = jwt.sign(data, jwtsecure);

      // Get the user's admin status
      const isAdmin = user.isAdmin;

      // Mark the request as successful
      success = true;

      // Send the successful response with token and admin status
      return res.json({ success, authToken, isAdmin });
    } catch (err) {
      console.error("Error during login: ", err);
      // Send an internal server error if any issues occur
      return res.status(500).send("Server error");
    }
  } else {
    // Handle non-POST requests (if needed)
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }
}
