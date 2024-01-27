let uris = [
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=",
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=",
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
  'nowplaying': 'http://localhost:2007/pelis-plus/users/nowplayin/',
  'popular': 'http://localhost:2007/pelis-plus/users/popular/',
  'toprated': 'http://localhost:2007/pelis-plus/users/toprated/',
  'upcoming': 'http://localhost:2007/pelis-plus/users/upcoming/'
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjk1NWEyMzU3NmE4NzdiNGI0NDA4NjdiZDdmYTNkNSIsInN1YiI6IjY1NzA5MmY5YzhhMmQ0MDBlMTBiZmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQj2s2CEnp2kYdF1g3k6xnocEjxSMyfbBvZWI0nuj0c'
  }
};
for (let linkk = 0; linkk < uris.length; linkk++) {
  for (let i = 1; i < 3; i++) {
    fetch(uris[linkk] + i, options)
      .then(response => response.json())
      .then(response => {
        response.results.forEach(respuesta => {
          switch (linkk) {
            case 0:
              pelidcula.id = respuesta.id,
                pelidcula.titulo = respuesta.title,
                pelidcula.año = respuesta.release_date,
                pelidcula.sinopsis = respuesta.overview,
                pelidcula.poster = respuesta.poster_path,
                pelidcula.wallpaper = respuesta.backdrop_path,
                pelidcula.genre = respuesta.genre_ids,
                pelidcula.trailer = null,
                pelidcula.valoracion = respuesta.vote_average * 100 / 10;
              uploadMovie(pelidcula,links.nowplaying);
              break;
            case 1:
             // console.log(response);
              pelidcula.id = respuesta.id,
                pelidcula.titulo = respuesta.title,
                pelidcula.año = respuesta.release_date,
                pelidcula.sinopsis = respuesta.overview,
                pelidcula.poster = respuesta.poster_path,
                pelidcula.wallpaper = respuesta.backdrop_path,
                pelidcula.genre = respuesta.genre_ids,
                pelidcula.trailer = null,
                pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                uploadMovie(pelidcula,links.popular);
              break;
            case 2:
              pelidcula.id = respuesta.id,
                pelidcula.titulo = respuesta.title,
                pelidcula.año = respuesta.release_date,
                pelidcula.sinopsis = respuesta.overview,
                pelidcula.poster = respuesta.poster_path,
                pelidcula.wallpaper = respuesta.backdrop_path,
                pelidcula.genre = respuesta.genre_ids,
                pelidcula.trailer = null,
                pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                uploadMovie(pelidcula,links.toprated);
              break;
            case 3:
              pelidcula.id = respuesta.id,
                pelidcula.titulo = respuesta.title,
                pelidcula.año = respuesta.release_date,
                pelidcula.sinopsis = respuesta.overview,
                pelidcula.poster = respuesta.poster_path,
                pelidcula.wallpaper = respuesta.backdrop_path,
                pelidcula.genre = respuesta.genre_ids,
                pelidcula.trailer = null,
                pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                uploadMovie(pelidcula,links.upcoming);
              break;
            default:
              break;
          }
        });
      })
      .catch(err => console.error(err));
  }
}

async function uploadMovie(movie,columns) {
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


const intervalId2 = setInterval(erraseAll(links.upcoming), 2 * 60 * 1000);
const intervalId3 = setInterval(erraseAll(links.nowplaying), 2 * 60 * 1000);
const intervalId4 = setInterval(erraseAll(links.toprated), 2 * 60 * 1000);
const intervalId5 = setInterval(erraseAll(links.popular), 2 * 60 * 1000);

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
      alert('row delete');

    } catch (error) {
      // Handle errors: log the error
      console.error('Error:', error);
  }
}