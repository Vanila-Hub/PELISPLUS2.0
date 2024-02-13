
let uris = [
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=",
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=",
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=",
  'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
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
  'nowplaying': 'http://localhost:2007/pelis-plus/movies/nowplayin/',
  'popular': 'http://localhost:2007/pelis-plus/movies/popular/',
  'toprated': 'http://localhost:2007/pelis-plus/movies/toprated/',
  'trending': 'http://localhost:2007/pelis-plus/movies/trending/',
  'upcoming': 'http://localhost:2007/pelis-plus/movies/upcoming/'
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
    for (let i = 1; i < 3; i++) {
      console.log(uris[linkk] + i);
      if (uris[linkk]!=uris[4]) {
        uris[linkk] = uris[linkk] + i;
      }else{
        uris[linkk] = uris[4];i++;
      }
      fetch(uris[linkk], options)
        .then(response => response.json())
        .then(response => {
          response.results.forEach(respuesta => {
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


setInterval(function () {
  erraseAll(links.nowplaying);
  erraseAll(links.toprated);
  erraseAll(links.popular);
  erraseAll(links.trending);
  erraseAll(links.upcoming);
  alert('snuicth');
  ubdateBBDD();
},60 * 1000);

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

const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(localStorage.getItem('user'));

if (getUser !== null) {
  sesion_activa.innerHTML = 'Welcome, ' + getUser.nombre;
  sesion_activa.href = "/pelis-plus/home"
}
localStorage.removeItem('user');
console.log(getUser);


/*apppen*/
let titulo;
let backrdoundIMG = '';
let calificaciones = {
  color: '',
  rating: ''
}
let trendig = document.getElementById("listwrap");
let nowPlaying = document.getElementById("Now_Playing");
let Popular = document.getElementById("Popular");
let Top_Rated = document.getElementById("Top_Rated");
let Upcoming_Movies = document.getElementById("Upcoming_Movies");
let Tv_Shows = document.getElementById("Tv_Shows");
let lista = '';
let imagen_url = '';

let creatElement = {
  elemento:'',
  imagen: '',
  wallpaper: ''
};
const esquemas = ['nowplayings','trending','upcoming','toprated','popular']
let urls = [
  'http://localhost:2007/pelis-plus/movies/trending',
  'http://localhost:2007/pelis-plus/movies/upcoming',
  'http://localhost:2007/pelis-plus/movies/toprated',
  'http://localhost:2007/pelis-plus/movies/popular',
  'http://localhost:2007/pelis-plus/movies/nowplayin',
]

let contenidos = [trendig,Upcoming_Movies,Top_Rated,Popular,nowPlaying]

for (let index = 0; index < urls.length; index++) {

  fecht_Now_playing(urls[index], contenidos[index],index);
  console.log(urls[index]);
}

async function fecht_Now_playing(row, contenido) {
  try {
    const petin = await fetch(row,{
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
      }
    })
    const res = await petin.json();

  for (let g = 0; g < res.length; g++) {
    //console.log(res[g].valoracion,contenido,g);
    app(res[g],contenido);
  }

  }
    catch(err){
      console.log("server dice que ->",err);
      alert('Error servidor no arranje');
    }
}
function app(modelo,padre) {
  console.log(padre.id);
  switch (padre.id) {
    case 'listwrap':
      imagen_url = modelo.wallpaper;
      creatElement.elemento = document.createElement('li');
      calificaciones.rating = modelo.valoracion;
      creatElement.elemento.className = "listwrap";

      if (calificaciones.rating < 10) {
        calificaciones.color = "red";
      }else if (calificaciones.rating > 10 && calificaciones.rating <=69){
        calificaciones.color = "yellow";
      }else{
        calificaciones.color = "limegreen";
      }
      IMAGENTAG = 
      `<div><img class="wallp" src="" alt="">
      <div class="padre">
      <span class="sinopsis">${modelo.sinopsis})<span class="rating" id="rating" style = " border: 5px ${calificaciones.color} solid;">${(modelo.valoracion).toString().substring(0,2)}%</span></span>
      <span class="overvew" >${modelo.titulo} (${modelo.año.substring(0,4)})</span>`
      
      IMAGENTAG.children = "hhjh";
      creatElement.elemento.id = modelo.id;
      creatElement.elemento.innerHTML = IMAGENTAG;
      padre.appendChild(creatElement.elemento);
      creatElement.elemento.children[0].children[0].src = imagen_url;
      
      break;
    case 'Top_Rated':
      imagen_url = modelo.poster;
      creatElement.elemento = document.createElement('li');
      calificaciones.rating = modelo.valoracion;
      creatElement.elemento.className = "popIMG1";

      if (calificaciones.rating < 10) {
        calificaciones.color = "red";
      }else if (calificaciones.rating > 10 && calificaciones.rating <=69){
        calificaciones.color = "yellow";
      }else{
        calificaciones.color = "limegreen";
      }
      IMAGENTAG = `<div onclick="consulta(${id=modelo.id})">
      <img class="imgPOP" src="" alt="">
      <span class="tittle">${modelo.titulo}</span>
      <span class="rating2" id="rating2" style = " border: 5px ${calificaciones.color} solid;">${(modelo.valoracion).toString().substring(0,2)}% </span>
      </div>`;
      
      creatElement.elemento.id = modelo.id;
      creatElement.elemento.innerHTML = IMAGENTAG;
      padre.appendChild(creatElement.elemento);
      creatElement.elemento.children[0].children[0].src = imagen_url;
      break;
    case 'Popular':
      imagen_url = modelo.poster;
      creatElement.elemento = document.createElement('li');
      calificaciones.rating = modelo.valoracion;
      creatElement.elemento.className = "popIMG1";

      if (calificaciones.rating < 10) {
        calificaciones.color = "red";
      }else if (calificaciones.rating > 10 && calificaciones.rating <=69){
        calificaciones.color = "yellow";
      }else{
        calificaciones.color = "limegreen";
      }
      IMAGENTAG = `<div onclick="consulta(${id=modelo.id})">
      <img class="imgPOP" src="" alt="">
      <span class="tittle">${modelo.titulo}</span>
      <span class="rating2" id="rating2" style = " border: 5px ${calificaciones.color} solid;">${(modelo.valoracion).toString().substring(0,2)}% </span>
      </div>`;
      
      creatElement.elemento.id = modelo.id;
      creatElement.elemento.innerHTML = IMAGENTAG;
      padre.appendChild(creatElement.elemento);
      creatElement.elemento.children[0].children[0].src = imagen_url;
      break;
    case 'Upcoming_Movies':
      imagen_url = modelo.poster;
      creatElement.elemento = document.createElement('li');
      calificaciones.rating = modelo.valoracion;
      creatElement.elemento.className = "popIMG1";

      if (calificaciones.rating < 10) {
        calificaciones.color = "red";
      }else if (calificaciones.rating > 10 && calificaciones.rating <=69){
        calificaciones.color = "yellow";
      }else{
        calificaciones.color = "limegreen";
      }
      IMAGENTAG = `<div onclick="consulta(${id=modelo.id})">
      <img class="imgPOP" src="" alt="">
      <span class="tittle">${modelo.titulo}</span>
      <span class="rating2" id="rating2" style = " border: 5px ${calificaciones.color} solid;">${(modelo.valoracion).toString().substring(0,2)}% </span>
      </div>`;
      
      creatElement.elemento.id = modelo.id;
      creatElement.elemento.innerHTML = IMAGENTAG;
      padre.appendChild(creatElement.elemento);
      creatElement.elemento.children[0].children[0].src = imagen_url;
      break;
    case 'Now_Playing':
      imagen_url = modelo.poster;
      creatElement.elemento = document.createElement('li');
      calificaciones.rating = modelo.valoracion;
      creatElement.elemento.className = "popIMG1";

      if (calificaciones.rating < 10) {
        calificaciones.color = "red";
      }else if (calificaciones.rating > 10 && calificaciones.rating <=69){
        calificaciones.color = "yellow";
      }else{
        calificaciones.color = "limegreen";
      }
      IMAGENTAG = `<div onclick="consulta(${id=modelo.id})">
      <img class="imgPOP" src="" alt="">
      <span class="tittle">${modelo.titulo}</span>
      <span class="rating2" id="rating2" style = " border: 5px ${calificaciones.color} solid;">${(modelo.valoracion).toString().substring(0,2)}% </span>
      </div>`;
      
      creatElement.elemento.id = modelo.id;
      creatElement.elemento.innerHTML = IMAGENTAG;
      padre.appendChild(creatElement.elemento);
      creatElement.elemento.children[0].children[0].src = imagen_url;
      break;
    default:
      break;
  }
}
async function consulta(id) {
  for (let i = 0; i < esquemas.length; i++) {
    try {
      const pregunta = await fetch(`http://localhost:2007/pelis-plus/movie/${esquemas[i]}/`+id,{
        method:'GET',
        headers: {
          'Content-Type': 'aplication/json',
        }
      })
      const res = await pregunta.json();
      console.log(res);
      if (res!=null) {
        localStorage.setItem('id',id);
        location.href = "/frontend/user_profile/profile.html";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

