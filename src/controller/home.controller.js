import view from '../views/home.html';

import { getUser, registerUser, getMovieTemplate } from '../js/UI';

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=';
const KEY = 'cea5004f';

let movies = [];
const user = getUser();

export default async () => {
   const div = document.createElement('div');
   let fragment = document.createDocumentFragment();

   div.innerHTML += view;
   movies = await getMovies();

   movies.Search.forEach(movie => {
      fragment.appendChild(printMovie(movie));
   });

   div.querySelector('#movies').appendChild(fragment);

   document.getElementById('searchField').addEventListener('search', async (e) => {
      if(e.target.value === '') return div.querySelector('#movies').innerHTML = 'No results';

      div.querySelector('#home__title').textContent = 'Results';
      const result = await getMovies(e.target.value);
      fragment = document.createDocumentFragment();

      if(result.Error) return div.querySelector('#movies').innerHTML = 'No results';

      div.querySelector('#movies').innerHTML = '';
      result.Search.forEach(movie => {
         fragment.appendChild(printMovie(movie));
      });
      div.querySelector('#movies').appendChild(fragment);
      
   });

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
   movieDiv.innerHTML = getMovieTemplate(movie);

   movieDiv.querySelector('.movie__add-favorite').addEventListener('click', () => {
      const exist = user.favorites.findIndex((favorite) => favorite.Title === movie.Title);

      if (exist >= 0) {
         movieDiv.querySelector('.favorite-icon').textContent = 'star_border';
         user.favorites.splice(exist, 1);
      } else {
         user.favorites.push(movie);
         movieDiv.querySelector('.favorite-icon').textContent = 'star';
      }
      localStorage.setItem(user.username, JSON.stringify(user));
      sessionStorage.setItem('omdbSession', JSON.stringify(user));
   });

   return movieDiv;
}
