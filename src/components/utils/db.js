import mongoose from "mongoose";

// const { username, password } = process.env;
// const connectionMongoose = `mongodb+srv://${username}:${password}@cluster0.ijbuj.mongodb.net/pizza?retryWrites=true&w=majority&appName=Cluster0`;
const connectionMongoose = process.env.DB_URL;
const connection = {};

async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected");
      return;
    }

    const db = await mongoose.connect(connectionMongoose);
    console.log("New connection established");

    connection.isConnected = db.connection.readyState;
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

async function disconnect() {
  try {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        connection.isConnected = false;
        console.log("Disconnected from database");
      } else {
        console.log("Not in production, skipping disconnection");
      }
    } else {
      console.log("Not connected");
    }
  } catch (error) {
    console.error("Database disconnection error:", error.message);
  }
}

const db = { connect, disconnect };
export default db;
