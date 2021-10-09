import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AuthContextProvider>
  </CookiesProvider>,
  document.getElementById("root")
);
