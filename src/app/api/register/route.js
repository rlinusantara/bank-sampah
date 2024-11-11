import AuthValidation from "@/validation/auth";
import errorHandling from "@/middlewares/errorHandling";
import connectDB from "@/db/connection";
import AdminCol from "@/db/models/admin";
import ResponseErr from "@/helpers/responseErr";
import argon2 from "argon2";

async function register(req) {
  try {
    await connectDB();
    const body = await req.json();
    await AuthValidation.register(body);
    body.password = await argon2.hash(body.password);

    const checkAdmin = await AdminCol.findOne({ username: body.username });
    if (checkAdmin) {
      throw new ResponseErr(400, "Admin sudah ada");
    }

    const insert = new AdminCol(body);
    await insert.save();

    return Response.json({ message: "Berhasil register" }, { status: 200 });
  } catch (error) {
    return errorHandling(error);
  }
}

export const POST = (req) => register(req);
