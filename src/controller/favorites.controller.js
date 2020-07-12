import view from '../views/favorites.html';

export default () => {
   const div = document.createElement('div');
   div.innerHTML = view;

   return div;
}