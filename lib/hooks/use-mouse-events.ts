import React from "react";
import { clamp } from "../utils";
import { State, Touch } from "../types";

export default function useMouseEvents(
  stateRef: React.MutableRefObject<State>,
  wrapperRef: React.MutableRefObject<HTMLDivElement>,
  scrollBarHandleXRef: React.MutableRefObject<HTMLDivElement>,
  scrollBarHandleYRef: React.MutableRefObject<HTMLDivElement>,
  update: Function
) {
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
      offsetX = Math.abs(startX - scrollBarHandleXRef.current.offsetLeft);
      offsetY = Math.abs(startY - scrollBarHandleYRef.current.offsetTop);
    }

    function onMouseMove(event: MouseEvent) {
      if (!dragging) return;

      const x = event.pageX - wrapperRef.current.offsetLeft - offsetX;
      const y = event.pageY - wrapperRef.current.offsetTop - offsetY;

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
      stateRef.current.isScrolling = true;
      update();
    }

    function onMouseUp() {
      dragging = false;
    }

    scrollBarHandleXRef.current.addEventListener("mousedown", onMouseDown);
    scrollBarHandleYRef.current.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, [update]);
}
