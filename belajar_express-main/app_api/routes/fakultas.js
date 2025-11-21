const express = require("express");
const router = express.Router();

// impor fakultasController
const fakultasController = require("../controllers/fakultasController");
const authMiddleware = require("../controllers/middleware/authMiddleware");
const roleMiddleware = require("../controllers/middleware/roleMiddleware");

// route GET fakultas
router.get("/", fakultasController.getAllFakultas);
router.post("/", fakultasController.createFakultas);
router.get("/:id", fakultasController.getFakultasById);
router.delete("/:id", fakultasController.deleteFakultasById);
router.put("/:id", fakultasController.updateFakultasById);
router.get("/", authMiddleware, fakultasController.getAllFakultas);
router.post("/", authMiddleware, roleMiddleware("admin"), fakultasController.createFakultas);
router.get("/:id", authMiddleware, fakultasController.getFakultasById);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), fakultasController.deleteFakultasById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), fakultasController.updateFakultasById);
// expor module
module.exports = router;
