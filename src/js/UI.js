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

export function getMovieTemplate(movie) {
   const user = getUser();
   const exist = user.favorites.findIndex((favorite) => favorite.Title === movie.Title);

   return `
      <img src="${movie.Poster}" alt="${movie.Title}" class="movie__poster">
      <div class="movie__details">
         <h4 class="movie__title">${movie.Title}</h4>
         <div class="movie__actions">
            <button class="movie__read-more">READ MORE
               <i class="material-icons">arrow_right</i>
            </button>
            <button class="movie__add-favorite button">
               <i class="material-icons favorite-icon">${exist >= 0? 'star':'star_border'}</i>
            </button>
         </div>
      </div>`;
}

export function getMovieModalTemplate(movie) {
   return `
      <img class="movie-modal__poster" src="${movie.Poster}">
      <h3 class="movie-modal__title">${movie.Title}</h3>

      <div class="movie-modal__details">
         <p class="movie-modal__type"><b>Type: </b> ${movie.Type}</p>
         <p class="movie-modal__year"><b>Year: </b> ${movie.Year}</p>
         <p class="movie-modal__imdbid"><b>imdbID: </b> ${movie.imdbID}</p>
      </div>
      <button class="movie-modal__close button"><i class="material-icons">close<i></button>`;
}

export function printModalMovie(div) {

}