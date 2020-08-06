import './style.scss';
import './static/icon.png';

const menu = document.getElementById('menu');
const searchField = document.getElementById('searchField');

import { Router } from './router/Router';
import { hideElement, logOut } from './js/UI';

window.addEventListener('hashchange', () => {
   Router(location.hash);
   hideElement(menu);
   hideElement(searchField);
   removeBlurBackground();
});

window.addEventListener('load', () => {
   Router(location.hash);

   document.getElementById('menuButton').addEventListener('click', () => {
      menu.classList.toggle('is-hide');
      hideElement(searchField);
      removeBlurBackground();
      addBlurBackground();
   });
   document.getElementById('searchButton').addEventListener('click', (e) => {
      e.preventDefault();
      searchField.classList.toggle('is-hide');
      hideElement(menu);
      removeBlurBackground();
      addBlurBackground();
   });

   document.getElementById('logout').addEventListener('click', logOut);
});

window.addEventListener('resize', () => {
   if(window.innerWidth >= 720) {
      hideElement(menu);
      hideElement(searchField);
      removeBlurBackground();
   }
});

function addBlurBackground() {
   const root = document.getElementById('root');

   if(!hasClass(menu, 'is-hide') || !hasClass(searchField, 'is-hide') && !hasClass(root, 'is-blur')) root.classList.add('is-blur');
      else removeBlurBackground();
}

function removeBlurBackground() {
   document.getElementById('root').classList.remove('is-blur');
}

function hasClass(element, classString) {
   return element.classList.contains(classString);
}