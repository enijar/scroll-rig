import React from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { toWorld } from "./utils";
import { useSore } from "./store";
import { Element } from "./custom-scroll";
import Image from "./image/image";

type Props = {
  elements: Element[];
};

export default function Canvas({ elements }: Props) {
  const { size } = useThree();
  const { scrollApi } = useSore();

  const groupRef = React.useRef<THREE.Group>(null);
  React.useEffect(() => {
    scrollApi.onScroll((state) => {
      if (groupRef.current === null) return;
      const scrollY = state.progress.y * state.maxScroll.y;
      const [x, y, z] = toWorld(size, { ...size, x: 0, y: -scrollY });
      groupRef.current.position.set(x, y, z);
    });
  }, [size]);

  useFrame(({ clock }) => {
    scrollApi?.update();
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => {
        return <Image key={index} element={element} />;
      })}
    </group>
  );
}
