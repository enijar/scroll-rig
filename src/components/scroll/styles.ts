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
  background-color: #999999;
  position: relative;
  min-height: 2em;
`;

type ScrollBarProps = {
  axis: "x" | "y";
  size: string;
};

export const ScrollBar = styled.div<ScrollBarProps>`
  pointer-events: all;
  background-color: #cccccc;

  ${({ axis, size }) => {
    if (axis === "x") {
      return css`
        width: 100%;
        height: ${size};
        margin-top: auto;

        ${ScrollBarHandle} {
          height: 100%;
          width: 0;
        }
      `;
    }
    return css`
      height: 100%;
      width: ${size};
      margin-left: auto;

      ${ScrollBarHandle} {
        width: 100%;
        height: 0;
      }
    `;
  }}
`;
