import NasabahCol from "@/db/models/nasabah";
import ResponseErr from "@/helpers/responseErr";
import SetoranMasukValidation from "@/validation/setoran_masuk";
import HargaSampahCol from "@/db/models/harga_sampah";
import errorHandling from "@/app/middlewares/errorHandling";
import onlyLogin from "@/app/middlewares/onlyLogin";
import connectDB from "@/db/connection";
import BigNumber from "bignumber.js";

const historySetoran = async (req) => {
  await connectDB();
  try {
    const body = await req.json();
    await SetoranMasukValidation.addTotal(body);

    const nasabah = await NasabahCol.findById(body.id_nasabah);
    if (!nasabah) {
      throw new ResponseErr(404, "Setoran tidak ada");
    }

    const hargaSampah = await HargaSampahCol.findOne();
    if (!hargaSampah) {
      throw new ResponseErr("Tambahkan harga sampah dulu");
    }

    const totalSetoran = new BigNumber(body.jumlah_setoran).plus(
      nasabah.total_setoran
    );

    await NasabahCol.updateOne(
      { _id: body.id_nasabah },
      {
        $set: {
          total_setoran: totalSetoran,
        },
        $push: {
          history_setoran_masuk: {
            tanggal_setoran: body.tanggal_setoran,
            jenis_sampah: body.jenis_sampah,
            harga_satuan: hargaSampah.harga_satuan,
            sampah_halus: 0,
            sampah_kasar: 0,
            jumlah_setoran: body.jumlah_setoran,
          },
        },
      }
    );

    return Response.json(
      { message: "Berhasil menambah history setoran" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandling(error);
  }
};

export const POST = (req) => historySetoran(req);
