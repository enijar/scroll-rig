import React from "react";
import { State, Touch } from "../types";

export default function useTouchEvents(
  stateRef: React.MutableRefObject<State>,
  wrapperRef: React.MutableRefObject<HTMLDivElement>,
  planeRef: React.MutableRefObject<HTMLDivElement>,
  touchRef: React.MutableRefObject<Touch>,
  updateProgress: Function
) {
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
      stateRef.current.isScrolling = true;
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
  }, [updateProgress]);
}
