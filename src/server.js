const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const usr_routs = require("./routes/Enpoints");
const home_routs = require("./routes/home");
const pelis_routs = require("./routes/pelisEnd");

//const UserModel = require('/models/UserModel');

/*EXPRES*/
require("dotenv").config();
const app = express();
const port = process.env.PORT || 2007;

/*middleware*/
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/pelis-plus", usr_routs, home_routs, pelis_routs);

/* LEVANTAMOS SERVIDOR */
app.listen(port, () => console.log("escuchando en el puerto", port));

/* NOS CONECTAMOS A MONGODB*/
mongoose
  .connect(process.env.MONGODB_URI_USER_COLLECTION)
  .then(() => {
    console.log("conexion succsesfull a USER_COLLECTION");
    
    // Conectar también a la colección de películas
    return mongoose.createConnection(process.env.MONGODB_URI_PELIS_COLLECTION);
  })
  .then(() => {
    console.log("conexion succsesfull a PELIS_COLLECTION");
  })
  .catch((err) => {
    console.log(err);
  });
