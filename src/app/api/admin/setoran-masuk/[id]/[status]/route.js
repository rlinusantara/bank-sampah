const { default: connectDB } = require("@/db/connection");
const { default: errorHandling } = require("@/middlewares/errorHandling");
import SetoranMasukCol from "@/db/models/setoran_masuk_nasabah";
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/middlewares/onlyLogin";

const handleSetoranMasuk = async (res, params) => {
  try {
    await connectDB();
    const { id, status } = await params;
    if (status !== "tolak") {
      throw new ResponseErr(400, "Status not allowed");
    }

    await SetoranMasukCol.deleteOne({ _id: id });

    return Response.json({ message: "status" }, { status: 200 });
  } catch (error) {
    return errorHandling(error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(
      handleSetoranMasuk,
      req,
      process.env.SECRET_KEY,
      params
    );
  } catch (error) {
    return errorHandling(error);
  }
};
