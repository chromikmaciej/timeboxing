import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import "./styles/main.scss";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { timeboxesReducer } from "./reduceres";


const store = createStore(timeboxesReducer);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById("root")
);