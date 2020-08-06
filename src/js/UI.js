import { User } from './User';

function logIn(user) {
   const userDB = JSON.parse(localStorage.getItem(user.username));
   sessionStorage.setItem('omdbSession', JSON.stringify(userDB));
}

function logOut() {
   sessionStorage.removeItem('omdbSession');
}

function verifyPassword(user) {
   const userDB = JSON.parse(localStorage.getItem(user.username));
   return userDB.password === user.password;
}

function userExist(username) {
   const userDB = JSON.parse(localStorage.getItem(username));
   return userDB? true:false;
}

function registerUser(user) {
   const newUser = new User(user.username, user.password, []);
   localStorage.setItem(user.username, JSON.stringify(newUser));

   logIn(user);
}

function getUser() {
   return JSON.parse(sessionStorage.getItem('omdbSession'));
}

function hideElement(element) {
   element.classList.add('is-hide');
}

function showElement(element) {
   element.classList.remove('is-hide');
}

function getMovieTemplate(user, movie) {
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

function getMovieModalTemplate(movie) {
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

function getModal(movie) {
   const modal = document.createElement('div');
   modal.classList = 'movie-modal';

   document.body.classList.add('no-scroll');
   modal.innerHTML = getMovieModalTemplate(movie);
   modal.querySelector('.movie-modal__close').addEventListener('click', () => {
      document.body.removeChild(modal);
      document.body.classList.remove('no-scroll');
   });
   
   return modal;
}

function getMovieDiv(user, movie) {
   const movieDiv = document.createElement('div');
   movieDiv.className = 'movie';
   movieDiv.innerHTML = getMovieTemplate(user, movie);

   movieDiv.querySelector('.movie__add-favorite').addEventListener('click', () => {
      addFavorite(user, movie, movieDiv);
      
      sessionStorage.setItem('omdbSession', JSON.stringify(user));
      localStorage.setItem(user.username, JSON.stringify(user));
   });

   return movieDiv;
}

function addFavorite(user, movie, movieDiv) {
   const exist = user.favorites.findIndex((favorite) => favorite.Title === movie.Title);

   if(exist >= 0) {
      movieDiv.querySelector('.favorite-icon').textContent = 'star_border';
      user.favorites.splice(exist, 1);
   } else {
      user.favorites.push(movie);
      movieDiv.querySelector('.favorite-icon').textContent = 'star';
   }
}

function printMovie(movie, user) {
   const movieDiv = getMovieDiv(user, movie);

   movieDiv.querySelector('.movie__read-more').addEventListener('click', () => {
      document.body.appendChild(getModal(movie));
   });

   return movieDiv;
}


export {
   logIn,
   logOut,
   verifyPassword,
   userExist,
   registerUser,
   getUser,
   hideElement,
   showElement,
   printMovie
};