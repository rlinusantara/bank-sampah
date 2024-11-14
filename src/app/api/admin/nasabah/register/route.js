import NasabahCol from "@/db/models/nasabah";
import ResponseErr from "@/helpers/responseErr";
import errorHandling from "@/middlewares/errorHandling";
import onlyLogin from "@/middlewares/onlyLogin";
import NasabahValidation from "@/validation/nasabah";

async function registerNasabah(req) {
  try {
    const body = await req.json();
    await NasabahValidation.register(body);

    const checkNasabah = await NasabahCol.findOne({ nama: body.nama });
    if (checkNasabah) {
      throw new ResponseErr(400, "Nama nasabah sudah ada");
    }

    const insert = new NasabahCol(body);
    await insert.save();

    return Response.json({ message: "Berhasil register nasabah" });
  } catch (error) {
    return errorHandling(error);
  }
}

export const POST = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(registerNasabah, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
