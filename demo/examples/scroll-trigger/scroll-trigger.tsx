import React from "react";
import { Box, Wrapper } from "./styles";
import ScrollRig, { State } from "../../../lib";

export default function ScrollTrigger() {
  const boxRefs = React.useRef<HTMLElement[]>([]);

  const onScrollUpdate = React.useCallback((state: State) => {
    let i = 0;
    for (const boxRef of boxRefs.current) {
      const { top } = boxRef.getBoundingClientRect();
      const offset = (20 / state.maxScroll.y) * Math.abs(top);
      const hue = (360 / offset) * state.progress.y;
      boxRef.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
      i++;
    }
  }, []);

  return (
    <Wrapper>
      <ScrollRig onScrollUpdate={onScrollUpdate}>
        <h2>Custom Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Box
              key={index}
              ref={(ref) => {
                boxRefs.current[index] = ref;
              }}
            >
              {index}
            </Box>
          );
        })}
      </ScrollRig>
    </Wrapper>
  );
}
