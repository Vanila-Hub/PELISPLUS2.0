let i=0;
let resultados = [];
const esquemas = ['nowplayings','trending','upcoming','toprated','popular']
const sectio = document.getElementById('miList');
const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(localStorage.getItem('user'));
let imagen_url = '';
let creatElement = {
    elemento:'',
    imagen: '',
    wallpaper: ''
  };
if (getUser !== null) {
    sesion_activa.innerHTML = 'Sing-out, ' + getUser.nombre;
    sesion_activa.href = "/pelis-plus/home"
}

run();

function run() {
    for (let index = 0; index <60; index++) {
        localStorage.removeItem(`peli${index}`);
    }
    //console.log(getUser);
    let movie_id = parseInt(localStorage.getItem('id'));
    let favStr = (localStorage.getItem('liked_movies'));
    if (favStr!==null) {
    let favStr2 = favStr.split(',');
    let favInt = favStr2.map(id_ => parseInt(id_));
    let numerosIDs = [...new Set(favInt)];
    let moviDDBS = Array.from(numerosIDs);
    console.log(moviDDBS);
    moviDDBS.forEach(e => {
        search_movie(e);
    });
 }
}

async function search_movie(id) {
    let path = 'https://image.tmdb.org/t/p/original';
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
    let uris = `https://api.themoviedb.org/3/movie/${id}?api_key=bf955a23576a877b4b440867bd7fa3d5`;
    try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
            }
          };
            fetch(uris, options)
              .then(response => response.json())
              .then(response => {
                let respuesta = response;
                    console.log(respuesta);
                    pelidcula.wallpaper = path + respuesta.backdrop_path,
                    pelidcula.id = respuesta.id,
                    pelidcula.titulo = respuesta.title,
                    pelidcula.año = respuesta.release_date,
                    pelidcula.sinopsis =respuesta.overview,
                    pelidcula.poster =  path +  respuesta.poster_path,
                    pelidcula.genre = respuesta.genre_ids,
                    pelidcula.trailer = null,
                    pelidcula.valoracion = respuesta.vote_average * 100 / 10;
                    i++;
                    console.log(i,pelidcula);
                    añadrirP(pelidcula,i);     
              })
              .finally(()=>{
                for (let index = 1; index < localStorage.length; index++) {
                    console.log(JSON.parse(localStorage.getItem(`peli${index}`)));
                    let movie = `peli${index}`;
                    console.log(movie);
                    let url= JSON.parse(localStorage.getItem((`peli${index}`)));
                    if (url.poster!="https://image.tmdb.org/t/p/originalnull") {
                        let modulo = `<img class="imgPOP" src="${url.poster}" alt="" id="${movie}" onclick="consulta(id)">`;
                        const nuevoElemento = document.createElement("li");
                        nuevoElemento.className="li";
                        nuevoElemento.innerHTML = modulo;
                        sectio.appendChild(nuevoElemento);
                        console.log(modulo,nuevoElemento,sectio);
                    }
                    i=0;
                }
              })
    } catch (error) {
        console.log(error);
    }
}

function añadrirP(peliculas,i) {
    console.log("me bvebgoooo");
    localStorage.setItem(`peli${i}`,JSON.stringify(peliculas));
}
function consulta(id) {
    console.log(id.value);
    localStorage.setItem('id_',id);
    localStorage.setItem('root',"no");
    location.href = "http://localhost:2007/pelis-plus/movies/ver/"+id;
}