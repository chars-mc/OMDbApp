import view from '../views/home.html';

const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=';
const KEY = 'cea5004f';

let movies = [];

export default async () => {
   const div = document.createElement('div');
   div.innerHTML += view;
   
   movies = await getMovies();
   console.log(movies)
   
   return div;
};

async function getMovies(search = 'robot') {
   const data = await fetch(`${URL}${KEY}&s=${search}`);
   const dataJSON = await data.json();

   return dataJSON;
}
