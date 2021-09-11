import React from "react";
import { Canvas as ReactCanvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useWindowSize } from "react-use";
import Scroll, { ScrollApi } from "../../../lib/scroll";
import { CustomScrollWrapper } from "./styles";
import Canvas from "./canvas";
import { DEPTH } from "./consts";
import { useSore } from "./store";

export type Element = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  target: HTMLElement;
};

type Props = {
  children?: any;
  elements?: Element[];
};

export default function CustomScroll({ children, elements = [] }: Props) {
  const scrollRef = React.useRef<ScrollApi>(null);
  React.useEffect(() => {
    useSore.getState().setScrollApi(scrollRef.current);
  }, [scrollRef]);

  const cameraRef = React.useRef<THREE.PerspectiveCamera>();
  const windowSize = useWindowSize();
  const fov = React.useMemo(() => {
    return 2 * Math.atan(windowSize.height / (2 * DEPTH)) * (180 / Math.PI);
  }, [windowSize]);

  return (
    <CustomScrollWrapper>
      <Scroll controlled ref={scrollRef}>
        {children}
      </Scroll>
      <ReactCanvas className="canvas">
        <React.Suspense fallback={<group />}>
          <Canvas elements={elements} />
          <ambientLight />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, DEPTH]}
            frustumCulled={false}
            near={0.1}
            far={DEPTH * 3}
            fov={fov}
          />
        </React.Suspense>
      </ReactCanvas>
    </CustomScrollWrapper>
  );
}
