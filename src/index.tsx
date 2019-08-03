import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import WebFontLoader from "webfontloader";
import "./styles/css/index.css";

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

render(<App />, document.getElementById("root"));
