import React from "react";
import { useMeasure } from "react-use";
import { Wrapper, Box } from "./styles";
import Scroll from "../../../lib";
import { ScrollApi } from "../../../lib/scroll";
import CustomScroll from "../../components/custom-scroll/custom-scroll";
import { Element } from "../../components/custom-scroll/custom-scroll";

export default function NativeComparison() {
  const scrollRef = React.useRef<ScrollApi>(null);

  React.useEffect(() => {
    if (scrollRef.current === null) return;
    let nextFrame: number;
    (function tick() {
      nextFrame = requestAnimationFrame(tick);
      scrollRef.current.update();
    })();
    return () => {
      cancelAnimationFrame(nextFrame);
    };
  }, []);

  const boxRefs = React.useRef<HTMLDivElement[]>([]);
  const [elements, setElements] = React.useState<Element[]>([]);

  const registerElement = React.useCallback((element) => {
    if (!boxRefs.current.includes(element)) {
      boxRefs.current.push(element);
    }
  }, []);

  const [wrapperRef, wrapperSize] = useMeasure();
  React.useEffect(() => {
    const elements: Element[] = [];
    for (const box of boxRefs.current) {
      if (!box) continue;
      elements.push({
        x: box.offsetLeft,
        y: box.offsetTop,
        width: box.offsetWidth,
        height: box.offsetHeight,
      });
    }
    setElements(elements);
  }, [wrapperSize]);

  return (
    <Wrapper ref={wrapperRef}>
      <CustomScroll elements={elements}>
        <h2 style={{ textAlign: "center" }}>Custom Scroll 👇</h2>
        <Box ref={registerElement}>0</Box>
        <h2 style={{ textAlign: "center" }}>0</h2>
        <Box ref={registerElement}>1</Box>
        <h2 style={{ textAlign: "center" }}>1</h2>
        <Box ref={registerElement}>2</Box>
        <h2 style={{ textAlign: "center" }}>2</h2>
        <Box ref={registerElement}>3</Box>
        <h2 style={{ textAlign: "center" }}>3</h2>
        <Box ref={registerElement}>4</Box>
        <h2 style={{ textAlign: "center" }}>4</h2>
        <Box ref={registerElement}>5</Box>
        <h2 style={{ textAlign: "center" }}>5</h2>
      </CustomScroll>
      <Scroll native style={{ margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Native Scroll 👇</h2>
        {Array.from({ length: 10 }).map((_, index) => {
          return <Box key={index}>{index}</Box>;
        })}
      </Scroll>
    </Wrapper>
  );
}
