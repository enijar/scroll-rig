import React from "react";

export type State = {
  maxScroll: {
    x: number;
    y: number;
  };
  wrapperSize: {
    width: number;
    height: number;
  };
  progress: {
    x: number;
    y: number;
  };
  scroll: {
    x: number;
    y: number;
  };
  isScrolling: boolean;
};

export type Touch = {
  down: boolean;
  lastX: number;
  lastY: number;
  currentX: number;
  currentY: number;
};

export type Props = React.HTMLAttributes<HTMLDivElement> & {
  native?: boolean;
  scrollBarSize?: string;
  style?: object;
  controlled?: boolean;
  onScrollUpdate?: (state: State) => void;
  classNamePrefix?: string;
};

export type OnScroll = (state: State) => void;

export type ScrollApi = {
  update: () => void;
  onScroll: (fn: OnScroll) => void;
  state: State;
};
