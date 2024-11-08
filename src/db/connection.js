import ResponseErr from "@/helpers/responseErr";
import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("menggunakan koneksi lama");
    return;
  }
  const url = process.env.DB;

  if (!url) {
    throw new ResponseErr(500, "Env Err");
  }

  await mongoose.connect(url);
  isConnected = true;
}

export default connectDB;
