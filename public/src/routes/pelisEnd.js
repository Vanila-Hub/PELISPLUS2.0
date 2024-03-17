const express = require('express');
const peliSchema = require('./models/PelisModels');
const router = express.Router();

// Delete all pelis
router.delete(':delete', (req, res) => {
  peliSchema
    .deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
