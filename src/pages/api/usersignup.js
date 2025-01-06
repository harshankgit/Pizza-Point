// import bcrypt from "bcryptjs";
// import db from "../../components/utils/db";
// import Users from "../../models/Users";
// import jwt from "jsonwebtoken";

// const jwtsequre = "arfcvom@#rfc";

// export default async function handler(req, res) {
//   let success = false;
//   const salt = await bcrypt.genSalt(10);
//   let securePass = await bcrypt.hash(req.body.password, salt);
//   if (req.method === "POST") {
//     await db.connect();
//     try {
//       await Users.create({
//         name: req.body.name,
//         password: securePass,
//         email: req.body.email,
//       })
//         .then((user) => {
//           const data = {
//             user: {
//               id: user["_id"],
//             },
//           };
//           const authToken = jwt.sign(data, jwtsequre);
//           success = true;
//           res.json({ success, authToken });
//         })
//         .catch((err) => {
//           console.log(err, "message");
//         });
//     } catch (error) {
//       console.log("error:", error);
//     }
//   }

//   res.status(200).json({ name: "rohan" });
// }

// import bcrypt from "bcryptjs";
// import db from "../../components/utils/db";
// import Users from "../../models/Users";
// import jwt from "jsonwebtoken";
// // import Cors from "cors";
// const jwtsecure = process.env.JWT_SECRET; // Secure JWT secret (make sure this is not exposed in production)
// // const cors = Cors({
// //   methods: ["GET", "POST", "OPTIONS"],
// //   origin:
// //     "https://pizzapoints-ar35fkz81-harshanks-projects-1b7c664f.vercel.app", // replace with your front-end URL
// // });

// // // Helper function to run middleware
// // function runMiddleware(req, res, fn) {
// //   return new Promise((resolve, reject) => {
// //     fn(req, res, (result) => {
// //       if (result instanceof Error) {
// //         return reject(result);
// //       }
// //       return resolve(result);
// //     });
// //   });
// // }
// export default async function handler(req, res) {
//   // Ensure the request method is POST
//   // Set CORS headers to allow all origins
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     // Handle preflight request
//     res.status(200).end();
//     return;
//   }
//   // await runMiddleware(req, res, cors);
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     // Validate incoming data
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ error: "All fields (name, email, password) are required" });
//     }

//     try {
//       // Connect to the database
//       await db.connect();

//       // Encrypt password
//       const salt = await bcrypt.genSalt(10);
//       const securePass = await bcrypt.hash(password, salt);

//       // Create the user
//       const user = await Users.create({
//         name,
//         email,
//         password: securePass,
//       });

//       // Create JWT token
//       const data = {
//         user: {
//           id: user["_id"],
//         },
//       };
//       const authToken = jwt.sign(data, jwtsecure, { expiresIn: "1h" });
//       const isAdmin = await user.isAdmin;
//       // Send success response with the auth token
//       return res.status(200).json({ success: true, authToken, isAdmin });
//     } catch (error) {
//       console.log("Error:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   // If the method is not POST, return 405 Method Not Allowed
//   return res.status(405).json({ error: "Method Not Allowed" });
// }
import bcrypt from "bcryptjs";
import db from "../../components/utils/db";
import Users from "../../models/Users";
import jwt from "jsonwebtoken";

const jwtsecure = process.env.JWT_SECRET; // Ensure to use a secure secret in production

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    // Validate incoming data
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields (name, email, password) are required",
      });
    }

    try {
      // Connect to the database
      await db.connect();

      // Check if the user already exists based on email or name
      const existingUser = await Users.findOne({
        $or: [{ email }, { name }],
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "User with this email or name already exists",
        });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(password, salt);

      // Create the user
      const user = await Users.create({
        name,
        email,
        password: securePass,
      });

      // Create JWT token
      const data = {
        user: {
          id: user["_id"],
        },
      };
      const authToken = jwt.sign(data, jwtsecure, { expiresIn: "1h" });
      const isAdmin = user.isAdmin;

      // Send success response with the auth token and user details
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        authToken,
        isAdmin,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }

  // If the method is not POST, return 405 Method Not Allowed
  return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
