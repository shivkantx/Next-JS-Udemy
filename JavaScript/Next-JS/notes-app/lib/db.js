import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URL);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB:", db.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
