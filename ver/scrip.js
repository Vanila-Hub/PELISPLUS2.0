let clicked = false;
let movie_id = sessionStorage.getItem('id');
let permiso=sessionStorage.getItem('root');
let btnFav = document.getElementById('favorites');
const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(sessionStorage.getItem('user'));
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

  //sessionStorage.removeItem('user');
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
    const movie_id = sessionStorage.getItem('id_');
    const movieee=JSON.parse(sessionStorage.getItem(`${movie_id}`));
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
      sessionStorage.setItem('id',movieee.id);
    }
  
function verTrailer() {
  location.href = "http://localhost:2007/pelis-plus/movies/trailer";
}
añadriF();

async function añadriF() {
    const getUser = JSON.parse(sessionStorage.getItem('user'));
    let  user_liked_movies = getUser.liked_movies;
    console.log(getUser);
    let movie_id = parseInt(sessionStorage.getItem('id'));
    let favStr = (sessionStorage.getItem('liked_movies'));
    console.log(favStr,movie_id);
    if (favStr!==null) {
    let favStr2 = favStr.split(',');
    let favInt = favStr2.map(id_ => parseInt(id_));
    let numerosIDs = await [...new Set(favInt)];
    let moviDDBS = Array.from(numerosIDs);
    console.log(moviDDBS);
    checkFavorites(movie_id,moviDDBS);

    btnFav.addEventListener('click',()=>{
      moviDDBS.forEach(id_ => {
        if (id_!==movie_id) {
          if (clicked!==true) {
            moviDDBS.push(movie_id);
            sessionStorage.setItem('liked_movies',moviDDBS);
            let icon = document.getElementById('icon');
           icon.className="fa fa-check";
           btnFav.style.backgroundColor='rgba(255, 0, 0, 0.99)';
           getUser.liked_movies=moviDDBS;
           clicked=true;
            console.log(getUser,user_liked_movies);
            uploadUser(getUser);
          }
        }else{
          moviDDBS = moviDDBS.filter(pel => pel !== movie_id);
          sessionStorage.setItem('liked_movies',moviDDBS);
          let icon = document.getElementById('icon');
          icon.className="fa fa-plus";
          btnFav.style.backgroundColor='#40424a';
          console.log(icon);
          getUser.liked_movies=moviDDBS;
          clicked=false;
          console.log(getUser,user_liked_movies);
          uploadUser(getUser);
        }
      });
      console.log(moviDDBS);
    });
    }else{
      btnFav.addEventListener('click',()=>{
      sessionStorage.setItem('liked_movies',movie_id);
      let icon = document.getElementById('icon');
      icon.className="fa fa-check";
      btnFav.style.backgroundColor='rgba(255, 0, 0, 0.99)';
      console.log(icon);
      getUser.liked_movies.push(movie_id);
      clicked=true;
      uploadUser(getUser);
      });
    }
    console.log(getUser._id);
}


async function uploadUser(user) {
  console.log(user);
  try {
    const pregunta = await fetch(`http://localhost:2007/pelis-plus/users/update/`+user._id,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    const res = await pregunta.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
function checkFavorites(movie_id,moviDDBS) {
  console.log(movie_id,moviDDBS);
  moviDDBS.forEach(id_ => {
    if (id_===movie_id) {
      console.log(moviDDBS,id_,movie_id);
      let icon = document.getElementById('icon');
      icon.className="fa fa-check";
      btnFav.style.backgroundColor='rgba(255, 0, 0, 0.99)';
      console.log(icon);
    }
  });
}