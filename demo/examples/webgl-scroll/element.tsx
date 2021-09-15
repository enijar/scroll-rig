import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import shoe from "./shoe.glb";
import { State } from "../../../lib";
import { deg2rad } from "./utils";

type Props = {
  scrollState: State;
};

export default function Element({ scrollState }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);

  const gltf = useGLTF(shoe);

  useFrame(({ clock }) => {
    if (groupRef.current === null) return;
    if (!scrollState) return;
    groupRef.current.rotation.y = deg2rad(360 * -scrollState.progress.y - 90);
    groupRef.current.rotation.x =
      deg2rad(Math.cos(clock.getElapsedTime()) * -5) + deg2rad(45);
    groupRef.current.rotation.z = deg2rad(
      Math.sin(clock.getElapsedTime()) * 20
    );
  });

  return (
    <group scale={10} ref={groupRef}>
      {/* @ts-ignore */}
      <primitive object={gltf.scene} />
    </group>
  );
}
