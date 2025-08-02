import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Mongo DB connected : ${connect.connection.host}`);
  } catch (err: any) {
    console.log("Error connecting to mongo DB:", err.message);
    process.exit(1);
  }
};
