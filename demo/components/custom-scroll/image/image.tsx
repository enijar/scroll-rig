import React from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { toWorld } from "../utils";
import { Element } from "../custom-scroll";
import vertexShader from "raw-loader!./vertex.glsl";
import fragmentShader from "raw-loader!./fragment.glsl";
import { useTexture } from "@react-three/drei";
import { useSore } from "../store";

type Props = {
  element: Element;
};

export default function Image({ element }: Props) {
  const { size } = useThree();

  const { scrollApi } = useSore();

  const shaderRef = React.useRef<THREE.ShaderMaterial>(null);

  const mouse = React.useMemo(() => {
    return new THREE.Vector2(0, 0);
  }, []);

  useFrame(({ clock }) => {
    if (shaderRef.current === null) return;
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.uMouse.value = mouse;
  });

  const texture = useTexture(element.src);

  React.useEffect(() => {
    function updateMouse(event: MouseEvent) {
      if (scrollApi === null) return;
      const { width, height, x, y } = element;
      const ox = scrollApi.state.maxScroll.x * scrollApi.state.progress.x;
      const oy = scrollApi.state.maxScroll.y * scrollApi.state.progress.y;
      const tx = event.pageX + ox;
      const ty = event.pageY + oy;
      const mx = THREE.MathUtils.clamp((1 / width) * (tx - x), 0, 1);
      const my = THREE.MathUtils.clamp((1 / height) * (ty - y), 0, 1);
      mouse.x = mx;
      mouse.y = my;
    }

    function onMouseOut() {
      // mouse.x = 0;
      // mouse.y = 0;
    }

    element.target.addEventListener("mouseover", updateMouse);
    element.target.addEventListener("mousemove", updateMouse);
    element.target.addEventListener("mouseout", onMouseOut);
    return () => {
      element.target.removeEventListener("mousemove", updateMouse);
      element.target.removeEventListener("mouseover", updateMouse);
      element.target.removeEventListener("mouseout", onMouseOut);
    };
  }, [element]);

  return (
    <mesh position={toWorld(size, element)}>
      <planeBufferGeometry args={[element.width, element.height]} />
      <shaderMaterial
        ref={shaderRef}
        args={[
          {
            uniforms: {
              uTime: { value: 0 },
              uTexture: { value: texture },
              uMouse: { value: mouse },
            },
            vertexShader,
            fragmentShader,
          },
        ]}
      />
    </mesh>
  );
}
