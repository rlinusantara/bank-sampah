import mongoose from "mongoose";

const SetoranKeluarCol = new mongoose.Schema({
  tabungan_keluar: {
    type: Number,
    required: true,
  },
  tanggal_setoran_keluar: {
    type: Date,
    default: Date.now,
  },
});

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
  nama_nasabah: {
    type: String,
    required: true,
  },
  tanggal_setoran_disetujui: {
    type: Date,
    default: Date.now,
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
  history_setoran_masuk: [schemaSetoranMasuk],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const NasabahCol =
  mongoose.models.nasabah ||
  mongoose.model("nasabah", nasabahSchema, "nasabah");

export default NasabahCol;
