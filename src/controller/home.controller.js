import view from '../views/home.html';

import { getUser, printMovie } from '../js/UI';

const URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=';
const KEY = 'cea5004f';

let movies = [];

export default async () => {
   let user = getUser();
   const div = document.createElement('div');
   let fragment = document.createDocumentFragment();

   document.getElementById('header__search').classList.remove('is-hide');
   div.innerHTML += view;
   movies = await getMovies();

   movies.Search.forEach(movie => {
      fragment.appendChild(printMovie(movie, user));
   });

   div.querySelector('#movies').appendChild(fragment);

   document.getElementById('searchField').addEventListener('search', async (e) => {
      document.getElementById('root').classList.remove('is-blur');
      if(e.target.value === '') return div.querySelector('#movies').innerHTML = 'No results';

      localStorage.setItem('omdbSessionLastSearch', e.target.value);
      div.querySelector('#home__title').textContent = 'Results';
      const result = await getMovies(e.target.value);
      fragment = document.createDocumentFragment();
      
      if(result.Error) return div.querySelector('#movies').innerHTML = 'No results';
      
      div.querySelector('#movies').innerHTML = '';
      result.Search.forEach(movie => {
         fragment.appendChild(printMovie(movie, user));
      });
      div.querySelector('#movies').appendChild(fragment);
      
      e.target.value = '';

      e.target.blur();
   });

   return div;
};

async function getMovies(search = localStorage.getItem('omdbSessionLastSearch') ||'robot') {
   const data = await fetch(`${URL}${KEY}&s=${search}`);
   const dataJSON = await data.json();

   return dataJSON;
}