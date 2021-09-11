import React from "react";
import { State } from "../types";

export default function useKeyEvents(
  stateRef: React.MutableRefObject<State>,
  update: Function
) {
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
      update(true);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [update]);
}
