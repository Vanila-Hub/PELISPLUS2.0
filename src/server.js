const mongoose = require("mongoose");
const express = require("express");
const usr_routs = require("./routes/user");
const home_routs = require("./routes/home");

//const UserModel = require('/models/UserModel');

/*EXPRES*/
require("dotenv").config();
const app = express();
const port = 2007;

/*middleware*/
app.use(express.json());
app.use("/pelis-plus", usr_routs, home_routs);

/* LEVANTAMOS SERVIDOR */
app.listen(port, () => console.log("escuchando en el puerto", port));

/* NOS CONECTAMOS A MONGODB*/
mongoose
  .connect(process.env.MONGODB_URI_USER_COLLECTION)
  .then(() => {
    console.log("conexion succsesfull");
  })
  .catch((err) => {
    console.log(err);
  });
