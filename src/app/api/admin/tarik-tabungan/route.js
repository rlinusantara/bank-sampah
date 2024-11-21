import connectDB from "@/db/connection";
import onlyLogin from "@/middlewares/onlyLogin";
import TarikTabunganValidation from "@/validation/tarik_tabungan";
import ResponseErr from "@/helpers/responseErr";
import NasabahCol from "@/db/models/nasabah";
import mongoose from "mongoose";

const { default: errorHandling } = require("@/middlewares/errorHandling");

const tarikTabungan = async (req) => {
  await connectDB();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const body = await req.json();
    await TarikTabunganValidation.saldo(body);

    const nasabah = await NasabahCol.findById(body.id_nasabah).session(session);

    if (!nasabah) {
      throw new ResponseErr(404, "Nasabah tidak ditemukan");
    }

    if (nasabah.total_tabungan - body.saldo < 0) {
      throw new ResponseErr(400, "Tabungan tidak cukup");
    }

    await NasabahCol.updateOne(
      { _id: body.id_nasabah },
      {
        $inc: {
          total_tabungan: -body.saldo,
        },
        $push: {
          setoran_keluar: {
            tabungan_keluar: body.saldo,
          },
        },
      },
      {
        session: session,
      }
    );

    await session.commitTransaction();
    return Response.json(
      { message: "Tabungan berhasil ditarik" },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    return errorHandling(error);
  } finally {
    session.endSession();
  }
};

export const POST = async (req) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(tarikTabungan, req, process.env.SECRET_KEY);
  } catch (error) {
    return errorHandling(error);
  }
};
