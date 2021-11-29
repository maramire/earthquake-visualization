import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MapContextProvider } from "./store/map-context";
ReactDOM.render(
  <MapContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MapContextProvider>,
  document.getElementById("root")
);
