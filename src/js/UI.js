import { User } from './User';

export function logIn(user) {
   const userDB = JSON.parse(localStorage.getItem(user.username));
   sessionStorage.setItem('omdbSession', JSON.stringify(userDB));
}

export function verifyPassword(user) {
   const userDB = JSON.parse(localStorage.getItem(user.username));
   return userDB.password === user.password;
}

export function userExist(username) {
   const userDB = JSON.parse(localStorage.getItem(username));
   return userDB? true:false;
}

export function registerUser(user) {
   const newUser = new User(user.username, user.password, []);
   localStorage.setItem(user.username, JSON.stringify(newUser));

   logIn(user);
}

export function getUser() {
   return JSON.parse(sessionStorage.getItem('omdbSession'));
}

export function hideElement(element) {
   element.classList.add('is-hide');
}

export function showElement(element) {
   element.classList.remove('is-hide');
}