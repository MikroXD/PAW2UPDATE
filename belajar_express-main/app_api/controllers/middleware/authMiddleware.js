const jwt = require("jsonwebtoken");

// Middleware untuk memverifikasi token JWT dan menambahkan informasi user ke req.user
module.exports = (req, res, next) => {
  // Cek header Authorization: "Bearer <token>"
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token format is invalid" });
  }

  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload diauthController berisi { userId, role }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
