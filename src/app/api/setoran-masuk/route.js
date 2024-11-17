import HargaSampahCol from "@/db/models/harga_sampah";
import NasabahCol from "@/db/models/nasabah";
import SetoranMasukCol from "@/db/models/setoran_masuk_nasabah";
import ResponseErr from "@/helpers/responseErr";
import errorHandling from "@/middlewares/errorHandling";
import SetoranMasukValidation from "@/validation/setoran_masuk";
import connectDB from "@/db/connection";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    await SetoranMasukValidation.add(body);

    const getNasabah = await NasabahCol.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(body.id_nasabah),
        },
      },
      {
        $project: {
          setoran_keluar: 0,
        },
      },
    ]);

    if (!getNasabah.length) {
      throw new ResponseErr(404, "Nasabah not found");
    }

    const hargaSampah = await HargaSampahCol.findOne();
    if (!hargaSampah) {
      throw new ResponseErr("Tambahkan harga sampah dulu");
    }

    body.harga_satuan = hargaSampah.harga_satuan;
    body.jumlah_setoran = body.sampah_halus + body.sampah_kasar;
    body.nama_nasabah = getNasabah[0].nama;

    const insert = new SetoranMasukCol(body);
    await insert.save();

    return Response.json(
      { message: "Setoran berhasil masuk" },
      { status: 201 }
    );
  } catch (error) {
    return errorHandling(error);
  }
};
