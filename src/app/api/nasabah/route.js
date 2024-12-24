import NasabahCol from "@/db/models/nasabah";
import errorHandling from "@/app/middlewares/errorHandling";
import connectDB from "@/db/connection";
import HargaSampahCol from "@/db/models/harga_sampah";

async function getAllNasabah(req) {
  try {
    await connectDB();
    const hargaSampah = await HargaSampahCol.findOne();
    const nasabah = await NasabahCol.aggregate([
      {
        $sort: {
          total_tabungan: -1,
        },
      },
      {
        $project: {
          setoran_keluar: 0,
          history_setoran_masuk: 0,
        },
      },
    ]);
    return Response.json({
      message: "Semua data nasabah",
      data: nasabah,
      harga_satuan: hargaSampah.harga_satuan,
    });
  } catch (error) {
    return errorHandling(error);
  }
}

export const GET = (req) => getAllNasabah(req);
