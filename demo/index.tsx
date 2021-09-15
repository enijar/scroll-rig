import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Reset from "./styles/reset";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

const Home = React.lazy(() => import("./home/home"));
const NativeComparison = React.lazy(
  () => import("./examples/native-comparison/native-comparison")
);
const ScrollTrigger = React.lazy(
  () => import("./examples/scroll-trigger/scroll-trigger")
);
const CustomScroll = React.lazy(
  () => import("./examples/custom-scroll/custom-scroll")
);
const WebglScroll = React.lazy(
  () => import("./examples/webgl-scroll/webgl-scroll")
);

render(
  <React.StrictMode>
    <Reset />
    <Router>
      <React.Suspense fallback="Loading...">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/examples/native-comparison"
            component={NativeComparison}
          />
          <Route
            exact
            path="/examples/scroll-trigger"
            component={ScrollTrigger}
          />
          <Route
            exact
            path="/examples/custom-scroll"
            component={CustomScroll}
          />
          <Route
            exact
            path="/examples/webgl-scroll"
            component={WebglScroll}
          />
        </Switch>
      </React.Suspense>
    </Router>
  </React.StrictMode>,
  root
);
