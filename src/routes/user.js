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

module.exports = router;