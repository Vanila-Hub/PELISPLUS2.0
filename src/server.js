const mongoose = require('mongoose');
const express = require('express');
const usr_routs = require('./routes/user');
//const UserModel = require('/models/UserModel');

/*EXPRES*/ 
require('dotenv').config();
const app = express();
const port = 2007;

/*middleware*/
app.use(express.json());
app.use('/pelis-plus',usr_routs);


/* LEVANTAMOS SERVIDOR */
app.get("/",(req,res) =>{
    res.send("hola");
})
app.listen(port,()=> console.log("escuchando en el puerto", port))

/* NOS CONECTAMOS A MONGODB*/
mongoose.connect("mongodb+srv://ikcth:ABRIL2008@pelisplus.anjhmrw.mongodb.net/clentes?retryWrites=true&w=majority")
.then((res)=>{
    console.log("conexion succsesfull");
})
    .catch(err=>{
        console.log(err);
    });
//middleware

// const newUser = new UserModel({
//     nombre: 'John Doe',
//     edad: 25,
//     email: 'john@example.com',
//     password: 'securepassword',
//     saved_movies: 0,
//     liked_movies: 0,
//     saved_series: 0,
//     liked_series: 0,
//     liked_genres: [1,2,32]
//   });
