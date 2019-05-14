import { Router } from '@vaadin/router';


export class HashRouter extends Router {
  __updateBrowserHistory(pathname, replace) {
    if (window.location.hash.substring(1) !== pathname) {
      window.location.hash = '#' + pathname;
    }
  }
}

function globalHashChangeHandler(event) {
  const pathname = event.newURL && event.newURL.indexOf('#') > -1
    ? event.newURL.substring(event.newURL.indexOf('#') + 1)
    : '/';
    HashRouter.go(pathname);
}

const HASHCHANGE = {
  activate() {
    window.addEventListener('hashchange', globalHashChangeHandler, false);
  },

  inactivate() {
    window.removeEventListener('hashchange', globalHashChangeHandler, false);
  },
};

const HASHPOPSTATE = {
  activate() {
    window.addEventListener('popstate', globalHashChangeHandler);
  },

  inactivate() {
    window.removeEventListener('popstate', globalHashChangeHandler);
  },
};

Router.NavigationTrigger = [HASHCHANGE, HASHPOPSTATE];
