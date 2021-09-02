import styled from "styled-components";

export const Box = styled.div`
  height: 50vh;
  aspect-ratio: 1 / 1;
  background-color: crimson;
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
