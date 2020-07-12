import Home from './home.controller';
import Favorites from './favorites.controller';
import Movie from './movie.controller';
import Login from './login.controller';
import NotFound from './404.controller';

const Pages = {
   home: Home,
   favorites: Favorites,
   movie: Movie,
   login: Login,
   notFound: NotFound,
}

export { Pages };