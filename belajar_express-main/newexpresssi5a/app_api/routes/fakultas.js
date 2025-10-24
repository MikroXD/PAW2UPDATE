const express = require("express");
const router = express.Router();

// impor fakultasController
const fakultasController = require("../controllers/fakultasController");

// route GET fakultas
router.get("/", fakultasController.getAllFakultas);
router.post("/", fakultasController.createFakultas);
router.get("/:id", fakultasController.getFakultasById);
router.get("/:id", fakultasController.deletefakultasById);
router.get("/:id", fakultasController.updategetFakultasById);

// expor module
module.exports = router;
