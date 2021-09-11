import React from "react";
import { Box, Wrapper } from "./styles";
import Scroll from "../../../lib";

export default function NativeComparison() {
  return (
    <Wrapper>
      <Scroll onScrollUpdate={(state) => console.log(state.progress.y)}>
        <h2>
          Custom Scroll 👇 <br />
          <small>(Open Console for Logs)</small>
        </h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
      <Scroll native className="scroll">
        <h2>Native Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
    </Wrapper>
  );
}
