import React from "react";
import { useMeasure } from "react-use";
import { Wrapper } from "./styles";
import Scroll from "../../../lib";
import { ScrollApi } from "../../../lib/scroll";
import CustomScroll, {
  Element,
} from "../../components/custom-scroll/custom-scroll";

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
        src: box.getAttribute("src"),
        x: box.offsetLeft,
        y: box.offsetTop,
        width: box.offsetWidth,
        height: box.offsetHeight,
        target: box,
      });
    }
    setElements(elements);
  }, [wrapperSize]);

  return (
    <Wrapper ref={wrapperRef}>
      <CustomScroll elements={elements}>
        <h2>Custom Scroll 👇</h2>
        <img
          ref={registerElement}
          src="https://i.picsum.photos/id/882/488/488.jpg?hmac=4Wvu-kbWq01j0ofKNFiFhB3oqOqqLvSDavhumL7LSwk"
          alt=""
          className="element"
        />
        <h2>0</h2>
        <img
          ref={registerElement}
          src="https://i.picsum.photos/id/698/488/488.jpg?hmac=7zKlpAzX_tk9SW6FykcLevuNrtqkIrz2U5IvJdFkmgg"
          alt=""
          className="element"
        />
        <h2>1</h2>
        <img
          ref={registerElement}
          src="https://i.picsum.photos/id/1005/488/488.jpg?hmac=0_S6G0dxBfIlPVyJvojhiu4FUy5Y48BfjZsz68-cObg"
          alt=""
          className="element"
        />
        <h2>2</h2>
        <img
          ref={registerElement}
          src="https://i.picsum.photos/id/409/488/488.jpg?hmac=6_I_83QXwpQMydZsx2TFGI-9TMqHpPSNETzmqg2G9R4"
          alt=""
          className="element"
        />
        <h2>3</h2>
        <img
          ref={registerElement}
          src="https://i.picsum.photos/id/264/488/488.jpg?hmac=5_JHukAFn45GzWVJOKyNxscoJ3cCiyfRvq73Jfdyrsk"
          alt=""
          className="element"
        />
        <h2>4</h2>
        <img
          ref={registerElement}
          src="https://i.picsum.photos/id/698/488/488.jpg?hmac=7zKlpAzX_tk9SW6FykcLevuNrtqkIrz2U5IvJdFkmgg"
          alt=""
          className="element"
        />
        <h2>5</h2>
      </CustomScroll>

      <Scroll native style={{ margin: "auto" }}>
        <h2>Native Scroll 👇</h2>
        <img
          src="https://i.picsum.photos/id/882/488/488.jpg?hmac=4Wvu-kbWq01j0ofKNFiFhB3oqOqqLvSDavhumL7LSwk"
          alt=""
        />
        <h2>0</h2>
        <img
          src="https://i.picsum.photos/id/698/488/488.jpg?hmac=7zKlpAzX_tk9SW6FykcLevuNrtqkIrz2U5IvJdFkmgg"
          alt=""
        />
        <h2>1</h2>
        <img
          src="https://i.picsum.photos/id/1005/488/488.jpg?hmac=0_S6G0dxBfIlPVyJvojhiu4FUy5Y48BfjZsz68-cObg"
          alt=""
        />
        <h2>2</h2>
        <img
          src="https://i.picsum.photos/id/409/488/488.jpg?hmac=6_I_83QXwpQMydZsx2TFGI-9TMqHpPSNETzmqg2G9R4"
          alt=""
        />
        <h2>3</h2>
        <img
          src="https://i.picsum.photos/id/264/488/488.jpg?hmac=5_JHukAFn45GzWVJOKyNxscoJ3cCiyfRvq73Jfdyrsk"
          alt=""
        />
        <h2>4</h2>
        <img
          src="https://i.picsum.photos/id/698/488/488.jpg?hmac=7zKlpAzX_tk9SW6FykcLevuNrtqkIrz2U5IvJdFkmgg"
          alt=""
        />
        <h2>5</h2>
      </Scroll>
    </Wrapper>
  );
}
