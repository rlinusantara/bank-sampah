import connectDB from "@/db/connection";
import AdminCol from "@/db/models/admin";
import ResponseErr from "@/helpers/responseErr";
import errorHandling from "@/app/middlewares/errorHandling";
import AuthValidation from "@/validation/auth";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function login(req) {
  try {
    await connectDB();
    const body = await req.json();
    await AuthValidation.login(body);

    const checkAdmin = await AdminCol.findOne({ username: body.username });
    if (!checkAdmin) {
      throw new ResponseErr(400, "Periksa username atau password anda");
    }

    const checkPass = await argon2.verify(checkAdmin.password, body.password);
    if (!checkPass) {
      throw new ResponseErr(400, "Periksa username atau password anda");
    }

    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }

    const token = jwt.sign({ _id: checkAdmin._id }, process.env.SECRET_KEY, {
      expiresIn: 604800 * 1000,
    });

    const cookieStore = await cookies();
    cookieStore.set("secret", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 604800,
      priority: "high",
    });

    return Response.json({ message: "Berhasil login" }, { status: 200 });
  } catch (error) {
    return errorHandling(error);
  }
}

export const POST = (req) => login(req);
