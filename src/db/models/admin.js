import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  harga_satuan: {
    type: Number,
    default: 0,
  },
});

const AdminCol =
  mongoose.models.admin || mongoose.model("admin", adminSchema, "admin");
export default AdminCol;
