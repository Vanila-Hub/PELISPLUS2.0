const express = require('express');
const mongoose = require('mongoose');
const peliSchema = require('./models/PelisModels');
const router = express.Router();

const peliModel = mongoose.models.peliculas || mongoose.model('peliculas', peliSchema);

router.delete('/delete', (req, res) => {
  peliModel
    .deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }));
});

module.exports = router;
