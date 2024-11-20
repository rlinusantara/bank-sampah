import connectDB from "@/db/connection";
import SetoranMasukCol from "@/db/models/setoran_masuk_nasabah";
import onlyLogin from "@/middlewares/onlyLogin";
import NasabahCol from "@/db/models/nasabah";

const { default: errorHandling } = require("@/middlewares/errorHandling");

const countNasabahTotalSampahTotalUang = async (req) => {
  try {
    await connectDB();

    const counting = await NasabahCol.aggregate([
      {
        $group: {
          _id: null,
          total_nasabah: { $sum: 1 },
          total_tabungan: { $sum: "$total_tabungan" },
          total_setoran: { $sum: "$total_setoran" },
        },
      },
      {
        $project: {
          _id: 0, // Menghapus field `_id` dari output
          total_nasabah: 1,
          total_tabungan: 1,
          total_setoran: 1,
        },
      },
    ]);

    return Response.json(
      { message: "Data setoran masuk", data: counting },
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
    return await onlyLogin(
      countNasabahTotalSampahTotalUang,
      req,
      process.env.SECRET_KEY
    );
  } catch (error) {
    return errorHandling(error);
  }
};
