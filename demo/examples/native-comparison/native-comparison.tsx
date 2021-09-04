import React from "react";
import { Wrapper, Box } from "./styles";
import Scroll from "../../../lib";

export default function NativeComparison() {
  return (
    <Wrapper>
      <Scroll style={{ margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Custom Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
      <Scroll native style={{ margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Native Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
    </Wrapper>
  );
}
