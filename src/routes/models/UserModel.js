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
    saved_movies: {type:Array},
    liked_movies: {type:Array},
    saved_series: {type:Array},
    liked_series: {type:Array},
    liked_genres: {type:Array}
  });

const UserModel = mongoose.model('usuarios', userSchema);
module.exports = UserModel;