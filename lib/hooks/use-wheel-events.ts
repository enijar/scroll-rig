import React from "react";
import { State } from "../types";

export default function useWheelEvents(
  stateRef: React.MutableRefObject<State>,
  wrapperRef: React.MutableRefObject<HTMLDivElement>,
  planeRef: React.MutableRefObject<HTMLDivElement>,
  native: boolean,
  updateProgress: Function
) {
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
        stateRef.current.isScrolling = true;
        updateProgress(dirX, dirY, distX, distY);
      }
    }

    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [native, updateProgress]);
}
