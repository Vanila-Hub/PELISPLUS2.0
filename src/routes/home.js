const express = require('express');
const router = express.Router();
const path = require('path');

//el html
router.get('/home',(req,res)=>{
  const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus', 'index.html');

  res.sendFile(indexPath);
});

//el css
router.get('/style.css',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus', 'style.css');
  
    res.sendFile(indexPath);
  });
//el css2
router.get('/style2.css',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus\\frontend\\', 'style2.css');
  
    res.sendFile(indexPath);
  });

//el main
router.get('/Main.js',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus', 'Main.js');
  
    res.sendFile(indexPath);
  });
//el main del login
router.get('/frontend/login.js',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus\\frontend', 'login.js');
  
    res.sendFile(indexPath);
  });
//el css
router.get('/style.css',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus', 'style.css');
  
    res.sendFile(indexPath);
  });

//icon
router.get('/fotos/perfil_zurita.png',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus\\fotos', 'default.png');
  
    res.sendFile(indexPath);
  });
//link perfil
router.get('/fotos/icon',(req,res)=>{
    const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus\\fotos', 'icon.png');
  
    res.sendFile(indexPath);
  });
//htmol de login
router.get('/login',(req,res)=>{
  const indexPath = path.join('C:\\Users\\user\\Documents\\Juan_Antero\\proyectos\\pelisplus\\frontend\\', 'inicio_sesion.html');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
module.exports = router;