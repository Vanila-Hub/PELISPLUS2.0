let nowPlaying = document.getElementById("Now_Playing"); 
let Popular = document.getElementById("Popular"); 
let Top_Rated = document.getElementById("Top_Rated"); 
let Upcoming_Movies = document.getElementById("Upcoming_Movies"); 
let Tv_Shows = document.getElementById("Tv_Shows"); 
let path = 'https://image.tmdb.org/t/p/original//';
let imagen_url = '';
const imagen_fondo = `<img class="imagen" src="" alt=""></img>`;
let lista = '';
const generosPosibles = {
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
let dataJSON ="";
let pelicula = {
    id:'',
    titulo:'',
    año:'',
    sinopsis:'',
    imagen:'',
    genre:['']
}
