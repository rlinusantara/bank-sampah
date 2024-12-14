import connectDB from "@/db/connection";
import NasabahCol from "@/db/models/nasabah";
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/app/middlewares/onlyLogin";

const { default: errorHandling } = require("@/app/middlewares/errorHandling");

const historySetoran = async (req) => {
  try {
    await connectDB();

    const data = await NasabahCol.aggregate([
      {
        $unwind: "$history_setoran_masuk",
      },
      {
        $project: {
          history_setoran_masuk: 1,
          nama: 1,
        },
      },
      {
        $sort: {
          tanggal_setoran: -1,
        },
      },
    ]);

    return Response.json(
      { message: "History setoran masuk", data },
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
    return await onlyLogin(historySetoran, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
