const express = require("express");
const cors = require("cors");
require("dotenv").config();

const busRoutes = require("./routes/busRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", busRoutes);

app.get("/", (req, res) => {
  res.send("Backend de buses funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});