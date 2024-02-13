const express = require('express');
const user_squema = require('./models/UserModel');
const movies_squema = require('./models/PelisModels');
const router = express.Router();
const mongoose = require('mongoose');
//crear usuario
router.post('/users',(req,res)=>{
    const user = user_squema(req.body);
    user.save()
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message: err}))
});

//get user
router.get('/users',(req,res)=>{
user_squema
    .find()
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message: err}))
});

//coger 1 USUARIO
router.get('/users/:id',(req,res)=>{
    const id = req.params.id;  
    user_squema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
    });
    //coger 1 USUARIO by email
router.get('/user/:nombre',(req,res)=>{
  const user = req.params.nombre;
  user_squema.findOne({nombre: user})
  .then((result) =>{
    if(result){
      res.json(result);
    }else{
      res.status(404).json({ message: 'User not found' });
    }
  })
  .catch((errr)=>{
    console.log(errr);
    res.status(500).json({ message: 'Server Error' });
  });
});

//update 1 USUARIO
router.put('/users/:id',(req,res)=>{
  const id = req.params.id; 
  const {nombre,edad,email,password,saved_movies,liked_movies,saved_series,liked_series,liked_genres,icon} = req.body;
  user_squema
  .updateOne({ _id: id},{$set: {nombre,edad,email,password,saved_movies,liked_movies,saved_series,liked_series,liked_genres,icon}})
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});

//delete * USUARIO
router.delete('/users/delete/',(req,res)=>{
  const id = req.params.id; 
  user_squema
  .deleteMany({})
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});

//2 delete movie
router.delete('/movies/nowplayin/delete',(req,res)=>{
  const peliSchema = mongoose.model('nowplayings', movies_squema);
  peliSchema
  .deleteMany({})
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});
router.delete('/movies/popular/delete',(req,res)=>{
  const peliSchema = mongoose.model('populars', movies_squema);
  peliSchema
  .deleteMany({})
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});
//delete movie
router.delete('/movies/toprated/delete',(req,res)=>{
  const peliSchema = mongoose.model('toprateds', movies_squema);
  peliSchema
  .deleteMany({})
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});
//delete movie
router.delete('/movies/upcoming/delete',(req,res)=>{
  const peliSchema = mongoose.model('upcomings', movies_squema);
  peliSchema
        .deleteMany({})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
});
router.delete('/movies/trending/delete',(req,res)=>{
  const peliSchema = mongoose.model('trending', movies_squema);
  peliSchema
        .deleteMany({})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
});

      //crear naow playing
      router.post('/movies/nowplayin/add',(req,res)=>{
        const peliSchema = mongoose.model('nowplayings', movies_squema);
        const peli = peliSchema (req.body);
        peli.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
      });
      //crear naow popular
      router.post('/movies/popular/add',(req,res)=>{
        const peliSchema = mongoose.model('populars', movies_squema);
        const peli =   peliSchema (req.body);
        peli.save()
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
      });
      //crear naow toprated
      router.post('/movies/toprated/add',(req,res)=>{
        const peliSchema = mongoose.model('toprateds', movies_squema);
  const peli =   peliSchema (req.body);
  peli.save()
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});
//crear naow upcomin
router.post('/movies/upcoming/add',(req,res)=>{
  const peliSchema = mongoose.model('upcomings', movies_squema);
  const peli =   peliSchema (req.body);
  peli.save()
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});
router.post('/movies/trending/add',(req,res)=>{
  const peliSchema = mongoose.model('trending', movies_squema);
  const peli =   peliSchema (req.body);
  peli.save()
  .then((data)=>res.json(data))
  .catch((err)=>res.json({message: err}))
});

/*PARA MOVIES GETTES*/ 
// router.get('/movie/:esquema/:id',(req,res)=>{
//   const id = req.params.id;  
//   const esquema = req.params.esquema;  
//   const peliSchema = mongoose.model(esquema, movies_squema);
//   peliSchema
//       .findOne({id})
//       .then((data)=>res.json(data))
//       .catch((err)=>res.json({message: err}))
//   });

router.get('/movies/nowplayin/',(req,res)=>{
  const peliSchema = mongoose.model('nowplayings', movies_squema);
  peliSchema
      .find()
      .then((data)=>res.json(data))
      .catch((err)=>res.json({message: err}))
  });
router.get('/movies/popular/',(req,res)=>{
  const peliSchema = mongoose.model('populars', movies_squema);
  peliSchema
      .find()
      .then((data)=>res.json(data))
      .catch((err)=>res.json({message: err}))
  });
router.get('/movies/toprated/',(req,res)=>{
  const peliSchema = mongoose.model('toprateds', movies_squema);
  peliSchema
      .find()
      .then((data)=>res.json(data))
      .catch((err)=>res.json({message: err}))
  });
router.get('/movies/upcoming/',(req,res)=>{
  const peliSchema = mongoose.model('upcomings', movies_squema);
  peliSchema
      .find()
      .then((data)=>res.json(data))
      .catch((err)=>res.json({message: err}))
  });
router.get('/movies/trending/',(req,res)=>{
  const peliSchema = mongoose.model('trending', movies_squema);
  peliSchema
      .find()
      .then((data)=>res.json(data))
      .catch((err)=>res.json({message: err}))
  });

    //delete movie
module.exports = router;