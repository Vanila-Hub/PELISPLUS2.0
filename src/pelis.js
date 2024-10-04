const { exec } = require('child_process');
const express = require('express');
const router = express.Router();
const peli_squema = require('./routes/models/PelisModels');
const mongoose = require('mongoose');
const pelis = require('./routes/pelisEnd');
const usr_routs = require('./routes/Enpoints');
const home_routs = require('./routes/home');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 2008;

/* Middleware */
app.use(express.json());
app.use('/pelis-plus', pelis, usr_routs, home_routs);

/* Conexión a MongoDB */
mongoose
  .connect(process.env.MONGODB_URI_PELIS_COLLECTION)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
    const indexPath = path.join(__dirname, '..', 'index.html');
    console.log(indexPath);
  })
  .catch((err) => {
    console.log("Error al conectar a MongoDB:", err);
  });

/* Levantar el Servidor */
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto", port);

  // Ejecutar el script de actualización después de que todo esté configurado
});


/* Definir una Ruta de Eliminación como Ejemplo */
router.delete('/peli/delete/', (req, res) => {
  const id = req.params.id;
  peli_squema
    .deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

function runUpdateScript() {
  console.log("Iniciando cron job: se ejecutará npm run update.");
  exec("npm run update", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}