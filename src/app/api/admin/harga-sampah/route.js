import HargaSampahCol from "@/db/models/harga_sampah";
import ResponseErr from "@/helpers/responseErr";
import errorHandling from "@/middlewares/errorHandling";
import onlyLogin from "@/middlewares/onlyLogin";
import HargaSampahValidation from "@/validation/harga_sampah";
import connectDB from "@/db/connection";

async function addHargaSampah(req) {
  try {
    await connectDB();
    const body = await req.json();
    await HargaSampahValidation.add(body);

    const check = await HargaSampahCol.find();
    if (check.length === 1) {
      throw new ResponseErr(400, "Harga sampah sudah ada");
    }

    const insert = new HargaSampahCol(body);
    await insert.save();

    return Response.json(
      { message: "Berhasil menambah harga sampah" },
      { status: 201 }
    );
  } catch (error) {
    return errorHandling(error);
  }
}

async function editHargaSampah(req) {
  try {
    await connectDB();
    const body = await req.json();
    await HargaSampahValidation.add(body);

    await HargaSampahCol.updateOne({}, { harga_satuan: body.harga_satuan });

    return Response.json(
      { message: "Berhasil mengubah harga sampah" },
      { status: 201 }
    );
  } catch (error) {
    return errorHandling(error);
  }
}

async function getHargaSampah(req) {
  try {
    await connectDB();

    const data = await HargaSampahCol.findOne();

    return Response.json(
      { message: "Berhasil mengubah harga sampah", data },
      { status: 201 }
    );
  } catch (error) {
    return errorHandling(error);
  }
}

export const POST = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(addHargaSampah, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};

export const PUT = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(editHargaSampah, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};

export const GET = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(getHargaSampah, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
