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

    if (native) {
      wrapper.scrollLeft =
        (wrapper.scrollWidth - wrapper.offsetWidth) *
        stateRef.current.progress.x;
      wrapper.scrollTop =
        (wrapper.scrollHeight - wrapper.offsetHeight) *
        stateRef.current.progress.y;
    }

    let nextFrame: number;
    (function tick() {
      nextFrame = requestAnimationFrame(tick);
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

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!event.metaKey) return;
      switch (event.key) {
        case "ArrowRight":
          stateRef.current.progress.x = 1;
          break;
        case "ArrowLeft":
          stateRef.current.progress.x = 0;
          break;
        case "ArrowDown":
          stateRef.current.progress.y = 1;
          break;
        case "ArrowUp":
          stateRef.current.progress.y = 0;
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  React.useEffect(() => {
    function onFocus(event: FocusEvent) {
      const wrapper = wrapperRef.current;
      const plane = planeRef.current;
      if (wrapper === null) return;
      if (plane === null) return;
      const element = event.target as HTMLElement;
      const offsetLeft = Math.max(
        0,
        (element.offsetLeft ?? 0) - wrapper.offsetWidth
      );
      const offsetTop = Math.max(
        0,
        (element.offsetTop ?? 0) - wrapper.offsetHeight
      );
      const maxX = plane.offsetWidth - wrapper.offsetWidth;
      const maxY = plane.offsetHeight - wrapper.offsetHeight;

      if (offsetLeft) {
        stateRef.current.progress.x = clamp(
          (1 / maxX) * (offsetLeft + element.offsetWidth),
          0,
          1
        );
        if (stateRef.current.progress.x >= 0.99) {
          stateRef.current.progress.x = 1;
        }
      }

      if (offsetTop) {
        stateRef.current.progress.y = clamp(
          (1 / maxY) * (offsetTop + element.offsetHeight),
          0,
          1
        );
        if (stateRef.current.progress.y >= 0.99) {
          stateRef.current.progress.y = 1;
        }
      }
    }

    window.addEventListener("focus", onFocus, { capture: true });
    return () => {
      window.removeEventListener("focus", onFocus, { capture: true });
    };
  }, []);

  React.useEffect(() => {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    function onMouseDown(event: MouseEvent) {
      dragging = true;
      startX = event.pageX - wrapperRef.current.offsetLeft;
      startY = event.pageY - wrapperRef.current.offsetTop;
      offsetX = startX - scrollBarHandleXRef.current.offsetLeft;
      offsetY = startY - scrollBarHandleYRef.current.offsetTop;
    }

    function onMouseMove(event: MouseEvent) {
      if (!dragging) return;

      const x = event.pageX - wrapperRef.current.offsetLeft - offsetX;
      const y = event.pageY - wrapperRef.current.offsetTop - offsetY;

      console.log(offsetY);

      const maxX =
        wrapperRef.current.offsetHeight -
        scrollBarHandleXRef.current.offsetWidth;
      const maxY =
        wrapperRef.current.offsetHeight -
        scrollBarHandleYRef.current.offsetHeight;

      const progressX = (1 / maxX) * x;
      const progressY = (1 / maxY) * y;

      stateRef.current.progress.x = clamp(progressX, 0, 1);
      stateRef.current.progress.y = clamp(progressY, 0, 1);
    }

    function onMouseUp() {
      dragging = false;
    }

    scrollBarHandleXRef.current.addEventListener("mousedown", onMouseDown);
    scrollBarHandleYRef.current.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
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
