import React from "react";
import { render } from "react-dom";
import Reset from "./styles/reset";
import NativeComparison from "./examples/native-comparison/native-comparison";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

render(
  <React.StrictMode>
    <Reset />
    <NativeComparison />
  </React.StrictMode>,
  root
);
