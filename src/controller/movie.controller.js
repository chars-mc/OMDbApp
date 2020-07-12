import view from '../views/movie.html';

export default () => {
   const div = document.createElement('div');
   div.innerHTML = view;

   return div;
}