const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    nama_siswa: { type: String, required: true },
    nim: { type: String, required: true },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

