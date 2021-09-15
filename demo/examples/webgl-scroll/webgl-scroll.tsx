import React from "react";
import { Box, Wrapper, ProgressBar } from "./styles";
import ScrollRig, { State } from "../../../lib";
import Scene from "./scene";

export default function WebglScroll() {
  const [scrollState, setScrollState] = React.useState<State | null>(null);

  const progressBarRef = React.useRef<HTMLDivElement>();
  const boxRefs = React.useRef<HTMLDivElement[]>([]);

  const onScrollUpdate = React.useCallback((state: State) => {
    setScrollState(state);

    progressBarRef.current.style.width = `${100 * state.progress.y}%`;

    const height = window.innerHeight;
    let i = 0;
    for (const box of boxRefs.current) {
      const { top } = box.getBoundingClientRect();
      box.style.color = `hsl(${360 * i * state.progress.y}, 50%, 50%)`;
      if (top >= 0 && top <= height) {
        const t = 1 - (1 / height) * top;
        const progress = (t + 0.5) / 2;
        box.style.transform = `translate(-${progress * 45}%, 0%)`;
      }
      i++;
    }
  }, []);

  return (
    <Wrapper>
      <ProgressBar ref={progressBarRef} />
      <ScrollRig onScrollUpdate={onScrollUpdate}>
        <Box ref={(ref) => (boxRefs.current[0] = ref)}>
          <h2>Welcome</h2>
        </Box>
        <Box ref={(ref) => (boxRefs.current[1] = ref)}>
          <h2>This is a Shoe</h2>
        </Box>
        <Box ref={(ref) => (boxRefs.current[2] = ref)}>
          <h2>Here's the Back</h2>
        </Box>
        <Box ref={(ref) => (boxRefs.current[3] = ref)}>
          <h2>And here's the font</h2>
        </Box>
      </ScrollRig>
      <Scene scrollState={scrollState} />
    </Wrapper>
  );
}
