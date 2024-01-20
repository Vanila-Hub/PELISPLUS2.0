const fs = require('fs');
let dataJSON = "";
let contenidos = ["nowPlaying","Popular","Top_Rated","Upcoming_Movies"]
let urls = [
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=5',
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=5",
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=5",
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=5",
]


let peliculas = 
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
let pelisenJSON = `{
    "id": 0,
    "titulo": "",
    "año": "",
    "sinopsis": "",
    "poster": "",
    "wallpaper": "",
    "genre": [

    ],
    "duracion": 0,
    "valoracion": 0,
    "trailer": ""
  }
`;

for (let index = 0; index < urls.length; index++) {
    
    fecht_Now_playing(urls[index],contenidos[index],index);
     
   }
   
   function fecht_Now_playing(row,contenido,index) {
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
        
        for (let index = 0; index < respuesta.results.length; index++) {
          if (contenido != "Tv_Shows") {
            pelisenJSON = `\n {
              "id": ${peliculas.id = respuesta.results[index].id},
              "titulo": "${peliculas.titulo = respuesta.results[index].title}",
              "fecha_estreno": "${respuesta.results[index].release_date}",
              "sinopsis": "${respuesta.results[index].overview}",
              "poster": "${respuesta.results[index].poster_path}",
              "wallpaper": "${respuesta.results[index].backdrop_path}",
              "genre": [${respuesta.results[index].genre_ids}],
              "duracion": "null",
              "valoracion": "${respuesta.results[index].vote_average*100/10}",
              "trailer": "null"},
              \n
            `
            //console.log(respuesta.results[index].title);
          }else{
            //console.log(respuesta.results[index].title);
            pelisenJSON = `\n {
              "id": ${peliculas.id = respuesta.results[index].id},
              "titulo": "${peliculas.titulo = respuesta.results[index].name}",
              "fecha_estreno": "${respuesta.results[index].release_date}",
              "sinopsis": "${respuesta.results[index].overview}",
              "poster": "${respuesta.results[index].poster_path}",
              "wallpaper": "${respuesta.results[index].backdrop_path}",
              "genre": [${respuesta.results[index].genre_ids}],
              "duracion": "null",
              "valoracion": "${respuesta.results[index].vote_average*100/10}",
              "trailer": "null"\n
              },
            `
          }
          //inicio(contenido,peliculas); 
          appJSON(contenido,peliculas); 
          //fin();
        }
        
       })
       .catch(err => console.log(err))
}

async function appJSON(contenido,peliculas) {

   await fs.appendFile(`./scrips/tmdb/${contenido}.json`, `${pelisenJSON}` , (err,data) => {
    if (err) {
        console.log(err);
        return;
    }
    })
}

async function inicio(contenido,peliculas) {

  await fs.writeFile(`./scrips/tmdb/${contenido}.json`, `` , (err,data) => {
   if (err) {
       console.log(err);
       return;
   }
   })
}

async function fin() {
  for (let index = 0; index < contenidos.length; index++) {
    await fs.appendFile(`./scrips/tmdb/${contenidos[index]}.json`, `]` , (err,data) => {
      if (err) {
          console.log(err);
          return;
      }
      })
    
  }

}
