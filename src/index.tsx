import React from "react";
import { render } from "react-dom";
import Reset from "./styles/reset";
import App from "./components/app/app";

render(
  <React.StrictMode>
    <Reset />
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);
