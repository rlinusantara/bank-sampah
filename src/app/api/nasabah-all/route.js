import NasabahCol from "@/db/models/nasabah";
import errorHandling from "@/app/middlewares/errorHandling";
import connectDB from "@/db/connection";

const nasabahAll = async (req) => {
  await connectDB();
  try {
    const data = await NasabahCol.find();

    return Response.json({ message: "Setoran", data }, { status: 200 });
  } catch (error) {
    return errorHandling(error);
  }
};

export const GET = (req) => nasabahAll(req);
