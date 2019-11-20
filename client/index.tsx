import "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./components/App";

const render = (): void => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();
