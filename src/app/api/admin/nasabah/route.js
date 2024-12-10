import NasabahCol from "@/db/models/nasabah";
import onlyLogin from "@/middlewares/onlyLogin";
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
      {
        $sort: {
          created_at: -1,
        },
      },
    ]);
    return Response.json({ message: "Semua data nasabah", data: nasabah });
  } catch (error) {
    return errorHandling(error);
  }
}

export const GET = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(getAllNasabah, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
