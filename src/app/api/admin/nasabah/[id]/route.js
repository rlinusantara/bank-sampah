import NasabahCol from "@/db/models/nasabah";
import onlyLogin from "@/app/middlewares/onlyLogin";
import connectDB from "@/db/connection";
import errorHandling from "@/app/middlewares/errorHandling";
import ResponseErr from "@/helpers/responseErr";

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

async function delNasabah(req, params) {
  try {
    await connectDB();
    const { id } = await params;

    const checkNasabah = await NasabahCol.findById(id);
    if (checkNasabah.total_tabungan > 0) {
      throw new ResponseErr(400, "Nasabah masih memiliki tabungan");
    }

    await NasabahCol.deleteOne({ _id: id });

    return Response.json({ message: "Berhasil edit nama nasabah" });
  } catch (error) {
    return errorHandling(error);
  }
}

export const DELETE = async (req, { params }) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(delNasabah, req, process.env.SECRET_KEY, params);
  } catch (error) {
    return errorHandling(error);
  }
};
