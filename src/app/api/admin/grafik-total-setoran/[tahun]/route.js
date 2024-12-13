const { default: errorHandling } = require("@/app/middlewares/errorHandling");
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/app/middlewares/onlyLogin";
import NasabahCol from "@/db/models/nasabah";

const grafikTotalSetoranPerTahun = async (req, params) => {
  try {
    const { tahun } = await params;
    const result = await NasabahCol.aggregate([
      {
        $unwind: "$history_setoran_masuk",
      },
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$history_setoran_masuk.tanggal_setoran" }, +tahun],
          },
        },
      },
      {
        $project: {
          nama: 1,
          jumlah_setoran: "$history_setoran_masuk.jumlah_setoran",
          bulan: { $month: "$history_setoran_masuk.tanggal_setoran" }, // Ambil bulan
        },
      },
      {
        $group: {
          _id: "$bulan", // Kelompokkan berdasarkan bulan
          total_setoran: { $sum: "$jumlah_setoran" }, // Jumlahkan setoran per bulan
        },
      },
      {
        $sort: { _id: 1 }, // Urutkan berdasarkan bulan (asc)
      },
    ]);

    return Response.json(
      { message: "Grafik total tabungan", data: result },
      { status: 200 }
    );
  } catch (error) {
    return errorHandling(error);
  }
};

export const GET = async (req, { params }) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(
      grafikTotalSetoranPerTahun,
      req,
      process.env.SECRET_KEY,
      params
    );
  } catch (error) {
    return errorHandling(error);
  }
};
