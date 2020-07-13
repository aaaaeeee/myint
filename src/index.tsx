import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import * as serviceWorker from "./serviceWorker";
import store, { rrfProps } from "./store/store";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import { GlobalStyles, theme } from "./styles/index";

const render = () => {
  const App = require("./app/App").default;
  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
          </ThemeProvider>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
