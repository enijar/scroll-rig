import styled, { css } from "styled-components";

export const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ScrollPlane = styled.div`
  will-change: transform;
  min-width: max-content;
  min-height: 100%;
`;

type ScrollBarsProps = {
  size: string;
};

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
        padding-left: calc(${size} / 4);
        padding-right: calc(${size} / 4);

        ${ScrollBarHandle} {
          min-height: calc(100% - (${size} / 2));
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
      padding-top: calc(${size} / 4);
      padding-bottom: calc(${size} / 4);

      ${ScrollBarHandle} {
        width: calc(100% - (${size} / 2));
        height: 0;
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }}
`;

export const ScrollBars = styled.div<ScrollBarsProps>`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
