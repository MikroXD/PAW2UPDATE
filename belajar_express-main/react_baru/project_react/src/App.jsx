import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));

const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/create"));

const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Createprodi"));

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/fakultas">Fakultas</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/fakultas/create">Tambah Fakultas</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/prodi">Prodi</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/prodi/create">Tambah Prodi</NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* FAKULTAS */}
          <Route path="/fakultas" element={<FakultasList />} />
          <Route path="/fakultas/create" element={<FakultasCreate />} />

          {/* PRODI */}
          <Route path="/prodi" element={<ProdiList />} />
          <Route path="/prodi/create" element={<ProdiCreate />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
