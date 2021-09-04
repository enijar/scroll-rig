import styled, { css } from "styled-components";

export const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ScrollPlane = styled.div`
  will-change: transform;
  width: min-content;
  height: min-content;
`;

type ScrollBarsProps = {
  size: string;
};

export const ScrollBars = styled.div<ScrollBarsProps>`
  position: absolute;
  pointer-events: none;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ScrollBarHandle = styled.div`
  will-change: transform;
  background-color: #c7c7c7;
  position: relative;
  min-height: 2em;
  border-radius: 2em;
`;

type ScrollBarProps = {
  axis: "x" | "y";
  size: string;
};

export const ScrollBar = styled.div<ScrollBarProps>`
  pointer-events: all;
  background-color: #fafafa;

  :hover {
    ${ScrollBarHandle} {
      background-color: #878787;
    }
  }

  ${({ axis, size }) => {
    if (axis === "x") {
      return css`
        width: 100%;
        height: ${size};
        margin-top: auto;
        padding-left: 0.175em;
        padding-right: 0.175em;

        ${ScrollBarHandle} {
          min-height: calc(100% - 0.35em);
          width: 0;
          margin-top: auto;
          margin-bottom: auto;
        }
      `;
    }
    return css`
      height: 100%;
      width: ${size};
      margin-left: auto;
      padding-top: 0.175em;
      padding-bottom: 0.175em;

      ${ScrollBarHandle} {
        width: calc(100% - 0.35em);
        height: 0;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }}
`;
