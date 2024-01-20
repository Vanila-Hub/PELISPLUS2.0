const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    edad: {type: Number,required: true},
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    saved_movies: {type:Number},
    liked_movies: {type:Number},
    saved_series: {type:Number},
    liked_series: {type:Number},
    liked_genres: {type:Number}
  });

const UserModel = mongoose.model('usuarios', userSchema);
module.exports = UserModel;