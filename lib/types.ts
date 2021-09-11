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

export type Props = {
  children?: any;
  native?: boolean;
  scrollBarSize?: string;
  style?: object;
  controlled?: boolean;
  onScroll?: (state: State) => void;
};
