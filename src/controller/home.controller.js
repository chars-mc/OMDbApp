import view from '../views/home.html';

const movies = [];

export default () => {
   const div = document.createElement('div');
   div.innerHTML += view;

   return div;
};