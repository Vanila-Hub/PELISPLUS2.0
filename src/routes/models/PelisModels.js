const mongoose = require('mongoose');

const pelisSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  titulo: { type: String, required: true },
  año: { type: String, required: true },
  sinopsis: { type: String, required: true },
  poster: { type: String, required: true },
  wallpaper: { type: String, required: true },
  genre: { type: [String], default: [] },
  duracion: { type: Number},
  valoracion: { type: Number, required: true },
  trailer: { type: String}
  });


module.exports = pelisSchema;