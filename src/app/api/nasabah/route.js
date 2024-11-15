import NasabahCol from "@/db/models/nasabah";
import errorHandling from "@/middlewares/errorHandling";
import connectDB from "@/db/connection";

async function getAllNasabah(req) {
  try {
    await connectDB();
    const nasabah = await NasabahCol.aggregate([
      {
        $project: {
          _id: 1,
          nama: 1,
        },
      },
    ]);
    return Response.json({ message: "Semua data nasabah", data: nasabah });
  } catch (error) {
    return errorHandling(error);
  }
}

export const GET = (req) => getAllNasabah(req);