import styled from "styled-components";

export const CustomScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .canvas {
    pointer-events: none;
    position: absolute !important;
    inset: 0;
  }
`;
