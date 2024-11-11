import NasabahCol from "@/db/models/nasabah";
import onlyLogin from "@/middlewares/onlyLogin";

async function getAllNasabah(req) {
  try {
    const nasabah = await NasabahCol.aggregate([
      {
        $project: {
          setoran_keluar: 0,
        },
      },
    ]);
    return Response.json({ message: "Hello World1", data: nasabah });
  } catch (error) {
    return errorHandling(error);
  }
}

export const GET = (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return onlyLogin(getAllNasabah, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
