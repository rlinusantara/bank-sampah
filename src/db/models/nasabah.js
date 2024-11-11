import mongoose from "mongoose";

const SetoranKeluarCol = new mongoose.Schema({
  tabungan_keluar: {
    type: Number,
    required: true,
  },
  tanggal_setoran_keluar: {
    type: String,
    required: true,
  },
});

const nasabahSchema = new mongoose.Schema({
  nama: {
    type: String,
    unique: true,
    required: true,
  },
  total_tabungan: {
    type: Number,
    default: 0,
  },
  total_setoran: {
    type: Number,
    default: 0,
  },
  setoran_keluar: [SetoranKeluarCol],
});

const NasabahCol =
  mongoose.models.nasabah ||
  mongoose.model("nasabah", nasabahSchema, "nasabah");

export default NasabahCol;
