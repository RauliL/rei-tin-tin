# Rei Tin Tin

Rei Tin Tin is a minimalistic router for single-page applications which uses
fragment portion of the URL to display content.

## Usage

Quick usage example below. See file `example.html` for more detailed one.

```JavaScript
import ReiTinTin from 'reitintin';

const renderHomePage = () => {
  const element = document.createElement('div');

  ...

  return element;
};

const renderAboutPage = () => {
  const element = document.createElement('div');

  ...

  return element;
};

ReiTinTin()
  .route('', renderHomePage)
  .route('about', renderAboutPage)
  .install(document.querySelector('#root'));
```

### ReiTinTin()

Constructs and returns a new router configuration.

### route( path, callback )

Registers new route which uses given callback function to render contents for
that path. [path-to-regexp] is used for path matching (same as is used in
[Express.js]) and any path parameters are passed to the callback function as
arguments.

Any [HTMLElement] returned by the callback function will be used as contents
to be displayed, when user navigates to the path. If the callback function
returns either `null` or `undefined`, the container element will be just
cleared and no content will be displayed.

If asterisk (`*`) is given as path, the route will be treated as fallback route
which will be used if user navigates to a path that doesn't otherwise exist.

### install( container )

Installs the router so that it listens for URL hash changes and renders
contents to given container element.

### uninstall()

Removes the URL hash listener so that the router will no longer be used.

[path-to-regexp]: https://github.com/pillarjs/path-to-regexp
[Express.js]: https://expressjs.com/
[HTMLElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
