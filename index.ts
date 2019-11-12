import { pathToRegexp } from 'path-to-regexp';

export type RouterCallback = () => HTMLElement | null | undefined;

interface Route {
  pattern: RegExp;
  callback: RouterCallback;
}

export interface Router {
  route(path: string, callback: RouterCallback): Router;
  install(container: HTMLElement): Router;
  uninstall(): void;
}

const createRouter = (): Router => {
  const dispatch = (
    callback: RouterCallback,
    container: HTMLElement,
    match: string[],
  ) => {
    const content = callback.call(null, ...match.slice(match.length - 1));

    container.innerHTML = '';
    if (content != null) {
      container.appendChild(content);
    }
  };
  const routes: Route[] = [];
  let defaultRoute: RouterCallback | undefined;
  let eventHandler: () => void | undefined;

  return {
    route(path: string, callback: RouterCallback): Router {
      if (path === '*') {
        defaultRoute = callback;
      } else {
        routes.push({
          pattern: pathToRegexp(path),
          callback,
        });
      }

      return this;
    },

    install(container: HTMLElement): Router {
      eventHandler = () => {
        const path = window.location.hash.slice(1).toLowerCase() || '';

        for (let i = 0; i < routes.length; ++i) {
          const match = routes[i].pattern.exec(path);

          if (match != null) {
            dispatch(routes[i].callback, container, match);
            return;
          }
        }

        if (defaultRoute) {
          dispatch(defaultRoute, container, []);
        }
      };

      window.addEventListener('hashchange', eventHandler);
      eventHandler();

      return this;
    },

    uninstall(): void {
      if (eventHandler) {
        window.removeEventListener('hashchange', eventHandler);
        eventHandler = undefined;
      }
    },
  };
};

export default createRouter;
