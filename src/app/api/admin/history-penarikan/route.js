import connectDB from "@/db/connection";
import NasabahCol from "@/db/models/nasabah";
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/middlewares/onlyLogin";

const { default: errorHandling } = require("@/middlewares/errorHandling");

const historyPenarikan = async (req) => {
  try {
    await connectDB();

    const data = await NasabahCol.aggregate([
      {
        $unwind: "$setoran_keluar",
      },
      {
        $project: {
          setoran_keluar: 1,
          nama: 1,
        },
      },
      {
        $sort: {
          tanggal_setoran_keluar: -1,
        },
      },
    ]);

    return Response.json(
      { message: "History penarikan", data },
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
    return await onlyLogin(historyPenarikan, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
