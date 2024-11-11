import jwtVerify from "@/helpers/jwtVerify";
import ResponseErr from "@/helpers/responseErr";
import { cookies } from "next/headers";
import errorHandling from "./errorHandling";
import mongoose from "mongoose";
import AdminCol from "@/db/models/admin";

const onlyLogin = async (handler, req, secret) => {
  try {
    const cookie = await cookies();
    if (!cookie.has("secret")) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    const token = cookie.get("secret").value;
    const decoded = await jwtVerify(secret, token);

    if (!mongoose.isValidObjectId(decoded._id)) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    const checkAdmin = await AdminCol.findById(decoded._id);
    if (!checkAdmin) {
      throw new ResponseErr(401, "Silahkan login terlebih dahulu");
    }

    return handler(req);
  } catch (error) {
    return errorHandling(error, req);
  }
};

export default onlyLogin;
