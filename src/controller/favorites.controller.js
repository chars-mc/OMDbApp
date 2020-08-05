import view from '../views/favorites.html';

import { getUser, printMovie } from '../js/UI';

export default () => {
   const div = document.createElement('div');
   let user = getUser();

   div.innerHTML = view;
   document.getElementById('header__search').classList.add('is-hide');

   if(user.favorites.length > 0) {
      const fragment = document.createDocumentFragment();

      user.favorites.forEach(movie => {
         fragment.appendChild(printMovie(movie, user));
      });

      div.querySelector('#movies').appendChild(fragment);
   } else div.innerHTML += 'No movies';

   return div;
}