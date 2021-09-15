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
`;

export const Box = styled.div`
  height: 100vh;
  color: #fefefe;
  margin-bottom: 1em;
  margin-left: auto;
  margin-right: auto;

  :last-child {
    margin-bottom: 0;
  }
`;

export const SceneWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5em;
  background-color: #666;
`;
