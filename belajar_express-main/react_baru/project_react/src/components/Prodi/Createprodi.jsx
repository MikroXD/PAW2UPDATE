import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProdi() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.singkatan) {
      setError("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://newexpresssi5a-weld.vercel.app/api/prodi",
        formData
      );

      console.log("Prodi created:", response.data);

      navigate("/prodi");
    } catch (err) {
      console.error("Error creating prodi:", err);
      setError(
        err.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Prodi</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Prodi</label>
          <input
            type="text"
            name="nama"
            className="form-control"
            value={formData.nama}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Singkatan</label>
          <input
            type="text"
            name="singkatan"
            className="form-control"
            value={formData.singkatan}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/prodi")}
          disabled={loading}
        >
          Batal
        </button>
      </form>
    </div>
  );
}
