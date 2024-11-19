const { default: errorHandling } = require("@/middlewares/errorHandling");
import connectDB from "@/db/connection";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import jwtVerify from "@/helpers/jwtVerify";
import ResponseErr from "@/helpers/responseErr";
import AdminCol from "@/db/models/admin";

const isLogin = async (req) => {
  try {
    await connectDB();
    const cookie = await cookies();
    if (!cookie.has("secret")) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }

    const token = cookie.get("secret").value;
    const decoded = await jwtVerify(process.env.SECRET_KEY, token);

    if (!mongoose.isValidObjectId(decoded._id)) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    const checkAdmin = await AdminCol.findById(decoded._id);
    if (!checkAdmin) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }
    return Response.json({ message: "Sudah login" }, { status: 200 });
  } catch (error) {
    return errorHandling(error);
  }
};

export const POST = (req) => isLogin(req);
