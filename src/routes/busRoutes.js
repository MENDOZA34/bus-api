const express = require("express");
const router = express.Router();
const {
  getAllBuses,
  getUltimoEstadoBus,
  registrarDatosBus,
  getRutaConParadas,
} = require("../controllers/busController");

router.get("/buses", getAllBuses);
router.get("/bus/:id/ultimo-estado", getUltimoEstadoBus);
router.post("/bus/actualizar", registrarDatosBus);
router.get("/rutas/:id", getRutaConParadas);

module.exports = router;