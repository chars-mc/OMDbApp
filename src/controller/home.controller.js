import view from '../views/home.html';

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=';
const KEY = 'cea5004f';

let movies = [];

export default async () => {
   const div = document.createElement('div');
   let fragment = document.createDocumentFragment();

   div.innerHTML += view;
   movies = await getMovies();

   // console.log(movies);
   movies.Search.forEach(movie => {
      fragment.appendChild(printMovie(movie));
      console.log(movie)
   });

   div.querySelector('#movies').appendChild(fragment);
   
   return div;
};

async function getMovies(search = 'robot') {
   const data = await fetch(`${URL}${KEY}&s=${search}`);
   const dataJSON = await data.json();

   return dataJSON;
}

function printMovie(movie) {
   const movieDiv = document.createElement('div');
   movieDiv.className = 'movie';
   movieDiv.innerHTML = /*html*/ `
      <img src="${movie.Poster}" alt="${movie.Title}" class="movie__poster">
      <div class="movie__details">
         <h4 class="movie__title">${movie.Title}</h4>
         <div class="movie__actions">
            <a href="#/movie/${movie.Title}" class="movie__read-more">READ MORE
               <i class="material-icons">arrow_right</i>
            </a>
            <button class="movie__add-favorite button">
               <i class="material-icons">star_border</i>
            </button>
         </div>
      </div>`;

   return movieDiv;
}
