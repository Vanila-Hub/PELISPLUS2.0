const { exec } = require('child_process');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pelis = require('./routes/pelisEnd');
const usr_routs = require('./routes/Enpoints');
const home_routs = require('./routes/home');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2007;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/pelis-plus', pelis, usr_routs, home_routs);

mongoose
  .connect(process.env.MONGODB_URI_PELIS_COLLECTION)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.log("Error al conectar a MongoDB:", err);
  });

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto", port);
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