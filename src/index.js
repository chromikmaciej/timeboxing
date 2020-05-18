import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import "./styles/main.scss";

import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { oldReducer } from "./reduceres";

import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(oldReducer , composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById("root")
);