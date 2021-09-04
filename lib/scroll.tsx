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

const DEFAULT_STYLE = {};

export default function Scroll({
  children,
  native = false,
  scrollBarSize = "15px",
  style = DEFAULT_STYLE,
}: Props) {
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
  });

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const planeRef = React.useRef<HTMLDivElement>(null);
  const scrollBarsRef = React.useRef<HTMLDivElement>(null);
  const scrollBarXRef = React.useRef<HTMLDivElement>(null);
  const scrollBarYRef = React.useRef<HTMLDivElement>(null);
  const scrollBarHandleXRef = React.useRef<HTMLDivElement>(null);
  const scrollBarHandleYRef = React.useRef<HTMLDivElement>(null);

  // Update state
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const plane = planeRef.current;
    const scrollBarX = scrollBarXRef.current;
    const scrollBarY = scrollBarYRef.current;
    const scrollBarHandleX = scrollBarHandleXRef.current;
    const scrollBarHandleY = scrollBarHandleYRef.current;
    const state = stateRef.current;

    if (native) {
      wrapper.scrollLeft =
        (wrapper.scrollWidth - wrapper.offsetWidth) * state.progress.x;
      wrapper.scrollTop =
        (wrapper.scrollHeight - wrapper.offsetHeight) * state.progress.y;
    }

    let nextFrame: number;
    (function tick() {
      nextFrame = requestAnimationFrame(tick);
      if (native) return;
      if (plane === null) return;
      if (scrollBarX === null) return;
      if (scrollBarY === null) return;
      state.wrapperSize.width = wrapper.offsetWidth;
      state.wrapperSize.height = wrapper.offsetHeight;
      state.maxScroll.x = Math.max(0, plane.offsetWidth - wrapper.offsetWidth);
      state.maxScroll.y = Math.max(
        0,
        plane.offsetHeight - wrapper.offsetHeight
      );
      scrollBarX.style.display = state.maxScroll.x === 0 ? "none" : "flex";
      scrollBarY.style.display = state.maxScroll.y === 0 ? "none" : "flex";

      if (state.maxScroll.x > 0) {
        scrollBarHandleX.style.left = `${state.progress.x * 100}%`;
        scrollBarHandleX.style.transform = `translateX(${
          state.progress.x * -100
        }%)`;
        scrollBarHandleX.style.width = `${
          (wrapper.offsetWidth / (state.maxScroll.x + wrapper.offsetWidth)) *
          100
        }%`;
      }

      if (state.maxScroll.y > 0) {
        scrollBarHandleY.style.top = `${state.progress.y * 100}%`;
        scrollBarHandleY.style.transform = `translateY(${
          state.progress.y * -100
        }%)`;
        scrollBarHandleY.style.height = `${
          (wrapper.offsetHeight / (state.maxScroll.y + wrapper.offsetHeight)) *
          100
        }%`;
      }

      plane.style.paddingTop = state.maxScroll.x === 0 ? "0px" : scrollBarSize;
      scrollBarX.style.transform =
        state.maxScroll.x === 0 ? "none" : `translateY(-${scrollBarSize})`;

      scrollBarX.style.paddingRight =
        state.maxScroll.y === 0 ? "0px" : scrollBarSize;
      scrollBarY.style.paddingBottom =
        state.maxScroll.x === 0 ? "0px" : scrollBarSize;

      const offsetX = state.wrapperSize.width * state.progress.x;
      const offsetY = state.wrapperSize.height * state.progress.y;
      const scrollOffsetX = state.maxScroll.y > 0 ? scrollBarSize : "0px";
      const scrollOffsetY = state.maxScroll.x > 0 ? scrollBarSize : "0px";
      const translate = {
        x:
          state.maxScroll.x === 0
            ? "0px"
            : `(${state.progress.x} * -100%) + ${offsetX}px - ${scrollOffsetX}`,
        y:
          state.maxScroll.y === 0
            ? "0px"
            : `(${state.progress.y} * -100%) + ${offsetY}px - ${scrollOffsetY}`,
      };
      plane.style.transform = `translate3d(calc(${translate.x}), calc(${translate.y}), 0px)`;
    })();

    return () => cancelAnimationFrame(nextFrame);
  }, [native]);

  function updateProgress(
    dirX: number,
    dirY: number,
    distX: number,
    distY: number
  ) {
    const state = stateRef.current;
    const maxX = state.maxScroll.x;
    const maxY = state.maxScroll.y;
    const velocityX = dirX === 0 ? 0 : (1 / maxX) * distX * dirX;
    const velocityY = dirY === 0 ? 0 : (1 / maxY) * distY * dirY;
    state.progress.x = clamp(state.progress.x + velocityX, 0, 1);
    state.progress.y = clamp(state.progress.y + velocityY, 0, 1);
  }

  React.useEffect(() => {
    function onWheel(event: WheelEvent) {
      if (native) return;
      if (planeRef.current === null) return;
      const element = event.target as HTMLElement;
      const dirX = event.deltaX === 0 ? 0 : Math.sign(event.deltaX);
      const dirY = event.deltaY === 0 ? 0 : Math.sign(event.deltaY);
      const distX = Math.abs(event.deltaX);
      const distY = Math.abs(event.deltaY);
      if (
        element === planeRef.current ||
        element === wrapperRef.current ||
        wrapperRef.current.contains(element)
      ) {
        updateProgress(dirX, dirY, distX, distY);
      }
    }

    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [native]);

  React.useEffect(() => {
    function onTouchStart(event: TouchEvent) {
      if (wrapperRef.current === null || planeRef.current === null) return;
      const element = event.target as HTMLElement;
      if (
        element === planeRef.current ||
        element === wrapperRef.current ||
        wrapperRef.current.contains(element)
      ) {
        const { pageX, pageY } = event.touches[0] ?? {};
        touchRef.current.down = true;
        touchRef.current.lastX = pageX;
        touchRef.current.lastY = pageY;
      }
    }

    function onTouchMove(event: TouchEvent) {
      if (!touchRef.current.down) return;
      const touch = touchRef.current;
      const { pageX, pageY } = event.touches[0] ?? {};
      touch.currentX = pageX;
      touch.currentY = pageY;
      const deltaX = touch.lastX - touch.currentX;
      const deltaY = touch.lastY - touch.currentY;
      const dirX = deltaX === 0 ? 0 : Math.sign(deltaX);
      const dirY = deltaY === 0 ? 0 : Math.sign(deltaY);
      const distX = Math.abs(deltaX);
      const distY = Math.abs(deltaY);
      updateProgress(dirX, dirY, distX, distY);
      touch.lastX = pageX;
      touch.lastY = pageY;
    }

    function onTouchEnd() {
      touchRef.current.down = false;
    }

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

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
