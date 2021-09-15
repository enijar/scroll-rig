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
        </Switch>
      </React.Suspense>
    </Router>
  </React.StrictMode>,
  root
);
