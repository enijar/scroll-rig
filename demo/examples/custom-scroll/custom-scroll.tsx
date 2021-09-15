import React from "react";
import { Box, Wrapper } from "./styles";
import ScrollRig from "../../../lib";

export default function CustomScroll() {
  return (
    <Wrapper>
      <ScrollRig scrollBarSize="2em">
        <h2>Custom Scroll 👉</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </ScrollRig>
    </Wrapper>
  );
}
