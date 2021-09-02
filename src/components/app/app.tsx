import React from "react";
import { Box } from "./styles";
import Scroll from "../scroll/scroll";

export default function App() {
  const [native, setNative] = React.useState(false);

  // @note for testing
  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setNative(true);
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Scroll native={native}>
      {Array.from({ length: 10 }).map((_, index) => {
        return <Box key={index}>{index}</Box>;
      })}
    </Scroll>
  );
}
