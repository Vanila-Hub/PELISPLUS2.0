let i=0;
let resultados = [];
let index=1;
const esquemas = ['nowplayings','trending','upcoming','toprated','popular']
const sectio = document.getElementById('miList');
const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(sessionStorage.getItem('user'));
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
if (parseInt(localStorage.getItem('pageReloaded'))<4) {
    // Set the flag indicating that the page has been reloaded
    switch (parseInt(localStorage.getItem('pageReloaded'))) {
        case 0:
            localStorage.setItem('pageReloaded', '1');
            location.href="/pelis-plus/profile";
            break;
        case 1:
            localStorage.setItem('pageReloaded', '2');
            location.href="/pelis-plus/profile";
            break;
        case 2:
            localStorage.setItem('pageReloaded', '3');
            location.href="/pelis-plus/profile";
            break;
        case 3:
            localStorage.setItem('pageReloaded', '4');
            location.href="/pelis-plus/profile";
            break;
        case 4:
            localStorage.setItem('pageReloaded', '5');
            location.href="/pelis-plus/profile";
            break;
    
        default:
            break;
    }
}
run();
async function run() {
    //console.log(getUser);
    updateStorage();
    let favStr = (sessionStorage.getItem('liked_movies'));
    if (favStr!==null) {
    let favStr2 = favStr.split(',');
    let favInt = favStr2.map(id_ => parseInt(id_));
    let numerosIDs = [...new Set(favInt)];
    let moviDDBS = Array.from(numerosIDs);
    console.log(moviDDBS);
    moviDDBS.forEach(e => {
        search_movie(e);
    });
    console.log( moviDDBS.length+1);
    await crearElement(moviDDBS);
 }
}

async function updateStorage() {
    try {
        const peticion = await fetch(`/pelis-plus/users/get/${getUser._id}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'aplication/json',
            }
          })
          const respuesta = await peticion.json();
          console.log(`/pelis-plus/users/get/${getUser._id}`);
          if(respuesta.message != 'User not found'){
            console.log(respuesta);
            let favStr = respuesta.liked_movies;
            console.log(favStr);
            sessionStorage.setItem('liked_movies',favStr);
          }else{
            alert('User not found');
          }
    } catch (error) {
        console.log(error);
    }
}

async function crearElement(moviDDBS) {
    if (moviDDBS[1]>0) {
        for (let index = 1; index < moviDDBS.length+1; index++) {
            let movie = `movie${index}`;
            console.log(movie);
            console.log(JSON.parse(sessionStorage.getItem(`movie${index}`)));
            let url= JSON.parse(sessionStorage.getItem((`movie${index}`)));
            if (url.poster=="https://image.tmdb.org/t/p/originalundefined" || url==undefined) {
                location.href="/pelis-plus/profile";
            }

            if (url.poster!="https://image.tmdb.org/t/p/originalnull") {
                let modulo = `<img class="imgPOP" src="${url.poster}" alt="" id="${movie}" onclick="consulta(id)">`;
                const nuevoElemento = document.createElement("li");
                nuevoElemento.className="li";
                nuevoElemento.innerHTML = modulo;
                sectio.appendChild(nuevoElemento);
                console.log(modulo,nuevoElemento,sectio);
            }
        }
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
                    //console.log(respuesta);
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
                    //console.log(i,pelidcula);
                    añadrirP(pelidcula,i);     
              })
    } catch (error) {
        console.log(error);
    }
}

function añadrirP(peliculas,i) {
    console.log("me bvebgoooo");
    sessionStorage.setItem(`movie${i}`,JSON.stringify(peliculas));
}
function consulta(id) {
    console.log(id.value);
    sessionStorage.setItem('id_',id);
    sessionStorage.setItem('root',"no");
    location.href = "/pelis-plus/movies/ver/"+id;
}
Sortable.create(sectio,{
    animation:150,
    chosenClass: "selecionado",
    dragClass: "f"
})