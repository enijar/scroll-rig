import React from "react";
import {
  ScrollBar,
  ScrollBarHandle,
  ScrollBars,
  ScrollPlane,
  ScrollWrapper,
} from "./styles";
import { Props, State, Touch } from "./types";
import { clamp } from "./utils";
import useKeyEvents from "./hooks/use-key-events";
import useTouchEvents from "./hooks/use-touch-events";
import useFocusEvents from "./hooks/use-focus-events";
import useMouseEvents from "./hooks/use-mouse-events";
import useWheelEvents from "./hooks/use-wheel-events";

type OnScroll = (state: State) => void;

export type ScrollApi = {
  update: () => void;
  onScroll: (fn: OnScroll) => void;
  state: State;
};

const DEFAULT_STYLE = {};

function Scroll(
  {
    children,
    native = false,
    scrollBarSize = "15px",
    style = DEFAULT_STYLE,
    controlled = false,
  }: Props,
  ref: React.ForwardedRef<ScrollApi>
) {
  const touchRef = React.useRef<Touch>({
    down: false,
    lastX: 0,
    lastY: 0,
    currentX: 0,
    currentY: 0,
  });

  const stateRef = React.useRef<State>({
    maxScroll: {
      x: 0,
      y: 0,
    },
    wrapperSize: {
      width: 0,
      height: 0,
    },
    progress: {
      x: 0,
      y: 0,
    },
    isScrolling: false,
  });

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const planeRef = React.useRef<HTMLDivElement>(null);
  const scrollBarsRef = React.useRef<HTMLDivElement>(null);
  const scrollBarXRef = React.useRef<HTMLDivElement>(null);
  const scrollBarYRef = React.useRef<HTMLDivElement>(null);
  const scrollBarHandleXRef = React.useRef<HTMLDivElement>(null);
  const scrollBarHandleYRef = React.useRef<HTMLDivElement>(null);

  const update = React.useCallback(
    (force: boolean = false) => {
      const wrapper = wrapperRef.current;
      const plane = planeRef.current;
      const scrollBarX = scrollBarXRef.current;
      const scrollBarY = scrollBarYRef.current;
      const scrollBarHandleX = scrollBarHandleXRef.current;
      const scrollBarHandleY = scrollBarHandleYRef.current;

      if (native) return;
      if (plane === null) return;
      if (scrollBarX === null) return;
      if (scrollBarY === null) return;

      wrapper.scrollTop = 0;
      wrapper.scrollLeft = 0;
      stateRef.current.wrapperSize.width = wrapper.offsetWidth;
      stateRef.current.wrapperSize.height = wrapper.offsetHeight;
      stateRef.current.maxScroll.x = Math.max(
        0,
        plane.offsetWidth - wrapper.offsetWidth
      );
      stateRef.current.maxScroll.y = Math.max(
        0,
        plane.offsetHeight - wrapper.offsetHeight
      );
      scrollBarX.style.display =
        stateRef.current.maxScroll.x === 0 ? "none" : "flex";
      scrollBarY.style.display =
        stateRef.current.maxScroll.y === 0 ? "none" : "flex";

      if (stateRef.current.maxScroll.x > 0) {
        scrollBarHandleX.style.left = `${stateRef.current.progress.x * 100}%`;
        scrollBarHandleX.style.transform = `translateX(${
          stateRef.current.progress.x * -100
        }%)`;
        scrollBarHandleX.style.width = `${
          (wrapper.offsetWidth /
            (stateRef.current.maxScroll.x + wrapper.offsetWidth)) *
          100
        }%`;
      }

      if (stateRef.current.maxScroll.y > 0) {
        scrollBarHandleY.style.top = `${stateRef.current.progress.y * 100}%`;
        scrollBarHandleY.style.transform = `translateY(${
          stateRef.current.progress.y * -100
        }%)`;
        scrollBarHandleY.style.height = `${
          (wrapper.offsetHeight /
            (stateRef.current.maxScroll.y + wrapper.offsetHeight)) *
          100
        }%`;
      }

      plane.style.paddingTop =
        stateRef.current.maxScroll.x === 0 ? "0px" : scrollBarSize;
      scrollBarX.style.transform =
        stateRef.current.maxScroll.x === 0
          ? "none"
          : `translateY(-${scrollBarSize})`;

      scrollBarX.style.paddingRight =
        stateRef.current.maxScroll.y === 0 ? "0px" : scrollBarSize;
      scrollBarY.style.paddingBottom =
        stateRef.current.maxScroll.x === 0
          ? `calc(${scrollBarSize} / 4)`
          : scrollBarSize;

      plane.style.paddingLeft =
        stateRef.current.maxScroll.x === 0 ? "0px" : scrollBarSize;
      plane.style.paddingBottom =
        stateRef.current.maxScroll.x > 0 ? "0px" : scrollBarSize;

      const offsetX =
        stateRef.current.wrapperSize.width * stateRef.current.progress.x;
      const offsetY =
        stateRef.current.wrapperSize.height * stateRef.current.progress.y;
      const scrollOffsetX =
        stateRef.current.maxScroll.y > 0 ? scrollBarSize : "0px";
      const scrollOffsetY =
        stateRef.current.maxScroll.x > 0 ? scrollBarSize : "0px";
      const translate = {
        x:
          stateRef.current.maxScroll.x === 0
            ? "0px"
            : `(${stateRef.current.progress.x} * -100%) + ${offsetX}px - ${scrollOffsetX}`,
        y:
          stateRef.current.maxScroll.y === 0
            ? "0px"
            : `(${stateRef.current.progress.y} * -100%) + ${offsetY}px - ${scrollOffsetY}`,
      };
      plane.style.transform = `translate3d(calc(${translate.x}), calc(${translate.y}), 0px)`;

      if (onScrollRef.current !== null) {
        if (force || stateRef.current.isScrolling) {
          onScrollRef.current(stateRef.current);
        }
      }

      stateRef.current.isScrolling = false;
    },
    [controlled, native]
  );

  const updateProgress = React.useCallback(
    (dirX: number, dirY: number, distX: number, distY: number) => {
      const state = stateRef.current;
      const maxX = state.maxScroll.x;
      const maxY = state.maxScroll.y;
      const velocityX = dirX === 0 ? 0 : (1 / maxX) * distX * dirX;
      const velocityY = dirY === 0 ? 0 : (1 / maxY) * distY * dirY;
      state.progress.x = clamp(state.progress.x + velocityX, 0, 1);
      state.progress.y = clamp(state.progress.y + velocityY, 0, 1);
      update();
    },
    []
  );

  const onScrollRef = React.useRef<OnScroll | null>(null);

  const onScroll = React.useCallback((onScroll: OnScroll) => {
    onScrollRef.current = onScroll;
  }, []);

  React.useEffect(() => {
    if (ref === null) return;
    (ref as React.MutableRefObject<ScrollApi>).current = {
      update,
      onScroll,
      state: stateRef.current,
    };
  }, [ref, update, onScroll]);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!native) return;
    wrapper.scrollLeft =
      (wrapper.scrollWidth - wrapper.offsetWidth) * stateRef.current.progress.x;
    wrapper.scrollTop =
      (wrapper.scrollHeight - wrapper.offsetHeight) *
      stateRef.current.progress.y;
    update(true);
  }, [native, update]);

  React.useEffect(() => {
    if (controlled) return;

    let nextFrame: number;
    (function tick() {
      nextFrame = requestAnimationFrame(tick);
      update();
    })();

    return () => cancelAnimationFrame(nextFrame);
  }, [native, controlled, update]);

  useWheelEvents(stateRef, wrapperRef, planeRef, native, updateProgress);
  useTouchEvents(stateRef, wrapperRef, planeRef, touchRef, updateProgress);
  useKeyEvents(stateRef, update);
  useFocusEvents(stateRef, wrapperRef, planeRef, update);
  useMouseEvents(
    stateRef,
    wrapperRef,
    scrollBarHandleXRef,
    scrollBarHandleYRef,
    update
  );

  return (
    <ScrollWrapper
      ref={wrapperRef}
      style={{ overflow: native ? "auto" : "hidden" }}
    >
      <ScrollPlane
        ref={planeRef}
        style={{ ...style, transform: native ? "none" : undefined }}
      >
        {children}
      </ScrollPlane>
      <ScrollBars
        ref={scrollBarsRef}
        size={scrollBarSize}
        style={{ display: native ? "none" : "block" }}
      >
        <ScrollBar axis="y" size={scrollBarSize} ref={scrollBarYRef}>
          <ScrollBarHandle ref={scrollBarHandleYRef} />
        </ScrollBar>
        <ScrollBar axis="x" size={scrollBarSize} ref={scrollBarXRef}>
          <ScrollBarHandle ref={scrollBarHandleXRef} />
        </ScrollBar>
      </ScrollBars>
    </ScrollWrapper>
  );
}

export default React.forwardRef(Scroll);
