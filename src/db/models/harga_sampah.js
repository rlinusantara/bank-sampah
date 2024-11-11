import mongoose from "mongoose";

const hargaSampahSchema = new mongoose.Schema({
  harga_satuan: {
    type: Number,
    default: 0,
  },
});

const HargaSampahCol =
  mongoose.models.harga_sampah ||
  mongoose.model("harga_sampah", hargaSampahSchema, "harga_sampah");

export default HargaSampahCol;
