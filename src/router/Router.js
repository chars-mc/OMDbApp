const root = document.getElementById('root');
import { Pages } from '../controller/index';
import { getUser } from '../js/UI';

const Router = async (route) => {
   root.innerHTML = '';

   if(!getUser()) route = '#/login';

   switch(route) {
      case '#/': return root.appendChild(await Pages.home());
      case '#/favorites': return root.appendChild(Pages.favorites());
      case '#/movie': return root.appendChild(Pages.movie());
      case '#/login': return root.appendChild(Pages.login());
      default: return root.appendChild(Pages.notFound());
   }
}

export { Router };