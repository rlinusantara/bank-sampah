const { default: connectDB } = require("@/db/connection");
const { default: errorHandling } = require("@/middlewares/errorHandling");
import NasabahCol from "@/db/models/nasabah";
import SetoranMasukCol from "@/db/models/setoran_masuk_nasabah";
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/middlewares/onlyLogin";
import mongoose from "mongoose";

const handleSetoranMasukTolak = async (res, params) => {
  try {
    await connectDB();
    const { id, status } = await params;
    if (status !== "tolak") {
      throw new ResponseErr(400, "Status not allowed");
    }

    await SetoranMasukCol.deleteOne({ _id: id });

    return Response.json({ message: "Setoran ditolak" }, { status: 200 });
  } catch (error) {
    return errorHandling(error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(
      handleSetoranMasukTolak,
      req,
      process.env.SECRET_KEY,
      params
    );
  } catch (error) {
    return errorHandling(error);
  }
};

const handleSetoranMasukSetujui = async (res, params) => {
  await connectDB();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { id, status } = await params;
    if (status !== "setuju") {
      throw new ResponseErr(400, "Status not allowed");
    }

    const checkSetoran = await SetoranMasukCol.findOneAndDelete(
      {
        _id: id,
      },
      {
        session,
        new: true,
      }
    );
    if (!checkSetoran) {
      throw new ResponseErr(404, "Setoran tidak ada");
    }

    const nasabah = await NasabahCol.findById(checkSetoran.id_nasabah);
    if (!nasabah) {
      throw new ResponseErr(404, "Setoran tidak ada");
    }

    await NasabahCol.updateOne(
      { _id: checkSetoran.id_nasabah },
      {
        $set: {
          total_tabungan:
            (checkSetoran.sampah_halus + checkSetoran.sampah_kasar) *
              checkSetoran.harga_satuan +
            nasabah.total_tabungan,
          total_setoran:
            checkSetoran.sampah_halus +
            checkSetoran.sampah_kasar +
            nasabah.total_setoran,
        },
        $push: {
          history_setoran_masuk: {
            tanggal_setoran: checkSetoran.tanggal_setoran,
            jenis_sampah: checkSetoran.jenis_sampah,
            harga_satuan: checkSetoran.harga_satuan,
            sampah_halus: checkSetoran.sampah_halus,
            sampah_kasar: checkSetoran.sampah_kasar,
            jumlah_setoran: checkSetoran.jumlah_setoran,
          },
        },
      }
    );

    await session.commitTransaction();
    return Response.json({ message: "Setoran disetujui" }, { status: 200 });
  } catch (error) {
    await session.abortTransaction();
    return errorHandling(error);
  } finally {
    session.endSession();
  }
};

export const POST = async (req, { params }) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ResponseErr(500, "Env error");
    }
    return await onlyLogin(
      handleSetoranMasukSetujui,
      req,
      process.env.SECRET_KEY,
      params
    );
  } catch (error) {
    return errorHandling(error);
  }
};
