const { default: connectDB } = require("@/db/connection");
const { default: errorHandling } = require("@/middlewares/errorHandling");
import NasabahCol from "@/db/models/nasabah";
import SetoranMasukCol from "@/db/models/setoran_masuk_nasabah";
import ResponseErr from "@/helpers/responseErr";
import onlyLogin from "@/middlewares/onlyLogin";
import mongoose from "mongoose";
import BigNumber from "bignumber.js";

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
    const nasabah = await NasabahCol.findById(checkSetoran.id_nasabah).session(
      session
    );
    if (!nasabah) {
      throw new ResponseErr(404, "Setoran tidak ada");
    }

    if (checkSetoran.sampah_halus === 0 && checkSetoran.sampah_kasar === 0) {
      const totalTabungan = new BigNumber(checkSetoran.jumlah_setoran)
        .multipliedBy(checkSetoran.harga_satuan)
        .plus(nasabah.total_tabungan);

      const totalSetoran = new BigNumber(checkSetoran.jumlah_setoran).plus(
        nasabah.total_setoran
      );

      await NasabahCol.updateOne(
        { _id: checkSetoran.id_nasabah },
        {
          $set: {
            total_tabungan: totalTabungan,
            total_setoran: totalSetoran,
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
        },
        {
          session: session,
        }
      );
    } else {
      const totalSampah = new BigNumber(checkSetoran.sampah_halus).plus(
        checkSetoran.sampah_kasar
      );
      const totalTabungan = new BigNumber(totalSampah)
        .multipliedBy(checkSetoran.harga_satuan)
        .plus(nasabah.total_tabungan);

      const totalSetoran = new BigNumber(totalSampah).plus(
        nasabah.total_setoran
      );

      await NasabahCol.updateOne(
        { _id: checkSetoran.id_nasabah },
        {
          $set: {
            total_tabungan: totalTabungan,
            total_setoran: totalSetoran,
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
        },
        {
          session: session,
        }
      );
    }

    await session.commitTransaction();
    return Response.json({ message: "Setoran disetujui" }, { status: 200 });
  } catch (error) {
    await session.abortTransaction();
    return errorHandling(error);
  } finally {
    session.endSession();
  }
};

export const GET = async (req, { params }) => {
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
