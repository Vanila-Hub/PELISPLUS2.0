const express = require('express');
const userModel = require('./models/UserModel');
const movies_squema = require('./models/PelisModels');
const router = express.Router();
const { exec } = require("child_process");
const mongoose = require('mongoose');

const nowplayingModel = mongoose.models.nowplayings || mongoose.model('nowplayings', movies_squema);
const popularModel = mongoose.models.populars || mongoose.model('populars', movies_squema);
const topratedModel = mongoose.models.toprateds || mongoose.model('toprateds', movies_squema);
const upcomingModel = mongoose.models.upcomings || mongoose.model('upcomings', movies_squema);
const trendingModel = mongoose.models.trending || mongoose.model('trending', movies_squema);

const TMDB_API = 'https://api.themoviedb.org/3/movie';
const TMDB_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjk1NWEyMzU3NmE4NzdiNGI0NDA4NjdiZDdmYTNkNSIsInN1YiI6IjY1NzA5MmY5YzhhMmQ0MDBlMTBiZmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQj2s2CEnp2kYdF1g3k6xnocEjxSMyfbBvZWI0nuj0c';

const CATEGORIES = [
  { uri: `${TMDB_API}/now_playing?language=en-US&page=`, model: nowplayingModel },
  { uri: `${TMDB_API}/popular?language=en-US&page=`, model: popularModel },
  { uri: `${TMDB_API}/top_rated?language=en-US&page=`, model: topratedModel },
  { uri: `${TMDB_API}/upcoming?language=en-US&page=`, model: upcomingModel },
  { uri: `https://api.themoviedb.org/3/trending/movie/week?language=en-US`, model: trendingModel },
];

router.get('/update-all', async (req, res) => {
  try {
    const IMG_PATH = 'https://image.tmdb.org/t/p/original//';

    for (const cat of CATEGORIES) {
      await cat.model.deleteMany({});
      const pages = cat === CATEGORIES[4] ? [1] : [1, 2];

      for (const page of pages) {
        const url = cat === CATEGORIES[4] ? cat.uri : cat.uri + page;
        const tmdbRes = await fetch(url, { headers: { accept: 'application/json', Authorization: TMDB_TOKEN } });
        const body = await tmdbRes.json();

        const movies = (body.results || [])
          .filter(m => m.poster_path && m.overview)
          .map(m => ({
            id: m.id,
            titulo: m.title,
            año: m.release_date,
            sinopsis: m.overview,
            poster: IMG_PATH + m.poster_path,
            wallpaper: IMG_PATH + m.backdrop_path,
            genre: m.genre_ids,
            duracion: 0,
            valoracion: Math.round(m.vote_average * 10) / 10,
            trailer: null,
          }));

        if (movies.length) await cat.model.insertMany(movies);
      }
    }

    res.json({ message: 'Update completo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// crear usuario
router.post('/users', (req, res) => {
  const user = userModel(req.body);
  user.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// get all users
router.get('/users', (req, res) => {
  userModel
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// get 1 usuario by id
router.get('/users/get/:id', (req, res) => {
  userModel
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }));
});

// get 1 usuario by nombre
router.get('/user/:nombre', (req, res) => {
  userModel.findOne({ nombre: req.params.nombre })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((errr) => {
      console.log(errr);
      res.status(500).json({ message: 'Server Error' });
    });
});

// update 1 usuario
router.put('/users/update/:id', (req, res) => {
  const { nombre, edad, email, password, saved_movies, liked_movies, saved_series, liked_series, liked_genres, icon } = req.body;
  userModel
    .updateOne({ _id: req.params.id }, { $set: { nombre, edad, email, password, saved_movies, liked_movies, saved_series, liked_series, liked_genres, icon } })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// delete all users
router.delete('/users/delete/', (req, res) => {
  userModel
    .deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// ─── MOVIES: DELETE ALL ─────────────────────────────────────────────

router.delete('/movies/nowplayin/delete', (req, res) => {
  nowplayingModel.deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.delete('/movies/popular/delete', (req, res) => {
  popularModel.deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.delete('/movies/toprated/delete', (req, res) => {
  topratedModel.deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.delete('/movies/upcoming/delete', (req, res) => {
  upcomingModel.deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.delete('/movies/trending/delete', (req, res) => {
  trendingModel.deleteMany({})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// ─── MOVIES: ADD ────────────────────────────────────────────────────

router.post('/movies/nowplayin/add', (req, res) => {
  const peli = nowplayingModel(req.body);
  peli.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.post('/movies/popular/add', (req, res) => {
  const peli = popularModel(req.body);
  peli.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.post('/movies/toprated/add', (req, res) => {
  const peli = topratedModel(req.body);
  peli.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.post('/movies/upcoming/add', (req, res) => {
  const peli = upcomingModel(req.body);
  peli.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.post('/movies/trending/add', (req, res) => {
  const peli = trendingModel(req.body);
  peli.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// ─── MOVIES: GET ALL ────────────────────────────────────────────────

router.get('/movies/nowplayin/', (req, res) => {
  nowplayingModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.get('/movies/update/', (req, res) => {
  runUpdateScript();
  nowplayingModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.get('/movies/popular/', (req, res) => {
  popularModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.get('/movies/toprated/', (req, res) => {
  topratedModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.get('/movies/upcoming/', (req, res) => {
  upcomingModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

router.get('/movies/trending/', (req, res) => {
  trendingModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err.message }))
});

// ─── MOVIES: GET ONE BY ID ──────────────────────────────────────────

router.get('/movies/nowplayings/:id', (req, res) => {
  nowplayingModel.findOne({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((errr) => {
      console.log(errr);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.get('/movies/popular/:id', (req, res) => {
  popularModel.findOne({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((errr) => {
      console.log(errr);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.get('/movies/toprated/:id', (req, res) => {
  topratedModel.findOne({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((errr) => {
      console.log(errr);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.get('/movies/upcoming/:id', (req, res) => {
  upcomingModel.findOne({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((errr) => {
      console.log(errr);
      res.status(500).json({ message: 'Server Error' });
    });
});

router.get('/movies/trending/:id', (req, res) => {
  trendingModel.findOne({ id: req.params.id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    })
    .catch((errr) => {
      console.log(errr);
      res.status(500).json({ message: 'Server Error' });
    });
});

function runUpdateScript() {
  console.log("Iniciando cron job: se ejecutará npm run update.");
  exec("npm run update", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

module.exports = router;
