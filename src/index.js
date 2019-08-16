import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { red, amber } from "@material-ui/core/colors";

import "./styles.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600]
    },
    secondary: {
      main: amber[200]
    },
    type: "dark"
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement
);
