// ListProdi.jsx

// Import hooks dari React
import { useState, useEffect } from "react";
// Import axios untuk HTTP request
import axios from "axios";

export default function ProdiList() {
  // State untuk menyimpan data prodi dari API
  const [prodi, setProdi] = useState([]);
  // State loading
  const [loading, setLoading] = useState(true);
  // State error
  const [error, setError] = useState(null);

  // useEffect dijalankan saat komponen mount
  useEffect(() => {
    const fetchProdi = async () => {
      try {
        setLoading(true);

        // GANTI endpoint ini sesuai API Anda
        const response = await axios.get(
          "https://newexpresssi5a-weld.vercel.app/api/prodi"
        );

        // Simpan data prodi ke state
        setProdi(response.data);

        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching prodi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdi();
  }, []);

  // Tampilkan loading
  if (loading) return <div>Loading...</div>;
  // Tampilkan error
  if (error) return <div>Error: {error}</div>;

  // Tampilkan UI tabel
  return (
    <div>
      <h1>Daftar Program Studi</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama Prodi</th>
            <th>Singkatan</th>
          </tr>
        </thead>
        <tbody>
          {prodi.map((p) => (
            <tr key={p._id}>
              <td>{p.nama}</td>
              <td>{p.singkatan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
