import view from '../views/favorites.html';

import { getUser, getMovieTemplate } from '../js/UI';

export default () => {
   const div = document.createElement('div');
   const user = getUser();

   div.innerHTML = view;

   if(user.favorites.length > 0) {
      const fragment = document.createDocumentFragment();

      user.favorites.forEach(movie => {
         fragment.appendChild(printMovie(movie, user));
      });

      div.querySelector('#movies').appendChild(fragment);
   } else div.innerHTML += 'No movies';

   return div;
}

function printMovie(movie, user) {
   const movieDiv = document.createElement('div');
   movieDiv.className = 'movie';
   movieDiv.innerHTML = getMovieTemplate(movie);

   movieDiv.querySelector('.movie__add-favorite').addEventListener('click', () => {
      const exist = user.favorites.findIndex((favorite) => favorite.Title === movie.Title);

      if(exist >= 0) {
         movieDiv.querySelector('.favorite-icon').textContent = 'star_border';
         user.favorites.splice(exist, 1);
      } else {
         user.favorites.push(movie);
         movieDiv.querySelector('.favorite-icon').textContent = 'star';
      }
      sessionStorage.setItem('omdbSession', JSON.stringify(user));
      localStorage.setItem(user.username, JSON.stringify(user));
   });

   return movieDiv;
}