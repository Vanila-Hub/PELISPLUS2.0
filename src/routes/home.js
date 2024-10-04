const express = require('express');
const router = express.Router();
const path = require('path');

//el html
router.get('/home',(req,res)=>{
  const indexPath = path.join(__dirname, '..','..', 'index.html');
  res.sendFile(indexPath);
});
/* Definición de la Función */


//el css
router.get('/style.css',(req,res)=>{
    const indexPath = path.join(__dirname, '..','..', 'style.css');
  
    res.sendFile(indexPath);
  });
//el css2
router.get('/style2.css',(req,res)=>{
    const indexPath = path.join(__dirname, '..','..', 'frontend', 'style2.css');
  
    res.sendFile(indexPath);
  });

//el main
router.get('/Main.js',(req,res)=>{
    const indexPath = path.join(__dirname, '..','..', 'Main.js');
  
    res.sendFile(indexPath);
  });
//el main del login
router.get('/frontend/login.js',(req,res)=>{
    const indexPath = path.join(__dirname, '..', '..', 'frontend', 'login.js');
  
    res.sendFile(indexPath);
  });
//el css
router.get('/style.css',(req,res)=>{
    const indexPath = path.join(__dirname, '..', '..', 'style.css');
  
    res.sendFile(indexPath);
  });

//icon
router.get('/fotos/perfil_zurita.png',(req,res)=>{
    const indexPath = path.join(__dirname, '..', '..', 'fotos', 'default.png');
  
    res.sendFile(indexPath);
  });
//link perfil
router.get('/fotos/icon',(req,res)=>{
    const indexPath = path.join(__dirname, '..', '..', 'fotos', 'icon.png');
  
    res.sendFile(indexPath);
  });
//htmol de login
router.get('/login',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'frontend', 'inicio_sesion.html');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*html  mi lista */
router.get('/profile',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'frontend','user_profile' ,'profile.html');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*css  mi lista */
router.get('/style',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'frontend','user_profile', 'style3.css');
  //res.send("te oigo");
  res.sendFile(indexPath);
});

/*html  mi lista */
router.get('/search',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'querys','busqueda.html');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*html  mi lista */
router.get('/search-style',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'querys','style2.css');
  //res.send("te oigo");
  res.sendFile(indexPath);
});

/*js  mi lista */
router.get('/js',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'frontend','user_profile', 'scrip.js');
  //res.send("te oigo");
  res.sendFile(indexPath);
});

/*js  mi ver */
router.get('/verjs',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..',  'ver', 'scrip.js');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*js  mi ver */
router.get('/trailerjs',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..',  'ver', 'trailer.js');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*js  mi ver */
router.get('/vercss',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'ver','ver.css');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*js  mi ver */
router.get('/movies/ver/:id',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'ver', 'ver.html');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
/*js  mi vertrailer */
router.get('/movies/trailer',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'ver', 'trailer.html');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
router.get('/consultaPELI.json',(req,res)=>{
  const indexPath = path.join(__dirname, '..', '..', 'querys', 'consultaPELI.js');
  //res.send("te oigo");
  res.sendFile(indexPath);
});
module.exports = router;