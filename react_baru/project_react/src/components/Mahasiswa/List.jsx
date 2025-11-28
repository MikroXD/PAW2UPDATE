// Komponen list Mahasiswa
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function MahasiswaList() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [prodiMap, setProdiMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [mRes, pRes] = await Promise.all([
          axios.get("https://newexpresssi5a-weld.vercel.app/api/mahasiswa"),
          axios.get("https://newexpresssi5a-weld.vercel.app/api/Prodi")
        ]);

        const mahasiswaData = Array.isArray(mRes.data) ? mRes.data : [];

        // Mapping Prodi
        const pMap = {};
        if (Array.isArray(pRes.data)) {
          pRes.data.forEach((p) => {
            const id = String(p._id ?? p.id ?? "");
            if (!id) return;

            pMap[id] = {
              nama: p.nama ?? "",
              singkatan: p.singkatan ?? ""
            };
          });
        }

        setProdiMap(pMap);
        setMahasiswa(mahasiswaData);
        setError(null);
      } catch (err) {
        console.error("Error fetching mahasiswa/prodi", err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // DELETE dengan SweetAlert
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: `Data Mahasiswa: ${nama} akan dihapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://newexpresssi5a-weld.vercel.app/api/mahasiswa/${id}`)
          .then(() => {
            setMahasiswa((prev) =>
              prev.filter((m) => String(m._id) !== String(id))
            );

            Swal.fire("Terhapus!", "Data mahasiswa berhasil dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting:", error);
            Swal.fire("Error", "Gagal menghapus mahasiswa.", "error");
          });
      }
    });
  };

  return (
    <div>
      <h1>Mahasiswa List</h1>

      <NavLink to="/mahasiswa/create" className="btn btn-primary mb-3">
        Tambah Mahasiswa
      </NavLink>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>NPM</th>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>Prodi</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {mahasiswa.map((m) => {
            const id = String(m._id ?? m.id ?? m.npm ?? "");

            const prodiId = String(
              m.prodi?._id ?? m.prodi ?? m.prodi_id ?? ""
            );

            const prodiNama = prodiMap[prodiId]?.nama ?? "";

            return (
              <tr key={id}>
                <td>{m.npm ?? ""}</td>
                <td>{m.nama ?? ""}</td>
                <td>{m.tempat_lahir ?? ""}</td>
                <td>{m.tanggal_lahir ?? ""}</td>
                <td>{prodiNama}</td>

                <td>
                  {/* Tombol Edit */}
                  <NavLink
                    to={`/mahasiswa/edit/${id}`}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </NavLink>

                  {/* Tombol Hapus */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(id, m.nama)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
