import NasabahCol from "@/db/models/nasabah";
import errorHandling from "@/middlewares/errorHandling";
import connectDB from "@/db/connection";

async function getAllNasabah(req) {
  try {
    await connectDB();
    const nasabah = await NasabahCol.aggregate([
      {
        $project: {
          setoran_keluar: 0,
          history_setoran_masuk: 0,
        },
      },
    ]);
    return Response.json({ message: "Semua data nasabah", data: nasabah });
  } catch (error) {
    return errorHandling(error);
  }
}

export const GET = (req) => getAllNasabah(req);
