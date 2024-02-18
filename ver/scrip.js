let movie_id = localStorage.getItem('id');
let permiso=localStorage.getItem('root');
let liked_movies=[];
const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(localStorage.getItem('user'));
//const getCUser = JSON.parse(document.cookie);
const img_bak = document.getElementById('imgPOP');
const iframe = document.getElementById('iframe');
const titulo = document.getElementById('titulo');
const sinopsis = document.getElementById('sinopsis');
const rating = document.getElementById('rating');
const youtube_link = "https://www.youtube.com/embed/";
let calificaciones = {
  color: '',
  rating: ''
}
const esquemas = ['nowplayings','trending','upcoming','toprated','popular']
let urls = [
  'http://localhost:2007/pelis-plus/movies/trending',
  'http://localhost:2007/pelis-plus/movies/upcoming',
  'http://localhost:2007/pelis-plus/movies/toprated',
  'http://localhost:2007/pelis-plus/movies/popular',
  'http://localhost:2007/pelis-plus/movies/nowplayin',
]
if (getUser !== null) {
  sesion_activa.innerHTML = 'Sing-out, ' + getUser.nombre;
  sesion_activa.href = "/pelis-plus/home"
  console.log(getUser.nombre);
}
if (permiso=='yes') {
  run();
}else{
  trailer();
}

function run(){

  //localStorage.removeItem('user');
  //console.log(img_bak.src);

console.log(movie_id);
consulta(movie_id);

async function consulta(id) {
  for (let i = 0; i < esquemas.length; i++) {
    try {
      const pregunta = await fetch(`http://localhost:2007/pelis-plus/movies/${esquemas[i]}/`+id,{
        method:'GET',
        headers: {
          'Content-Type': 'aplication/json',
        }
      })
      const res = await pregunta.json();
    
      if (res.message!== "Movie not found") {
        img_bak.src = res.wallpaper;
        titulo.innerHTML = res.titulo + ` (${res.año.substring(0,4)})`;
        sinopsis.innerHTML=res.sinopsis;

        if (res.valoracion < 10) {
          calificaciones.color = "red";
        }else if (res.valoracion > 10 && res.valoracion <=69){
          calificaciones.color = "yellow";
        }else{
          calificaciones.color = "limegreen";
        }
        console.log(calificaciones.color);
        rating.innerHTML = res.valoracion.toString().substring(0,2) + "%";
        rating.style.border= `5px solid ${calificaciones.color}`;
        console.log(res);
        console.log(img_bak.src);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
}

function trailer(){
    const movie_id = localStorage.getItem('id_');
    const movieee=JSON.parse(localStorage.getItem(`${movie_id}`));
    console.log(movieee);
      document.title="Ver " + movieee.titulo + " | Pelis+";
      img_bak.src = movieee.wallpaper;
      titulo.innerHTML = movieee.titulo + ` (${movieee.año.substring(0,4)})`;
      document.title="Ver " + movieee.titulo + " | Pelis+";
      sinopsis.innerHTML=movieee.sinopsis;

      if (movieee.valoracion < 10) {
        calificaciones.color = "red";
      }else if (movieee.valoracion > 10 && movieee.valoracion <=69){
        calificaciones.color = "yellow";
      }else{
        calificaciones.color = "limegreen";
      }
      console.log(calificaciones.color);
      rating.innerHTML = movieee.valoracion.toString().substring(0,2) + "%";
      rating.style.border= `5px solid ${calificaciones.color}`;
      console.log(movieee);
      console.log(img_bak.src);
      localStorage.setItem('id',movieee.id);
    }
  
function verTrailer() {
  location.href = "http://localhost:2007/pelis-plus/movies/trailer";
}
function añadriF() {
  const getUser = JSON.parse(localStorage.getItem('user'));
  let movie_id = localStorage.getItem('id');
  liked_movies.push(localStorage.getItem('liked_movies'));
  liked_movies.push(movie_id);
  localStorage.setItem('liked_movies',liked_movies).replace(",", ":");
  console.log(liked_movies);
  document.cookie=liked_movies;
  let icon = document.getElementById('icon');
  icon.className="fa fa-check";
  console.log(icon);
}