import view from '../views/favorites.html';

import { getUser, getMovieTemplate } from '../js/UI';

export default () => {
   const div = document.createElement('div');
   const user = getUser();

   div.innerHTML = view;

   if(user.favorites.length > 0) {
      const fragment = document.createDocumentFragment();

      user.favorites.forEach(movie => {
         fragment.appendChild(printMovie(movie));
      });

      div.querySelector('#movies').appendChild(fragment);
   } else div.innerHTML += 'No movies';

   return div;
}

function printMovie(movie) {
   const movieDiv = document.createElement('div');
   movieDiv.className = 'movie';
   movieDiv.innerHTML = getMovieTemplate(movie);

   return movieDiv;
}