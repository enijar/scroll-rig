import React from "react";
import { Box } from "./styles";
import Scroll from "../scroll/scroll";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Scroll style={{ margin: "auto" }}>
        <h2>Custom Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
      <Scroll native style={{ margin: "auto" }}>
        <h2>Native Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
    </div>
  );
}
