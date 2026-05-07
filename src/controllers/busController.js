const pool = require("../config/db");

const getAllBuses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM buses");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener buses:", error);
    res.status(500).json({ error: "Error al obtener buses" });
  }
};

const getUltimoEstadoBus = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM ultimo_estado_bus WHERE bus_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Bus no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener último estado del bus:", error);
    res.status(500).json({ error: "Error al obtener último estado del bus" });
  }
};

const registrarDatosBus = async (req, res) => {
  try {
    const {
      bus_id,
      cantidad,
      latitud,
      longitud,
      velocidad,
      tipo_evento,
      fecha_hora,
    } = req.body;

    await pool.query(
      "CALL registrar_datos_bus(?, ?, ?, ?, ?, ?, ?)",
      [bus_id, cantidad, latitud, longitud, velocidad, tipo_evento, fecha_hora]
    );

    res.json({ message: "Datos del bus registrados correctamente" });
  } catch (error) {
    console.error("Error al registrar datos del bus:", error);
    res.status(500).json({ error: "Error al registrar datos del bus" });
  }
};

const getRutaConParadas = async (req, res) => {
  try {
    const { id } = req.params;

    const [rutaRows] = await pool.query("SELECT * FROM rutas WHERE id = ?", [id]);

    if (rutaRows.length === 0) {
      return res.status(404).json({ error: "Ruta no encontrada" });
    }

    const [paradasRows] = await pool.query(
      "SELECT * FROM paradas WHERE ruta_id = ? ORDER BY orden_ruta ASC",
      [id]
    );

    res.json({
      ruta: rutaRows[0],
      paradas: paradasRows,
    });
  } catch (error) {
    console.error("Error al obtener ruta:", error);
    res.status(500).json({ error: "Error al obtener ruta" });
  }
};

module.exports = {
  getAllBuses,
  getUltimoEstadoBus,
  registrarDatosBus,
  getRutaConParadas,
};