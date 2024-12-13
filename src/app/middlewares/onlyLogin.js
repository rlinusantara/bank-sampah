import jwtVerify from "@/helpers/jwtVerify";
import ResponseErr from "@/helpers/responseErr";
import { cookies } from "next/headers";
import errorHandling from "./errorHandling";
import mongoose from "mongoose";
import AdminCol from "@/db/models/admin";
import connectDB from "@/db/connection";

const onlyLogin = async (handler, req, secret, params = {}) => {
  try {
    await connectDB();
    const cookie = await cookies();
    if (!cookie.has("secret")) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    const token = cookie.get("secret").value;
    const decoded = await jwtVerify(secret, token);

    if (!mongoose.isValidObjectId(decoded._id)) {
      cookie.set("secret", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        priority: "high",
      });

      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    const checkAdmin = await AdminCol.findById(decoded._id);
    if (!checkAdmin) {
      cookie.set("secret", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        priority: "high",
      });

      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    return await handler(req, params);
  } catch (error) {
    return errorHandling(error, req);
  }
};

export default onlyLogin;
