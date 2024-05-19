
let uris = [
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=",
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=",
  'https://api.themoviedb.org/3/trending/movie/week?language=en-US'
];
let pasado = false;
let pelidcula =
{
  id: 0,
  titulo: "",
  año: "",
  sinopsis: "",
  poster: "",
  wallpaper: "",
  genre: [

  ],
  duracion: 0,
  valoracion: 0,
  trailer: ""
}
let links = {
  'nowplaying': 'https://pelisplus2-0.onrender.com/pelis-plus/movies/nowplayin/',
  'popular': 'https://pelisplus2-0.onrender.com/pelis-plus/movies/popular/',
  'toprated': 'https://pelisplus2-0.onrender.com/pelis-plus/movies/toprated/',
  'trending': 'https://pelisplus2-0.onrender.com/pelis-plus/movies/trending/',
  'upcoming': 'https://pelisplus2-0.onrender.com/pelis-plus/movies/upcoming/'
};

let path = 'https://image.tmdb.org/t/p/original//';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjk1NWEyMzU3NmE4NzdiNGI0NDA4NjdiZDdmYTNkNSIsInN1YiI6IjY1NzA5MmY5YzhhMmQ0MDBlMTBiZmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQj2s2CEnp2kYdF1g3k6xnocEjxSMyfbBvZWI0nuj0c' 
  }
};
async function ubdateBBDD() {

  for (let linkk = 0; linkk < uris.length; linkk++) {
    for (let i = 1; i < 9; i++) {
      console.log(uris[linkk] + i);
      if (uris[linkk]!=uris[4]) {
        uris[linkk] = uris[linkk] + i;
      }else{
        uris[linkk] = uris[4];
      }
      fetch(uris[linkk], options)
        .then(response => response.json())
        .then(response => {
          response.results.forEach(respuesta => {
            let x = path + respuesta.poster_path;
            if (x !== "https://image.tmdb.org/t/p/original//null") {
                console.log("La variable x no es undefined ni null.");
                switch (linkk) {
                  case 0:
                    pelidcula.id = respuesta.id,
                      pelidcula.titulo = respuesta.title,
                      pelidcula.año = respuesta.release_date,
                      pelidcula.sinopsis =respuesta.overview,
                      pelidcula.poster =  path +  respuesta.poster_path,
                      pelidcula.wallpaper = path + respuesta.backdrop_path,
                      pelidcula.genre = respuesta.genre_ids,
                      pelidcula.trailer = null,
                      pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                    uploadMovie(pelidcula, links.nowplaying);
                    break;
                  case 1:
                    // console.log(response);
                    pelidcula.id = respuesta.id,
                      pelidcula.titulo = respuesta.title,
                      pelidcula.año = respuesta.release_date,
                      pelidcula.sinopsis = respuesta.overview,
                      pelidcula.poster = path + respuesta.poster_path,
                      pelidcula.wallpaper = path + respuesta.backdrop_path,
                      pelidcula.genre = respuesta.genre_ids,
                      pelidcula.trailer = null,
                      pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                    uploadMovie(pelidcula, links.popular);
                    break;
                  case 2:
                    pelidcula.id = respuesta.id,
                      pelidcula.titulo = respuesta.title,
                      pelidcula.año = respuesta.release_date,
                      pelidcula.sinopsis = respuesta.overview,
                      pelidcula.poster = path + respuesta.poster_path,
                      pelidcula.wallpaper = path + respuesta.backdrop_path,
                      pelidcula.genre = respuesta.genre_ids,
                      pelidcula.trailer = null,
                      pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                    uploadMovie(pelidcula, links.toprated);
                    break;
                  case 3:
                    pelidcula.id = respuesta.id,
                      pelidcula.titulo = respuesta.title,
                      pelidcula.año = respuesta.release_date,
                      pelidcula.sinopsis = respuesta.overview,
                      pelidcula.poster = path + respuesta.poster_path,
                      pelidcula.wallpaper = path + respuesta.backdrop_path,
                      pelidcula.genre = respuesta.genre_ids,
                      pelidcula.trailer = null,
                      pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                    uploadMovie(pelidcula, links.upcoming);
                    break;
                  case 4:
                    pelidcula.id = respuesta.id,
                      pelidcula.titulo = respuesta.title,
                      pelidcula.año = respuesta.release_date,
                      pelidcula.sinopsis = respuesta.overview,
                      pelidcula.poster = path + respuesta.poster_path,
                      pelidcula.wallpaper = path + respuesta.backdrop_path,
                      pelidcula.genre = respuesta.genre_ids,
                      pelidcula.trailer = null,
                      pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                    uploadMovie(pelidcula, links.trending);
                    break;
                  default:
                    break;
                    
                }
            } else {
                console.log("La variable x es undefined o null.");
            }
          });
        })
        .catch(err => console.error(err));
    }
  }
}

async function uploadMovie(movie, columns) {
  try {
    //erraseAll(columns);
    const response = await fetch(columns + 'add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });

    // Parse the response JSON
    const data = await response.json();

    // Log the server response
    console.log(data);

  } catch (error) {
    // Handle errors: log the error
    console.error('Error:', error);
  }
}

erraseAll(links.nowplaying);
erraseAll(links.toprated);
erraseAll(links.popular);
erraseAll(links.trending);
erraseAll(links.upcoming);
ubdateBBDD();

async function erraseAll(columns) {
  try {
    // Make a DELETE request
    const response = await fetch(columns + 'delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Parse the response JSON
    const data = await response.json();
    // Log the server response
    console.log(data);
    console.log('row delete' + columns);
  } catch (error) {
    // Handle errors: log the error
    console.error('Error:', error);
  }
}
