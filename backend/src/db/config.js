import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "🚀 Databse Connected SuccessFully With " + mongoose.connection.host
    );
  } catch (error) {
    console.log(error, "Error while connecting Database :)");
  }
};
