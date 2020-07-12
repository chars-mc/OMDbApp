import view from '../views/login.html';

export default () => {
   const div = document.createElement('div');
   div.innerHTML = view;

   return div;
}