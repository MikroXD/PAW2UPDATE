const Class = require("../models/Class");

// CREATE
exports.createClass = async (req, res) => {
  try {
    const kelas = await Class.create(req.body);
    res.status(201).json({ success: true, message: "Kelas ditambahkan", data: kelas });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// READ (all)
exports.getAllClasses = async (req, res) => {
  try {
    const kelas = await Class.find();
    res.json({ success: true, data: kelas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ (by ID)
exports.getClassById = async (req, res) => {
  try {
    const kelas = await Class.findById(req.params.id);
    if (!kelas) return res.status(404).json({ message: "Kelas tidak ditemukan" });
    res.json({ success: true, data: kelas });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateClass = async (req, res) => {
  try {
    const kelas = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Kelas diperbarui", data: kelas });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Kelas dihapus" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
