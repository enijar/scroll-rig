import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;

  h2 {
    text-align: center;
  }

  img {
    display: block;
    width: auto;
    height: 50vh;
    aspect-ratio: 1 / 1;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
  }

  .element {
    opacity: 0;
  }
`;
