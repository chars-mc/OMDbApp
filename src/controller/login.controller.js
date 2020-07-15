import view from '../views/login.html';

import '../js/UI';
import { User } from '../js/User';
import { userExist, verifyPassword, logIn, registerUser, hideElement, showElement, getUser } from '../js/UI';

export default () => {
   const div = document.createElement('div');

   hideElement(document.getElementById('header__menu'));
   hideElement(document.getElementById('header__search'));
   hideElement(document.getElementById('header__logo'));
   document.getElementById('header__logo').style.gridColumn = 'span 3';
   
   div.innerHTML = view;
   
   div.querySelector('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      
      let user = new User(e.target.username.value, e.target.password.value, []);
      const errors = verifyUser(user.username, user.password);
      
      if (errors.length > 0) return printErrors(errors, div.querySelector('#errors'));
      
      if (!userExist(user.username)) registerUser(user);
      else logIn(user);
      
      showElement(document.getElementById('header__menu'))
      showElement(document.getElementById('header__search'))
      showElement(document.getElementById('header__logo'))
      document.getElementById('header__logo').style.gridColumn = 'span 1';

      console.log(getUser());

      location.hash = '#/';
   });

   return div;
}

function verifyUser(username, password) {
   const errors = [];
   if (username.length < 3) errors.push('Username must be greater than 2 characters');
   if (password.length < 3) errors.push('Password must be greater than 2 characters');
   if (userExist(username) && !verifyPassword({ username, password })) errors.push('Wrong password');

   return errors;
}

function printErrors(errors = [], div) {
   const fragment = document.createDocumentFragment();
   div.innerHTML = '';

   errors.forEach(error => {
      const p = document.createElement('p');
      p.innerText = error;
      fragment.appendChild(p);
   });

   showElement(div);
   // div.classList.add('is-show');
   div.appendChild(fragment);

   setTimeout(() => {
      hideElement(div);
      // div.classList.remove('is-show');
      div.innerHTML = '';
   }, 2500 * errors.length);
}