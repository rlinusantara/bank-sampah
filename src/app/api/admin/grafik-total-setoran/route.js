const { default: errorHandling } = require("@/app/middlewares/errorHandling");
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/app/middlewares/onlyLogin";
import NasabahCol from "@/db/models/nasabah";

const grafikTotalSetoranDefault = async (req) => {
  try {
    const tahun = new Date().getFullYear();
    const result = await NasabahCol.aggregate([
      {
        $unwind: "$history_setoran_masuk",
      },
      {
        $facet: {
          tahun: [
            {
              $project: {
                tahun: { $year: "$history_setoran_masuk.tanggal_setoran" },
              },
            },
            {
              $group: {
                _id: null,
                list_tahun: { $addToSet: "$tahun" },
              },
            },
            {
              $project: {
                _id: 0,
                list_tahun: 1,
              },
            },
          ],
          data: [
            {
              $match: {
                $expr: {
                  $eq: [
                    { $year: "$history_setoran_masuk.tanggal_setoran" },
                    tahun,
                  ],
                },
              },
            },
            {
              $project: {
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
          ],
        },
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

export const GET = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(
      grafikTotalSetoranDefault,
      req,
      process.env.SECRET_KEY
    );
  } catch (error) {
    return errorHandling(error);
  }
};
