const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    nama_kelas: { type: String, required: true },
    jurusan: { type: String, required: true },
    tahun_ajaran: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
