import connectDB from "@/db/connection";
import SetoranMasukCol from "@/db/models/setoran_masuk_nasabah";
import onlyLogin from "@/app/middlewares/onlyLogin";

const { default: errorHandling } = require("@/app/middlewares/errorHandling");

const getAllSetoranMasuk = async (req) => {
  try {
    await connectDB();

    const setoranMasuk = await SetoranMasukCol.find().sort({
      tanggal_setoran: -1,
    });

    return Response.json(
      { message: "Data setoran masuk", data: setoranMasuk },
      { status: 200 }
    );
  } catch (error) {
    return errorHandling(error);
  }
};

export const GET = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(getAllSetoranMasuk, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
