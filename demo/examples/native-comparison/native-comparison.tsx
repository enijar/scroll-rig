import React from "react";
import { Box, Wrapper } from "./styles";
import ScrollRig from "../../../lib";

export default function NativeComparison() {
  return (
    <Wrapper>
      <ScrollRig onScrollUpdate={(state) => console.log(state.progress.y)}>
        <h2>
          Custom Scroll 👇 <br />
          <small>(Open Console for Logs)</small>
        </h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </ScrollRig>
      <ScrollRig native className="scroll">
        <h2>Native Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </ScrollRig>
    </Wrapper>
  );
}
