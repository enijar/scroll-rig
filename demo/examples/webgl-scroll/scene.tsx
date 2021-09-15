import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { SceneWrapper } from "./styles";
import Manager from "./manager";
import Element from "./element";
import { State } from "../../../lib";

type Props = {
  scrollState: State;
};

export default function Scene({ scrollState }: Props) {
  return (
    <SceneWrapper>
      <Canvas>
        <Manager />
        <Element scrollState={scrollState} />
        <ambientLight />
        <PerspectiveCamera />
      </Canvas>
    </SceneWrapper>
  );
}
