import NasabahCol from "@/db/models/nasabah";
import errorHandling from "@/middlewares/errorHandling";
import connectDB from "@/db/connection";

async function getAllNasabahGrafik(req) {
  try {
    await connectDB();
    const nasabah = await NasabahCol.aggregate([
      {
        $group: {
          _id: null,
          nama: { $push: "$nama" },
          total_tabungan: { $push: "$total_tabungan" },
          total_setoran: { $push: "$total_setoran" },
        },
      },
      { $project: { _id: 0 } },
    ]);
    return Response.json({ message: "Semua data nasabah", data: nasabah });
  } catch (error) {
    return errorHandling(error);
  }
}

export const GET = (req) => getAllNasabahGrafik(req);
