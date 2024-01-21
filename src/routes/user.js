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

//EDTITAR USUARIO
router.get('/users:id',(req,res)=>{
    const id = req.params.id;  
    user_squema
        .findById(id)
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message: err}))
    });

module.exports = router;