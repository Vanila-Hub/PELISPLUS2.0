const express = require('express');
const user_squema = require('./models/UserModel');
const router = express.Router();

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

    //delete 1 USUARIO
router.delete('/users/:id',(req,res)=>{
    const id = req.params.id; 
    user_squema
        .deleteOne({ _id: id})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
    });


module.exports = router;