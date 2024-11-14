import mongoose from "mongoose";

export const schemaSetoranMasuk = new mongoose.Schema({
  tanggal_setoran: {
    type: Date,
    required: true,
  },
  jenis_sampah: {
    type: String,
    required: true,
  },
  harga_satuan: {
    type: Number,
    required: true,
  },
  sampah_halus: {
    type: Number,
    required: true,
  },
  sampah_kasar: {
    type: Number,
    required: true,
  },
  jumlah_setoran: {
    type: Number,
    required: true,
  },
  id_nasabah: {
    type: String,
    required: true,
  },
  setujui: {
    type: Boolean,
    default: false,
  },
});

const SetoranMasukCol =
  mongoose.models.setoran_masuk ||
  mongoose.model("setoran_masuk", schemaSetoranMasuk, "setoran_masuk");

export default SetoranMasukCol;
