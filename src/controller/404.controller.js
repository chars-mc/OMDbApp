import view from '../views/404.html';

export default () => {
   const div = document.createElement('div');
   div.innerHTML = view;
   
   return div;
}