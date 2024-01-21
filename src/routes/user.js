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
router.get('/users/:email',(req,res)=>{
    const Usuario = require('./models/usuario'); // Adjust the path to your user model

    async function findUserByEmail(email) {
      try {
        const user = await user_squema.findOne({ email: email });
        return user;
      } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
      }
    }
    
    // Example usage
    findUserByEmail("ikcth@1234")
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message: err}))
      .catch(error => {
        console.error('Error:', error);
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