const express = require('express');
const router = express.Router();
const peli_squema = require('./routes/models/PelisModels');
const mongoose = require('mongoose');
const pelis = require('./routes/pelisEnd');
const usr_routs = require('./routes/Enpoints');
const home_routs = require('./routes/home');


require('dotenv').config();
const app = express();
const port = 2007;

/*middleware*/
app.use(express.json());
app.use('/pelis-plus',pelis,usr_routs,home_routs);


/* LEVANTAMOS SERVIDOR */
app.listen(port,()=> console.log("escuchando en el puerto", port))

/* NOS CONECTAMOS A MONGODB*/
mongoose.connect(process.env.MONGODB_URI_PELIS_COLLECTION)
.then(()=>{
    console.log("conexion buenas");
})
    .catch(err=>{
        console.log(err);
    });

    //crear peli
router.delete('/peli/delete/',(req,res)=>{
    const id = req.params.id; 
    peli_squema
        .deleteMany({})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
    });