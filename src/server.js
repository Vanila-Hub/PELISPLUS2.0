const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const usr_routs = require("./routes/Enpoints");
const home_routs = require("./routes/home");

//const UserModel = require('/models/UserModel');

/*EXPRES*/
require("dotenv").config();
const app = express();
const port = 2007;

/*middleware*/
app.use(cors({
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  credentials: false,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));
app.use(express.json());

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.sendStatus(200);
});

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
