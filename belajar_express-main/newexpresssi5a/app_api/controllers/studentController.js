const Student = require("../models/Student");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, message: "Siswa ditambahkan", data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// READ (all) + populate kelas
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("classId", "nama_kelas jurusan");
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ (by ID)
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("classId", "nama_kelas");
    if (!student) return res.status(404).json({ message: "Siswa tidak ditemukan" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Siswa diperbarui", data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Siswa dihapus" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
