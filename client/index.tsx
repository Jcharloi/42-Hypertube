import 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

const render = (Component): Node => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  );
};

render(App);
