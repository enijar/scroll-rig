import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;

  h2 {
    text-align: center;
    line-height: 1em;

    small {
      font-size: 0.6em;
    }
  }

  .scroll-rig-scroll-bar {
    background-color: #333;
  }

  .scroll-rig-scroll-bar-handle {
    background-color: #ccc;
  }
`;

export const Box = styled.div`
  height: 50vh;
  aspect-ratio: 1 / 1;
  background-color: hsl(0, 50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;

  :last-child {
    margin-bottom: 0;
  }
`;
