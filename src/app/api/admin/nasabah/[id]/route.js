import NasabahCol from "@/db/models/nasabah";
import onlyLogin from "@/middlewares/onlyLogin";
import connectDB from "@/db/connection";
import errorHandling from "@/middlewares/errorHandling";

async function editNasabah(req, params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    await NasabahCol.updateOne(
      { _id: id },
      {
        $set: {
          nama: body.nama,
        },
      }
    );

    return Response.json({ message: "Berhasil edit nama nasabah" });
  } catch (error) {
    return errorHandling(error);
  }
}

export const PUT = async (req, { params }) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(editNasabah, req, process.env.SECRET_KEY, params);
  } catch (error) {
    return errorHandling(error);
  }
};
