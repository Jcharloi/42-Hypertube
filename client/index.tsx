import 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

const render = (Component): void => {
  ReactDOM.render(
    <Component />, document.getElementById('root'),
  );
};

render(App);
