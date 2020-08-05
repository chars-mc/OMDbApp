const root = document.getElementById('root');
import { Pages } from '../controller/index';
import { getUser } from '../js/UI';

const Router = async (route) => {
   root.innerHTML = '';

   if(!getUser()) location.hash = '#/login';

   switch(route) {
      case '#/': return root.appendChild(await Pages.home());
      case '#/favorites': return root.appendChild(Pages.favorites());
      case '#/login': return root.appendChild(Pages.login());
      default: return root.appendChild(Pages.notFound());
   }
}

export { Router };