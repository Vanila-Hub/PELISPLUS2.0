let movie_id = sessionStorage.getItem('id');
const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(sessionStorage.getItem('user'));
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
  '/pelis-plus/movies/trending',
  '/pelis-plus/movies/upcoming',
  '/pelis-plus/movies/toprated',
  '/pelis-plus/movies/popular',
  '/pelis-plus/movies/nowplayin',
]
let permis = sessionStorage.getItem('root');
if (getUser !== null) {
  if (sesion_activa.innerText=='Sing-out, franky') {
    sessionStorage.removeItem('user');
  }else{
    sesion_activa.innerHTML = 'Sing-out, ' + getUser.nombre;
    sesion_activa.href = "blank"
    sesion_activa.addEventListener('click',()=>{
      sessionStorage.clear();
      sesion_activa.href = "/pelis-plus/home"
    });
  }
}
trailer();
busqueda();


function trailer(){
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjk1NWEyMzU3NmE4NzdiNGI0NDA4NjdiZDdmYTNkNSIsInN1YiI6IjY1NzA5MmY5YzhhMmQ0MDBlMTBiZmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQj2s2CEnp2kYdF1g3k6xnocEjxSMyfbBvZWI0nuj0c'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => {
      for (let index = 0; index < response.results.length; index++) {
        if (response.results[index].name.includes("railer")) {
          sessionStorage.setItem('id_trailer',response.results[index].key);
          let id_trailer= sessionStorage.getItem('id_trailer');
          iframe.src = youtube_link + id_trailer;
          console.log(response.results[index].name);
          break;
        }
        //console.log(response);
      }
    })
    .catch(err => console.error(err));
  }
function busqueda(){
  let movie_id = sessionStorage.getItem('id_');
  img_bak.src = res.wallpaper;
  titulo.innerHTML = res.titulo + ` (${res.año.substring(0,4)})`;
  document.title="Ver " + res.titulo + " | Pelis+";
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
  