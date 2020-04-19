import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/App";

import thunk from "redux-thunk";

import { ModalProvider } from "react-modal-hook";
import Reducer from "./reducers";

const store = createStore(Reducer, applyMiddleware(thunk));
console.log("Store", store.getState());

render(
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>,
  document.getElementById("root")
);
