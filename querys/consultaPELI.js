let resultados = [];
const esquemas = ['nowplayings','trending','upcoming','toprated','popular']
const sectio = document.getElementById('miList');
const sesion_activa = document.getElementById('userTXT');
const getUser = JSON.parse(localStorage.getItem('user'));
let i=0;miList
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
async function leer(key) {
    if(key.keyCode != 13){
        for (let index = 0; index <60; index++) {
            await localStorage.removeItem(`peli${index}`);
        }
        let input = document.getElementById('input');
        const query_ = input.value.replace(/ /g, "%20");
        console.log(query_);
        sectio.innerHTML="";
        search_movie(query_);
    }
}

async function search_movie(query) {
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
    let uris = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjk1NWEyMzU3NmE4NzdiNGI0NDA4NjdiZDdmYTNkNSIsInN1YiI6IjY1NzA5MmY5YzhhMmQ0MDBlMTBiZmI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WQj2s2CEnp2kYdF1g3k6xnocEjxSMyfbBvZWI0nuj0c'
        }
      };
        fetch(uris, options)
          .then(response => response.json())
          .then(response => {
            response.results.forEach(respuesta => {
                //console.log(response.results.length);
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
                //console.log(i);
                añadrirP(pelidcula,i);     
            });
            
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
          .catch(err => console.error(err));
}

function añadrirP(peliculas,i) {
    localStorage.setItem(`peli${i}`,JSON.stringify(peliculas));
}
function consulta(id) {
    console.log(id.value);
    localStorage.setItem('id_',id);
    localStorage.setItem('root',"no");
    location.href = "http://localhost:2007/pelis-plus/movies/ver/"+id;
}