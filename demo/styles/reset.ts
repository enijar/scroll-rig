import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`
  :root {
    --font-scale-x: 2vw;
    --font-scale-y: 2vh;
    --font-min: 10px;
    --font-max: 20px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }

  html {
    font-size: clamp(var(--font-min), var(--font-scale-y), var(--font-max));
    font-family: Arial, sans-serif;
    font-weight: normal;
    line-height: 1.2;
    background-color: #1e1e1e;
    color: #fefefe;
  }

  h2 {
    font-size: 2em;
  }

  h1, h2, h3, h4, h5, h6, p {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
`;
