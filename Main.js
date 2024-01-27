
let titulo;
let backrdoundIMG = '';
let calificaciones = {
  color:'',
  rating:''
} 
let trendig = document.getElementById("listwrap"); 
let nowPlaying = document.getElementById("Now_Playing"); 
let Popular = document.getElementById("Popular"); 
let Top_Rated = document.getElementById("Top_Rated"); 
let Upcoming_Movies = document.getElementById("Upcoming_Movies"); 
let Tv_Shows = document.getElementById("Tv_Shows"); 
let lista = '';
let creatElement = {
    elemento:'',
    imagen: '',
    wallpaper: ''
};


/* TDMD */
let dataJSON;
let path = 'https://image.tmdb.org/t/p/original//';
let imagen_url = '';
let backgroundIMG_path = '';
let IMAGENTAG = `<img class="imgPOP" src="" alt=""></img>`;
const GENEROSPOSIBLES = {
    action:28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History:   36,
    Horror:    27,
    Music:     10402,
    Mystery:   9648,
    Romance:   10749,
    Science_Fiction: 878,
    TV_Movie:  10770,
    Thriller:  53,
    War:       10752,
    Western:   37
};
let pelicula = {
  id:'',
  titulo:'',
  año:'',
  sinopsis:'',
  poster:'',
  wallpaper:'',
  genre:[''],
  duracion:0,
  valoracion:0,
  trailer:''
}
let urls = [
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2",
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=3",
  "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
]
let contenidos = [nowPlaying,Popular,Top_Rated,Upcoming_Movies,Tv_Shows,trendig]

for (let index = 0; index < urls.length; index++) {
    
 fecht_Now_playing(urls[index],contenidos[index]);
  
}

function fecht_Now_playing(row,contenido) {
  const valores = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjk1NWEyMzU3NmE4NzdiNGI0NDA4NjdiZDdmYTNkNSIsInN1YiI6IjY1NzA5MmY5YzhhMmQ0MDBlMTBiZmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQj2s2CEnp2kYdF1g3k6xnocEjxSMyfbBvZWI0nuj0c'
    }
  };
  fetch(row,valores)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      appJSON(respuesta,contenido); 
      
    })
    .catch(err => console.log(err))
}

function appJSON(Arch_json,contenido) {
  for (let index = 0; index < Arch_json.results.length; index++) {
    if (contenido == trendig) {
      imagen_url = path + Arch_json.results[index].backdrop_path;
    } else {
      
      imagen_url = path + Arch_json.results[index].poster_path;
    }
    backrdoundIMG[index] = path + Arch_json.results[index].poster_path;
    
    crearLista(contenido,Arch_json,index);
    creatElement.elemento.children[0].children[0].src = imagen_url;
    
  }
}
function crearLista(nodoPadre,Arch_json,index) {
      creatElement.elemento = document.createElement('li');
      calificaciones.rating = Arch_json.results[index].vote_average*100/10;
        if (calificaciones.rating < 10) {
          calificaciones.color = "red";
        }else if (calificaciones.rating > 10 && calificaciones.rating <=69){
          calificaciones.color = "yellow";
        }else{
          calificaciones.color = "limegreen";
        }
      if (nodoPadre == trendig) {
        creatElement.elemento.className = "listwrap";
        IMAGENTAG = 
        `<div><img class="wallp" src="" alt="">
        <div class="padre">
        <span class="sinopsis">${Arch_json.results[index].overview})<span class="rating" id="rating" style = " border: 5px ${calificaciones.color} solid;">${(Arch_json.results[index].vote_average*100/10).toString().substring(0,2)}%</span></span>
        <span class="overvew" >${Arch_json.results[index].title} (${Arch_json.results[index].release_date.substring(0,4)})</span>`
        IMAGENTAG.children = "hhjh";
        creatElement.elemento.innerHTML = IMAGENTAG;
      } else {
        if (nodoPadre != Tv_Shows) {
          titulo = Arch_json.results[index].title;
        }else{titulo = Arch_json.results[index].name;}

        creatElement.elemento.className = "popIMG1";
        IMAGENTAG = `<div onclick="consulta(${id=Arch_json.results[index].id})">
        <img class="imgPOP" src="" alt="">
        <span class="tittle">${titulo}</span><span class="rating2" id="rating2" style = " border: 5px ${calificaciones.color} solid;">${(Arch_json.results[index].vote_average*100/10).toString().substring(0,2)}% </span>
        </div>`;
        creatElement.elemento.id = id=Arch_json.results[index].id;
        creatElement.elemento.innerHTML = IMAGENTAG;
      }
      nodoPadre.appendChild(creatElement.elemento);
}
function consulta(query) {
  let idPELI = `querys/Wacth.html`;
  console.log(query);
  //window.open(idPELI,"_self")
}

const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(localStorage.getItem('user'));

if(getUser !== null){
  sesion_activa.innerHTML = 'Welcome, ' + getUser.nombre;
  sesion_activa.href = "/pelis-plus/home"
}
localStorage.removeItem('user');
console.log(getUser);