import './style.scss';
import './static/icon.png';

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=';
const KEY = 'cea5004f';

const menu = document.getElementById('menu');

window.addEventListener('load', () => {
   document.getElementById('menuButton').addEventListener('click', () => {
      menu.classList.toggle('is-hide');
   });
   
});

window.addEventListener('resize', () => {
   if(window.innerWidth >= 720) {
      if(!menu.classList.contains('is-hide')); {
         menu.classList.add('is-hide');
      }
   }
})