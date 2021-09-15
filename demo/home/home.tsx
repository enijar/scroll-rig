import React from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "./styles";

export default function Home() {
  return (
    <Wrapper>
      <h1>Examples</h1>
      <ol>
        <li>
          <Link to="/examples/native-comparison">Native Comparison</Link>
        </li>
        <li>
          <Link to="/examples/scroll-trigger">Scroll Trigger</Link>
        </li>
        <li>
          <Link to="/examples/custom-scroll">Custom Scroll</Link>
        </li>
      </ol>
    </Wrapper>
  );
}
