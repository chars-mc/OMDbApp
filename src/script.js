import './style.scss';
import './static/icon.png';

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=';
const KEY = 'cea5004f';

const menu = document.getElementById('menu');
const searchField = document.getElementById('searchField');

import { Router } from './router/Router';

window.addEventListener('hashchange', () => {
   Router(location.hash);
   hideElement(menu);
   hideElement(searchField);
});

window.addEventListener('load', () => {
   Router(location.hash === ''? '#/': location.hash);

   document.getElementById('menuButton').addEventListener('click', () => {
      menu.classList.toggle('is-hide');
      hideElement(searchField);
   });
   document.getElementById('searchButton').addEventListener('click', (e) => {
      e.preventDefault();
      searchField.classList.toggle('is-hide');
      hideElement(menu);
   });

});

window.addEventListener('resize', () => {
   if(window.innerWidth >= 720) {
      hideElement(menu);
      hideElement(searchField);
   }
});

function hideElement(element) {
   if(!element.classList.contains('is-hide'))
      element.classList.add('is-hide');
}