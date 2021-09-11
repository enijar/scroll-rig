import React from "react";
import { clamp } from "../utils";
import { State } from "../types";

export default function useFocusEvents(
  stateRef: React.MutableRefObject<State>,
  wrapperRef: React.MutableRefObject<HTMLDivElement>,
  planeRef: React.MutableRefObject<HTMLDivElement>,
  update: Function
) {
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

      update();
    }

    window.addEventListener("focus", onFocus, { capture: true });
    return () => {
      window.removeEventListener("focus", onFocus, { capture: true });
    };
  }, [update]);
}
