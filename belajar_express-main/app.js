// =======================
// 📦 Import Dependencies
// =======================
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
var cors = require("cors");

// =======================
// 🧩 Database Connection
// =======================
const connectDB = require("./app_api/models/db");
connectDB(); // Connect ke MongoDB

// =======================
// 🧭 Import Routes (API)
// =======================
const fakultasRouterAPI = require("./app_api/routes/fakultas");
const prodiRouterAPI = require("./app_api/routes/prodi");
const mahasiswaRouterAPI = require("./app_api/routes/mahasiswa");
const beritaRouterAPI = require("./app_api/routes/berita");
const classRoutes = require("./app_api/routes/classRoutes");
const studentRoutes = require("./app_api/routes/studentRoutes");

// =======================
// 🧭 Import Routes (Server-side)
// =======================
var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");

// =======================
// ⚙️ Express App Setup
// =======================
var app = express();
app.use(cors()); // Aktifkan CORS agar API bisa diakses dari frontend

// =======================
// 🎨 View Engine Setup
// =======================
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

// =======================
// 🧰 Middleware Setup
// =======================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// =======================
// 🚀 Routing Setup
// =======================
// Halaman utama dan user (server-side)
app.use("/", indexRouter);
app.use("/users", usersRouter);

// API endpoints
app.use("/api/fakultas", fakultasRouterAPI);
app.use("/api/prodi", prodiRouterAPI);
app.use("/api/mahasiswa", mahasiswaRouterAPI);
app.use("/api/berita", beritaRouterAPI);
app.use("/api/class", classRoutes);
app.use("/api/students", studentRoutes);

// =======================
// ❌ Error Handling
// =======================
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

// =======================
// 📤 Export App
// =======================
module.exports = app;
