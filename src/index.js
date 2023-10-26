import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./store/store";
import "./styles/index.css";


createRoot(document.getElementById("root"))
    .render(
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>);