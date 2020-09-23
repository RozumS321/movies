import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import movieReducer from "./redux/reducers/";
import App from "./components/App/App";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(movieReducer, compose(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
