const root = document.getElementById('root');
import { Pages } from '../controller/index';

const Router = (route) => {
   root.innerHTML = '';
   
   switch(route) {
      case '#/': return root.appendChild(Pages.home());
      case '#/favorites': return root.appendChild(Pages.favorites());
      case '#/movie': return root.appendChild(Pages.movie());
      case '#/login': return root.appendChild(Pages.login());
      default: return root.appendChild(Pages.notFound());
   }
}

export { Router };