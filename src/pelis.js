const { exec } = require('child_process');
const express = require('express');
const router = express.Router();
const peli_squema = require('./routes/models/PelisModels');
const mongoose = require('mongoose');
const pelis = require('./routes/pelisEnd');
const usr_routs = require('./routes/Enpoints');
const home_routs = require('./routes/home');
const path = require('path');
const CronJob = require('cron').CronJob;
 


require('dotenv').config();
const app = express();
const port = 2008;

/*middleware*/
app.use(express.json());
app.use('/pelis-plus',pelis,usr_routs,home_routs);


/* LEVANTAMOS SERVIDOR */
app.listen(port,()=> console.log("escuchando en el puerto", port))
/* NOS CONECTAMOS A MONGODB*/
mongoose.connect(process.env.MONGODB_URI_PELIS_COLLECTION)
.then(()=>{
    console.log("conexion buenas");
   // runUpdateScript();
    const indexPath = path.join(__dirname, '..', 'index.html');
    console.log(indexPath);
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


function runUpdateScript() {
      exec('npm run update', (error, stdout, stderr) => {
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



// Configurar el cron job para ejecutar la función cada minuto
const job = new CronJob('0 4 * * *', runUpdateScript);

// Iniciar el cron job
job.start();

console.log('Cron job iniciado. Se ejecutará el archivo npm update cada minuto.');
 