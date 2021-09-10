import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { toWorld } from "./utils";
import { useSore } from "./store";
import { Element } from "./custom-scroll";

type Props = {
  elements: Element[];
};

export default function Canvas({ elements }: Props) {
  const { size } = useThree();
  const { scrollApi } = useSore();
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    scrollApi.onScroll((state) => {
      setScrollY(state.progress.y * state.maxScroll.y);
    });
  }, []);

  useFrame(() => {
    scrollApi?.update();
  });

  return (
    <group position={toWorld(size, { ...size, x: 0, y: -scrollY })}>
      {elements.map((element, index) => {
        return (
          <mesh key={index} position={toWorld(size, element)}>
            <planeBufferGeometry args={[element.width, element.height]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
        );
      })}
    </group>
  );
}
